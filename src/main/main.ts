// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { app, BrowserWindow, ipcMain, IpcMainEvent, IpcMainInvokeEvent } from "electron";
import installExtension, { REACT_DEVELOPER_TOOLS } from "electron-devtools-installer";
import electronLocalshortcut from "electron-localshortcut";
import CHANNELS from "../common/channels";
import SubjectStorage from "./db/SubjectStorage";
import TaskStorage from "./db/TaskStorage";
import store, { persistWindowSettings } from "./settings/settings";

export const USER_DATA_PATH = app.getPath("userData");

let mainWindow: BrowserWindow;
const taskStorage: TaskStorage = new TaskStorage();
const subjectStorage: SubjectStorage = new SubjectStorage();

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: store.get("cache.window.lastWindowX"),
    height: store.get("cache.window.lastWindowY"),
    minWidth: 1055,
    minHeight: 600,
    center: true,
    backgroundColor: "#121212",
    show: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  });

  // TODO: disable before deploy
  electronLocalshortcut.register("F12", () => {
    console.log("F12 pressed");
    mainWindow.webContents.toggleDevTools();
    console.log(mainWindow.isFocused());
  });

  mainWindow.setMenuBarVisibility(false);

  if (store.get("cache.window.maximized")) {
    mainWindow.maximize();
  }

  process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true"; // TODO: remove before deploy

  mainWindow.loadURL("http://localhost:3000");

  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
  });

  mainWindow.on("resize", () => {
    persistWindowSettings(mainWindow);
  });

  mainWindow.on("close", () => {
    persistWindowSettings(mainWindow);
  });

  registerIPC();
};



app.on("ready", () => {
  createWindow();
  installExtension(REACT_DEVELOPER_TOOLS).then(name => console.log(`Added Extension: ${name}`)).catch(err => console.warn(`Couldn't add extension: ${err}`));
});

app.on("window-all-closed", () => {
  app.quit();
});

const registerIPC = () => {
  // IPC
  ipcMain.handle(CHANNELS.GET_SETTING_VALUE, (event: IpcMainInvokeEvent, key: string) => {
    console.log(event, key);
    console.log("value:", store.get(key));
    return store.get(key);
  });

  ipcMain.on(CHANNELS.SET_SETTING_VALUE, (_event: IpcMainEvent, key: string, value: unknown) => {
    store.set(key, value);
  });

  ipcMain.on(CHANNELS.RELAUNCH_APP, (_event, arg: {force?: boolean}) => {
    app.relaunch();
    arg.force ? app.exit() : app.quit();
  });

  ipcMain.on(CHANNELS.GET_NEXT_TASK_ID, (event) => {
    event.reply(CHANNELS.GET_NEXT_TASK_ID_RESPONSE, taskStorage.getNextId());
  });

  ipcMain.on(CHANNELS.GET_TASKS, (event) => {
    console.log("received request for tasks - sending reply");
    event.reply(CHANNELS.GET_TASKS_RESPONSE, taskStorage.getData());
  });

  ipcMain.on(CHANNELS.ADD_TASK, (event, newTask: Homework) => {
    console.log("received new task - attempting store");
    try {
      taskStorage.addTask(newTask);
    } catch (e) {
      console.error(e);
      event.reply(CHANNELS.ADD_TASK_FAIL);
    }
    console.log("stored new task - sending reply");
    event.reply(CHANNELS.ADD_TASK_SUCCESS);
  });

  ipcMain.on(CHANNELS.UPDATE_TASK, (event, task: Homework) => {
    console.log("received task to update - attempting update");
    try {
      taskStorage.updateTask(task);
    } catch (e) {
      console.error(e);
      event.reply(CHANNELS.UPDATE_TASK_FAIL);
    }
    console.log("updated task - sending reply");
    event.reply(CHANNELS.UPDATE_TASK_SUCCESS);
  });

  ipcMain.on(CHANNELS.DELETE_TASK, (event, taskToDelete: Homework) => {
    console.log("received task to be deleted - attempting deletion");
    try {
      taskStorage.removeTask(taskToDelete);
    } catch (e) {
      console.error(e);
      event.reply(CHANNELS.DELETE_TASK_FAIL);
    }
    console.log("deleted task - sending reply");
    event.reply(CHANNELS.DELETE_TASK_SUCCESS);
  });

  ipcMain.on(CHANNELS.GET_NEXT_SUBJECT_ID, event => {
    event.reply(CHANNELS.GET_NEXT_SUBJECT_ID_RESPONSE, subjectStorage.getNextId());
  });

  ipcMain.on(CHANNELS.GET_SUBJECTS, event => {
    event.reply(CHANNELS.GET_SUBJECTS_RESPONSE, subjectStorage.getData());
  });

  ipcMain.on(CHANNELS.ADD_SUBJECT, (event, newSubject: Subject) => {
    try {
      subjectStorage.addSubject(newSubject);
    } catch (e) {
      console.error(e);
      event.reply(CHANNELS.ADD_SUBJECT_FAIL);
    }
    event.reply(CHANNELS.ADD_SUBJECT_SUCCESS);
  });

  ipcMain.on(CHANNELS.UPDATE_SUBJECT, (event, subject: Subject) => {
    try {
      subjectStorage.updateSubject(subject);
    } catch (e) {
      console.error(e);
      event.reply(CHANNELS.UPDATE_SUBJECT_FAIL);
    }
    event.reply(CHANNELS.UPDATE_SUBJECT_SUCCESS);
  });

  ipcMain.on(CHANNELS.DELETE_SUBJECT, (event, subjectToDelete: Subject) => {
    try {
      subjectStorage.removeSubject(subjectToDelete);
    } catch (e) {
      console.error(e);
      event.reply(CHANNELS.DELETE_SUBJECT_FAIL);
    }

    event.reply(CHANNELS.DELETE_SUBJECT_SUCCESS);
  });
};