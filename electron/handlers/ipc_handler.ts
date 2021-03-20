import { ipcMain } from "electron";
import { CredentialsManager } from "../services/credentials-manager";

export const initHandlers = () => {
  ipcMain.handle('getCredentialsAsFile',(event, ...args) => {
    const manager = new CredentialsManager();
    return manager.getCredentialsAsFile();
  });
  
  ipcMain.handle('switchToProfile',async (event, ...args) => {
    const manager = new CredentialsManager();
    const innerManager = manager.switchToProfile(args[0]);
    innerManager.saveFile();
    await new Promise((res, rej) => {
      setTimeout(() => {
        res(null);
      }, 1000);
    })
    return innerManager;
  });
}
