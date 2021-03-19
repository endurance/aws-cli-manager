
import { contextBridge, ipcRenderer } from "electron";
import { CredentialsManager } from "../services/credentials-manager";


export const preloadScript = () => {
  contextBridge.exposeInMainWorld(
    'electron',
    {
      getCredentialsAsFile: async () => {
        return await ipcRenderer.invoke('getCredentialsAsFile');
      },
      switchToProfile: async (profileName: string) => {
        console.log(profileName);
        return await ipcRenderer.invoke('switchToProfile', profileName);
      }
    }
  )
}

preloadScript();
