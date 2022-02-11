import { app, BrowserWindow } from "electron";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import electronReloader from "electron-reloader";

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 1055,
    height: 600,
    minWidth: 1055,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  mainWindow.setMenuBarVisibility(false);

  process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true"; // TODO: remove before deploy

  console.log("loading mainWindow");

  mainWindow.loadURL("http://localhost:3000");
};

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  app.quit();
});