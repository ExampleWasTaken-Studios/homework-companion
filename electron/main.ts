// eslint-disable-next-line @typescript-eslint/no-unused-vars
import electronReloader from "electron-reloader";
import { app, BrowserWindow, ipcMain, IpcMainEvent, IpcMainInvokeEvent } from "electron";
import store, { persistWindowSettings } from "./settings";
import channels from "./channels";
import { javascript } from "webpack";

let mainWindow: BrowserWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1055,
    height: 600,
    minWidth: 1055,
    minHeight: 600,
    backgroundColor: "#121212",
    show: false,
    webPreferences: {
      nodeIntegration: true,
    }
  });

  mainWindow.setMenuBarVisibility(false);

  /* if (store.get("cache.window.maximized")) {
    mainWindow.maximize();
  } */

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