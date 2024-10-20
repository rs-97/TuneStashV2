import { BrowserWindow, ipcMain } from "electron";
import * as yt from "youtube-search-api";


const RegisterWindow = () =>
{

    ipcMain.on('window-minimize', (event) => {
        const win = BrowserWindow.fromWebContents(event.sender);
        win.minimize();
    });

    ipcMain.on("window-maximize", (event) => {
        const win = BrowserWindow.fromWebContents(event.sender);
        if (win.isMaximized()) {
            win.unmaximize();
        } else {
            win.maximize();
        }
    });

    ipcMain.on("window-close", (event) => {
        const win = BrowserWindow.fromWebContents(event.sender);
        win.close();
    });

    console.log("window registered")
}

export {
    RegisterWindow
}