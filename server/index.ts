import { app, BrowserWindow } from 'electron';
import path from "node:path";

import { RegisterAudio } from './components/audiomanger';
import { RegisterPlaylists } from './components/playlistmanager';

const createWindow = () =>
{
    const html_dir = path.join(__dirname, "index.html");
    const preload_dir = path.join(__dirname, "preload.js");

    const main_window = new BrowserWindow({
        width: 1000,
        height: 700,
        autoHideMenuBar: true,
        webPreferences: {
            preload: preload_dir
        }
    });

    main_window.loadFile(html_dir)
        .then(RegisterAudio)
        .then(RegisterPlaylists);
}

app.whenReady().then(createWindow);
app.on('window-all-closed', () => {if (process.platform !== 'darwin') app.quit()});