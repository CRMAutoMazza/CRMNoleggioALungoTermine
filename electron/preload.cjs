const { contextBridge, ipcRenderer, shell } = require('electron');

console.log('--- PRELOAD SCRIPT EXECUTING ---');

try {
    contextBridge.exposeInMainWorld('ipcRenderer', {
        invoke: async (channel, ...args) => {
            console.log('IPC Invoke:', channel);
            return await ipcRenderer.invoke(channel, ...args);
        }
    });

    contextBridge.exposeInMainWorld('shell', {
        openExternal: (url) => shell.openExternal(url)
    });
    console.log('--- PRELOAD SUCCESS: APIs EXPOSED ---');
} catch (error) {
    console.error('--- PRELOAD ERROR ---', error);
}
