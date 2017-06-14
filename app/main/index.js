import { app, BrowserWindow } from "electron";
import MenuBuilder from './menu';

const PORT = 3000;

let win;

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = [
    'REACT_DEVELOPER_TOOLS',
    'REDUX_DEVTOOLS'
  ];

  return Promise
    .all(extensions.map(name => installer.default(installer[name], forceDownload)))
    .catch(console.log);
};

app.on("ready", async () => {
  win = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728
  });
  if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
    await installExtensions();
  }

  if (process.env.NODE_ENV === "development") {
    require("electron-debug")();
    win.loadURL(`http://localhost:${PORT}/build/index.html`);
  } else {
    win.loadURL(`file://${__dirname}/index.html`);
  }

  win.webContents.on('did-finish-load', () => {
    if (!win) {
      throw new Error('"win" is not defined');
    }
    win.show();
    win.focus();
  });

  win.on('closed', () => {
    win = null;
  });
  const menuBuilder = new MenuBuilder(win);
  menuBuilder.buildMenu();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// app.on("activate", () => {
//   if (win === null) {
//     createWindow();
//   }
// });
