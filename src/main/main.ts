// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { app, BrowserWindow, ipcMain, IpcMainEvent, IpcMainInvokeEvent } from "electron";
import installExtension, { REACT_DEVELOPER_TOOLS } from "electron-devtools-installer";
import electronLocalshortcut from "electron-localshortcut";
import CHANNELS from "../common/channels";
import TaskStorage from "./db/TaskStorage";
import store, { persistWindowSettings } from "./settings/settings";

export const USER_DATA_PATH = app.getPath("userData");

let mainWindow: BrowserWindow;
const taskStorage: TaskStorage = new TaskStorage();

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

  // IPC
  ipcMain.handle(CHANNELS.GET_SETTING_VALUE, (event: IpcMainInvokeEvent, key: string) => {
    console.log(event, key);
    console.log("value:", store.get(key));
    return store.get(key);
  });

  ipcMain.on(CHANNELS.SET_SETTING_VALUE, (event: IpcMainEvent, key: string, value: unknown) => {
    store.set(key, value);
  });

  ipcMain.on(CHANNELS.RELAUNCH_APP, (event, arg: {force?: boolean}) => {
    app.relaunch();
    arg.force ? app.exit() : app.quit();
  });

  ipcMain.on(CHANNELS.GET_NEXT_TASK_ID, (event) => {
    event.reply(CHANNELS.GET_NEXT_TASK_ID_RESPONSE, taskStorage.getNextId());
  });

  ipcMain.on(CHANNELS.GET_TASKS, (event) => {
    console.log("received request - sending reply");
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

  ipcMain.on(CHANNELS.COMPLETE_TASK, (event, taskToComplete: Homework) => {
    console.log("received task to be completed - attempting completion");
    try {
      taskStorage.completeTask(taskToComplete);
    } catch (e) {
      console.error(e);
      event.reply(CHANNELS.COMPLETE_TASK_FAIL);
    }
    console.log("completed task - sending reply");
    event.reply(CHANNELS.COMPLETE_TASK_SUCCESS);
  });

  ipcMain.on(CHANNELS.INCOMPLETE_TASK, (event, taskToIncomplete: Homework) => {
    console.log("received task to incomplete - attempting to incomplete");
    try {
      taskStorage.incompleteTask(taskToIncomplete);
    } catch (e) {
      console.error(e);
      event.reply(CHANNELS.INCOMPLETE_TASK_FAIL);
    }
    console.log("incompleted task - sending reply");
    event.reply(CHANNELS.INCOMPLETE_TASK_SUCCESS);
  });
};

app.on("ready", () => {
  createWindow();
  installExtension(REACT_DEVELOPER_TOOLS).then(name => console.log(`Added Extension: ${name}`)).catch(err => console.warn(`Couldn't add extension: ${err}`));
});

app.on("window-all-closed", () => {
  app.quit();
});