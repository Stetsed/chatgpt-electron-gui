const { app, BrowserWindow } = require('electron');
const { session } = require('electron');

function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  const ses = session.fromPartition('');
  win.webContents.session = ses;

  ses.cookies.set({
    url: "https://chat.openai.com/chat",
    name: "ChatGPT",
    value: "ChatGPT",
    expirationDate: 99999999999,
    sameSite: "lax"
  }, (error) => {
    if (error) console.error(error);
  });

  ses.cookies.get({ url: 'https://chat.openai.com/chat' }, (error, cookies) => {
    cookies.forEach(cookie => {
        ses.cookies.set(cookie, (error) => {
            if (error) console.error(error);
          });
        });
    });

  // and load the index.html of the app.
  win.loadURL('https://chat.openai.com/chat');
}

app.whenReady().then(createWindow);


