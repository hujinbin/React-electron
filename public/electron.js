const { app, BrowserWindow } = require('electron')

// const url = require('url');
const path = require('path');

async function createWindow () {  
  const isDev = (await import('electron-is-dev')).default;
  // 创建浏览器窗口
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })
  console.log('isDev', isDev)
  // 加载index.html文件
  win.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
  // if (process.env.npm_lifecycle_script.indexOf('electron .') > -1) {
  //   // 【开发时候使用】
  //   //需要和本地项目启动会端口号一致，一般不需要改。多项目启动会有端口被占用而 改变情况
  //   win.loadURL('http://localhost:3000/'); 
  // } else {
  //   // 【打包时候使用】__dirname为当前文件路径
  //   win.loadURL(url.format({
  //     pathname: path.join(__dirname, './build/index.html'),
  //     protocol: 'file:',
  //     slashes: true
  //   }));
  // }
//   win.loadFile('index.html')

  // win.loadURL('http://localhost:3000')

   // 解决应用启动白屏问题
   win.on('ready-to-show', () => {
    win.show();
    win.focus();
  });

  // 当窗口关闭时发出。在你收到这个事件后，你应该删除对窗口的引用，并避免再使用它。
  win.on('closed', () => {
    win = null;
  });
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  });
  
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  });