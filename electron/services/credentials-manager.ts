import { awsAccounts } from "aws-accounts";
import { resolve } from "path";
import { homedir } from "os";
import { EditProfileOptions, ProfileOptions } from "aws-accounts/dist/constants";
import { closeSync, existsSync, openSync } from 'fs';
import * as os from "os";

const DEFAULT_CREDENTIALS_HOME = resolve(homedir(), ".aws", "credentials");

const sleep = async (time = 1000) => {
  await new Promise((res, rej) => {
    setTimeout(() => {
      res(null);
    }, time);
  });
}

export class CredentialsManager {
  public getCredentialsAsFile = (path: string = DEFAULT_CREDENTIALS_HOME) => {
    return awsAccounts.deserializeCredentials(path);
  }
  
  public getProfileByName = async (profileName: string) => {
    const creds = awsAccounts.deserializeCredentials();
    return creds.find(c => c.getName() === profileName);
  }
  
  public switchToProfile = async (profileName: string) => {
    awsAccounts.switchProfile(profileName).saveFile();
    await sleep();
  }
  
  public addNewProfile = async (profile: ProfileOptions) => {
    // const path = resolve(os.homedir(), ".aws", "credentials");
    // const exists = existsSync(path);
    // if (!exists) {
    //   closeSync(openSync(path, 'a'));
    // }
    awsAccounts.addProfile(profile).saveFile();
    await sleep();
  }
  
  public removeProfile = async (name: string) => {
    awsAccounts.deleteProfile(name).saveFile();
    await sleep();
  }
  
  public editProfile = async (name: string, options: EditProfileOptions) => {
    awsAccounts.editProfile(name, options).saveFile();
    await sleep();
  }
}




