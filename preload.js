const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('marketplaceAPI', {
  getWallet: () => ipcRenderer.invoke('wallet:amount')
})
