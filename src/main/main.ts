// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { app, BrowserWindow, ipcMain, IpcMainEvent, IpcMainInvokeEvent } from "electron";
import installExtension, { REACT_DEVELOPER_TOOLS } from "electron-devtools-installer";
import channels from "../common/channels";
import store, { persistWindowSettings } from "./settings/settings";
import { TaskStorage } from "./taskStorage/TaskStorage";
import electronLocalshortcut from "electron-localshortcut";


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
    event.reply(channels.getTaskResponse, taskStorage.getTasks());
  });
};

app.on("ready", () => {
  createWindow();
  installExtension(REACT_DEVELOPER_TOOLS).then(name => console.log(`Added Extension: ${name}`)).catch(err => console.warn(`Couldn't add extension: ${err}`));
});

app.on("window-all-closed", () => {
  app.quit();
});