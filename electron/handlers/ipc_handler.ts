import { ipcMain } from "electron";
import { CredentialsManager } from "../services/credentials-manager";

export const initHandlers = () => {
  ipcMain.handle('getCredentialsAsFile',(event, ...args) => {
    const manager = new CredentialsManager();
    return manager.getCredentialsAsFile();
  });
  
  ipcMain.handle('switchToProfile',(event, ...args) => {
    const manager = new CredentialsManager();
    const innerManager = manager.switchToProfile(args[0]);
    innerManager.saveFile();
    return innerManager;
  });
}
