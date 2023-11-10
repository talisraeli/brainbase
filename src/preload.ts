import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
  saveThought: (text: string) => ipcRenderer.send("save-thought", text),
});
