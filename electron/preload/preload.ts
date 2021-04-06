import { contextBridge, ipcRenderer } from "electron";
import { ProfileOptions } from "aws-accounts/dist/constants";


export const preloadScript = () => {
  contextBridge.exposeInMainWorld(
    'electron',
    {
      getCredentialsAsFile: async () => {
        return await ipcRenderer.invoke('getCredentialsAsFile');
      },
      getProfileByName: async (profileName: string) => {
        return await ipcRenderer.invoke('getProfileByName', profileName);
      },
      switchToProfile: async (profileName: string) => {
        await ipcRenderer.invoke('switchToProfile', profileName);
      },
      addNewProfile: async (profileInfo: ProfileOptions) => {
        await ipcRenderer.invoke('addNewProfile', profileInfo);
      },
      removeProfile: async (name: string) => {
        await ipcRenderer.invoke('removeProfile', name);
      },
      editProfile: async (name: string, profile: ProfileOptions) => {
        await ipcRenderer.invoke('editProfile', name, profile);
      },
    }
  )
}

preloadScript();
