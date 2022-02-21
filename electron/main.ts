// eslint-disable-next-line @typescript-eslint/no-unused-vars
import electronReloader from "electron-reloader";
import { app, BrowserWindow } from "electron";
import store, { persistWindowSettings } from "./settings";

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
      nodeIntegration: true
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
};

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  app.quit();
});