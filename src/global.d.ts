import {IpcRenderer} from 'electron';

declare global {
  interface Window {
    electron: any
  }
}
