// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { app, BrowserWindow, ipcMain, IpcMainEvent, IpcMainInvokeEvent } from "electron";
import installExtension, { REACT_DEVELOPER_TOOLS } from "electron-devtools-installer";
import electronLocalshortcut from "electron-localshortcut";
import channels from "../common/channels";
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
  ipcMain.handle(channels.getSettingValue, (event: IpcMainInvokeEvent, key: string) => {
    console.log(event, key);
    console.log("value:", store.get(key));
    return store.get(key);
  });

  ipcMain.on(channels.setSettingValue, (event: IpcMainEvent, key: string, value: unknown) => {
    store.set(key, value);
  });

  ipcMain.on(channels.relaunchApp, (event, arg: {force?: boolean}) => {
    app.relaunch();
    arg.force ? app.exit() : app.quit();
  });

  ipcMain.on(channels.getTasks, (event) => {
    console.log("received request - sending reply");
    event.reply(channels.getTaskResponse, taskStorage.getData());
  });

  ipcMain.on(channels.addTask, (event, newTask: Homework) => {
    console.log("received new task - attempting store");
    try {
      taskStorage.addTask(newTask);
    } catch (e) {
      console.error(e);
      event.reply(channels.addTaskFail);
    }
    console.log("stored new task - sending reply");
    event.reply(channels.addTaskSuccess);
  });

  ipcMain.on(channels.deleteTask, (event, taskToDelete: Homework) => {
    console.log("received task to be deleted - attempting deletion");
    try {
      taskStorage.removeTask(taskToDelete);
    } catch (e) {
      console.error(e);
      event.reply(channels.deleteTaskFail);
    }
    console.log("deleted task - sending reply");
    event.reply(channels.deleteTaskSuccess);
  });

  ipcMain.on(channels.completeTask, (event, taskToComplete: Homework) => {
    console.log("received task to be completed - attempting completion");
    try {
      taskStorage.completeTask(taskToComplete);
    } catch (e) {
      console.error(e);
      event.reply(channels.completeTaskFail);
    }
    console.log("completed task - sending reply");
    event.reply(channels.completeTaskSuccess);
  });
};

app.on("ready", () => {
  createWindow();
  installExtension(REACT_DEVELOPER_TOOLS).then(name => console.log(`Added Extension: ${name}`)).catch(err => console.warn(`Couldn't add extension: ${err}`));
});

app.on("window-all-closed", () => {
  app.quit();
});