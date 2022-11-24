import { Updater } from "@ewt-studios/updater";
import { dialog } from "electron";
import installExtension, { REACT_DEVELOPER_TOOLS } from "electron-devtools-installer";
import * as electronLocalshortcut from "electron-localshortcut";
import { app, BrowserWindow, ipcMain, IpcMainEvent, IpcMainInvokeEvent } from "electron/main";
import * as path from "path";
import semver from "semver";
import SubjectStorage from "./db/SubjectStorage";
import TaskStorage from "./db/TaskStorage";
import { Channels } from "./preload/Channels";
import store, { persistWindowSettings } from "./settings/settings";

const ASSETS_PATH = app.isPackaged ? path.join(process.resourcesPath, "assets") : path.join(app.getAppPath(), "assets", "runtime");
export const USER_DATA_PATH = app.getPath("userData");

let win: BrowserWindow | null = null;
const taskStorage: TaskStorage = new TaskStorage();
const subjectStorage: SubjectStorage = new SubjectStorage();
export const updater = new Updater(app, "ExampleWasTaken-Studios", "homework-companion");

const createWindow = () => {
  win = new BrowserWindow({
    title: "Homework Companion",
    width: store.get("cache.window.lastWindowX"),
    height: store.get("cache.window.lastWindowY"),
    minWidth: 1055,
    minHeight: 600,
    center: true,
    backgroundColor: "#121212",
    show: false,
    webPreferences: {
      preload: path.join(__dirname, "preload", "preload.js"),
      sandbox: false
    }
  });

  win.on("closed", () => win = null);

  electronLocalshortcut.register("F12", () => {
    console.log("F12 pressed");
    win?.webContents.toggleDevTools();
    console.log(win?.isFocused());
  });

  win.setMenuBarVisibility(false);

  if(store.get("cache.window.maximized")) {
    win.maximize();
  }

  win.on("resize", () => {
    win && persistWindowSettings(win);
  });

  win.on("close", () => {
    win && persistWindowSettings(win);
  });

  if (app.isPackaged) {
    win.loadURL(`file://${path.join(__dirname, "../", "index.html")}`);
  } else {
    win.loadURL("http://localhost:3000/index.html");
  }

  if (!app.isPackaged) {
    /* // Hot Reloading
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require("electron-reload") (__dirname, {
      electron: path.join(__dirname, "..", "..", "node_modules", ".bin", "electron"), // "node_modules/.bin/electron"
      forceHardReset: true,
      hardResetMethod: "exit"
    }); */

    // DevTools
    installExtension(REACT_DEVELOPER_TOOLS)
      .then(name => console.log(`Added Extension: ${name}`))
      .catch(err => console.log("An error occurred:", err));

    win.webContents.openDevTools();
  }

  win.once("ready-to-show", win.show);
};

app.on("ready", () => {
  createWindow();

  updater.checkForUpdatesAndDownload();

  if (semver.prerelease(app.getVersion())) {
    if (win && app.isPackaged) {
      dialog.showMessageBox(win, {
        type: "warning",
        title: "Warning - Prerelease!",
        message: `You are using a prerelease version ${app.getVersion()} of Homework Companion.`,
        detail: "Things may break, change or be removed at any time.",
        buttons: ["Got it"],
        noLink: true
      });
    }
  }
});

app.on("window-all-closed", () => {
  app.quit(); // TODO: maybe change to default mac behavior
});

app.on("activate", () => {
  if (win === null) {
    createWindow();
  }
});

ipcMain.handle(Channels.GET_APP_VERSION, () => {
  return app.getVersion();
});

ipcMain.handle(Channels.CHECK_FOR_UPDATES, () => {
  return updater.checkForUpdatesAndDownload();
});

ipcMain.handle(Channels.SHOULD_SHOW_CHANGELOG, () => {
  return semver.satisfies(app.getVersion(), `>${store.get("metaInfo.lastChangelogViewed")}`, { includePrerelease: true });
});

ipcMain.handle(Channels.GET_ASSETS_PATH, () => {
  return ASSETS_PATH;
});

ipcMain.handle(Channels.GET_SETTING_VALUE, (_event: IpcMainInvokeEvent, key: string) => {
  return store.get(key);
});

ipcMain.on(Channels.SET_SETTING_VALUE, (_event: IpcMainEvent, key: string, value: unknown) => {
  store.set(key, value);
});

ipcMain.on(Channels.RELAUNCH_APP, (_event: IpcMainEvent, force?: boolean) => {
  app.relaunch();
  force ? app.exit() : app.quit();
});

ipcMain.handle(Channels.GET_NEXT_TASK_ID, (_event: IpcMainInvokeEvent) => {
  return taskStorage.getNextId();
});

ipcMain.handle(Channels.GET_TASKS, (_event: IpcMainInvokeEvent) => {
  return taskStorage.getData();
});

ipcMain.on(Channels.ADD_TASK, (_event: IpcMainEvent, task: Homework) => {
  try {
    taskStorage.addTask(task);
  } catch (e) {
    console.error("An error occurred while trying to store task:", task, "\nError:", e);
  }
});

ipcMain.on(Channels.UPDATE_TASK, (_event: IpcMainEvent, task: Homework) => {
  try {
    taskStorage.updateTask(task);
  } catch(e) {
    console.error("An error occurred while trying to store task:", task, "\nError:", e);
  }
});

ipcMain.on(Channels.DELETE_TASK, (_event: IpcMainEvent, task: Homework) => {
  try {
    taskStorage.removeTask(task);
  } catch (e) {
    console.error("An error occurred while trying to store task:", task, "\nError:", e);
  }
});

ipcMain.handle(Channels.GET_NEXT_SUBJECT_ID, (_event: IpcMainInvokeEvent) => {
  return subjectStorage.getNextId();
});

ipcMain.handle(Channels.GET_SUBJECT_ID, (_event: IpcMainInvokeEvent, subject: Subject) => {
  return subjectStorage.getSubjectId(subject);
});

ipcMain.handle(Channels.GET_SUBJECT_BY_ID, (_event: IpcMainInvokeEvent, id: number) => {
  return subjectStorage.getSubjectById(id);
});

ipcMain.handle(Channels.GET_SUBJECTS, () => {
  return subjectStorage.getData();
});

ipcMain.on(Channels.SET_SUBJECTS, (_event: IpcMainEvent, subjects: Subject[]) => {
  try {
    subjectStorage.updateFile(subjects);
  } catch (e) {
    console.error("An error occurred while trying to store subjects:", subjects, "\nError:", e);
  }
});

ipcMain.on(Channels.ADD_SUBJECT, (_event: IpcMainEvent, subject: Subject) => {
  try {
    subjectStorage.addSubject(subject);
  } catch (e) {
    console.error("An error occurred while trying to store subject:", subject, "\nError:", e);
  }
});

ipcMain.on(Channels.UPDATE_SUBJECT, (_event: IpcMainEvent, subject: Subject) => {
  try {
    subjectStorage.updateSubject(subject);
  } catch (e) {
    console.error("An error occurred while trying to store subject:", subject, "\nError:", e);
  }
});

ipcMain.on(Channels.DELETE_SUBJECT, (_event: IpcMainEvent, subject: Subject) => {
  try {
    subjectStorage.removeSubject(subject);
  } catch (e) {
    console.error("An error occurred while trying to store subject:", subject, "\nError:", e);
  }
});
