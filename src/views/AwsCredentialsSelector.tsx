import React from "react";
import { useAsync } from "react-use";
import { BaseBehavior, useBehavior } from "@enduranceidehen/behavior";
import { Profile } from "aws-accounts/dist/classes/profile";
import { plainToClass } from "class-transformer";
import { AwsCredentialsCard } from "../components/AwsCredentialsCard";
import { ProfileOptions } from "aws-accounts/dist/constants";
import { Grid } from "@material-ui/core";

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
  };
  
  public defaultProfile = () => {
    return this.viewState.creds.find((x) => x.getName() === "default");
  };
  
  public isThisDefault = (profile: ProfileOptions & any) => {
    const defProfile = this.defaultProfile() as unknown as ProfileOptions;
    return defProfile.aws_access_key_id === profile.aws_access_key_id && defProfile.aws_secret_access_key === profile.aws_secret_access_key;
  }
  
  public cardItem = (profile: Profile) => {
    const profileOptions = profile as unknown as ProfileOptions;
    const {name, region} = profileOptions;
    console.log(this.isThisDefault(profileOptions));
    return (
      <Grid item xs={4}>
        <AwsCredentialsCard
          key={name}
          name={name}
          region={region}
          isDefault={this.isThisDefault(profileOptions)}
          onProfileChange={this.grabCredentials}
        />
      </Grid>
    );
  };
}

export const AwsCredentialsSelector = () => {
  const behavior = useBehavior({}, Behavior, new ViewState());
  useAsync(behavior.grabCredentials);
  return (
    <Grid container spacing={2}>
      {behavior.allCredentialsExceptDefault().map(behavior.cardItem)}
    </Grid>
  );
};

