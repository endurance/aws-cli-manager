import React from "react";
import { useAsync } from "react-use";
import { BaseBehavior, useBehavior } from "@enduranceidehen/behavior";
import { Profile } from "aws-accounts/dist/classes/profile";
import { SimpleAwsCredentialsCard } from "./components/SimpleAwsCredentialsCard";

class ViewState {
  creds: Profile[] = [];
}

class Behavior extends BaseBehavior<ViewState> {
  public grabCredentials = async () => {
    const creds: Profile[] = await window.electron.getCredentialsAsFile();
    this.setter("creds", creds);
  };
  
  public waitThenGrabCredentials = () => {
    setTimeout(this.grabCredentials, 1000);
  }
}

const App = () => {
  const behavior = useBehavior({}, Behavior, new ViewState());
  useAsync(behavior.grabCredentials);
  return (
    <div className="App">
      {behavior.viewState.creds.map(x => {
        return <SimpleAwsCredentialsCard {...x} onProfileSwitch={behavior.waitThenGrabCredentials} />;
      })}
    </div>
  );
};

export default App;
