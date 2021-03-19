import { awsAccounts } from "aws-accounts";
import { resolve } from "path";
import { homedir } from "os";

const DEFAULT_CREDENTIALS_HOME = resolve(homedir(), ".aws", "credentials");

export class CredentialsManager {
  public getCredentialsAsFile = (path: string = DEFAULT_CREDENTIALS_HOME) => {
    return awsAccounts.deserializeCredentials(path);
  }
  
  public switchToProfile = (profileName: string) => {
    return awsAccounts.switchProfile(profileName);
  }
}

