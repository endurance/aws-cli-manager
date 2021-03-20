import React from "react";
import { useAsync } from "react-use";
import { BaseBehavior, useBehavior } from "@enduranceidehen/behavior";
import { Profile } from "aws-accounts/dist/classes/profile";
import { plainToClass } from "class-transformer";
import { SimpleAwsCredentialsCard } from "../components/SimpleAwsCredentialsCard";

class ViewState {
  creds: Profile[] = [];
}

class Behavior extends BaseBehavior<ViewState> {
  public grabCredentials = async () => {
    const nonTypedProfiles = window.electron.getCredentialsAsFile();
    const profiles: Profile[] = await plainToClass(Profile, nonTypedProfiles as unknown[] as any[]);
    this.setter("creds", profiles);
  };
  
  public allCredentialsExceptDefault = () => {
    return this.viewState.creds.filter((x) => x.getName() !== "default");
  }
  
  public isDefault = (profile: Profile) => {
    const defaultProfile = this.viewState.creds.find((x) => x.getName() === "default");
    // @ts-ignore
    return defaultProfile.aws_access_key_id === profile.aws_access_key_id &&
      // @ts-ignore
      defaultProfile.aws_secret_access_key === profile.aws_secret_access_key;
  }
}

export const AwsCredentialsSelector = () => {
  const behavior = useBehavior({}, Behavior, new ViewState());
  useAsync(behavior.grabCredentials);
  return (
    <>
      {behavior.allCredentialsExceptDefault().map(x => {
        return <SimpleAwsCredentialsCard isDefault={behavior.isDefault(x)} {...x} onProfileSwitch={behavior.grabCredentials} />;
      })}
    </>
  );
};

