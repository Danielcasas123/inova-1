const { contextBridge } = require('electron');
contextBridge.exposeInMainWorld('inovaInfo', { appName: 'Inova 1' });
