import { app, BrowserWindow, globalShortcut, ipcMain } from "electron";
import path from "path";
import { getDimensions } from "./utils";
import { registerHandlers } from "./handlers";
import { initDB, saveToDB } from "./db";

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

const registerShortcuts = (windows: { [key: string]: any }) => {
  globalShortcut.register("CommandOrControl+Alt+B", () => {
    windows["settings_window"].isVisible()
      ? windows["settings_window"].hide()
      : windows["settings_window"].show();
  });

  globalShortcut.register("CommandOrControl+Alt+Space", () => {
    windows["add_window"].isVisible()
      ? windows["add_window"].hide()
      : windows["add_window"].show();
  });
};

const createWindows = () => {
  // Create the browser window.
  const settingsWindow = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
  });

  const dimensions = getDimensions();
  const addWindow = new BrowserWindow({
    // show: false,
    width: dimensions.windowWidth,
    height: dimensions.windowHeight,
    x: dimensions.x,
    y: dimensions.y,
    show: false,
    // frame: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"), // has to be .js for build
    },
  });

  // and load the index.html of the app.
  if (SETTINGS_WINDOW_VITE_DEV_SERVER_URL) {
    settingsWindow.loadURL(SETTINGS_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    settingsWindow.loadFile(
      path.join(
        __dirname,
        `../renderer/${SETTINGS_WINDOW_VITE_NAME}/index.html`
      )
    );
  }

  if (ADD_WINDOW_VITE_DEV_SERVER_URL) {
    addWindow.loadURL(ADD_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    addWindow.loadFile(
      path.join(__dirname, `../renderer/${ADD_WINDOW_VITE_NAME}/index.html`)
    );
  }

  registerShortcuts({
    settings_window: settingsWindow,
    add_window: addWindow,
  });

  // Open the DevTools.
  settingsWindow.webContents.openDevTools();
  addWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => {
  initDB();
  saveToDB("Hello World");
  registerHandlers(ipcMain);
  createWindows();
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindows();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

app.on("will-quit", () => {
  // Unregister all shortcuts.
  globalShortcut.unregisterAll();
});
