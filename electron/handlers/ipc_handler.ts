import { ipcMain } from "electron";
import { CredentialsManager } from "../services/credentials-manager";
import { EditProfileOptions, ProfileOptions } from "aws-accounts/dist/constants";

export const initHandlers = () => {
  ipcMain.handle('getCredentialsAsFile',(event, ...args) => {
    const manager = new CredentialsManager();
    return manager.getCredentialsAsFile();
  });
  
  ipcMain.handle('getProfileByName',async (event, ...args) => {
    const manager = new CredentialsManager();
    const profileName: string = args[0];
    return await manager.getProfileByName(profileName);
  });
  
  ipcMain.handle('switchToProfile',async (event, ...args) => {
    const manager = new CredentialsManager();
    const profileName: string = args[0];
    await manager.switchToProfile(profileName);
  });
  
  ipcMain.handle('addNewProfile',async (event, ...args) => {
    const manager = new CredentialsManager();
    const profile = args[0] as ProfileOptions;
    await manager.addNewProfile(profile);
  });
  
  ipcMain.handle('removeProfile',async (event, ...args) => {
    const manager = new CredentialsManager();
    const profile = args[0] as string;
    await manager.removeProfile(profile);
  });
  
  ipcMain.handle('editProfile',async (event, ...args) => {
    const manager = new CredentialsManager();
    const name = args[0] as string;
    const profile = args[1] as EditProfileOptions;
    await manager.editProfile(name, profile);
  });
}
