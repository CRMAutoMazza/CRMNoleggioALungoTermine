export const getIpcRenderer = () => {
    if (window.ipcRenderer) return window.ipcRenderer;
    console.error("IPC Renderer missing from window object");
    return null;
};
