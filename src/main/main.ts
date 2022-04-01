// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { app, BrowserWindow, ipcMain, IpcMainEvent, IpcMainInvokeEvent, shell } from "electron";
import channels from "./channels";
import store, { persistWindowSettings } from "./settings/settings";
import { TaskStorage } from "./taskStorage/TaskStorage";

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
      contextIsolation: false // THIS IS A BIG SECURITY RISK - IT IS ENABLED DUE TO AN APPARENT WEBPACK BUG (throws reference error otherwise) the dev console should be disabled in production builds as long as this is set to false
    }
  });

  // mainWindow.webContents.openDevTools();

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
    console.log(mainWindow.getSize());
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
};

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  app.quit();
});