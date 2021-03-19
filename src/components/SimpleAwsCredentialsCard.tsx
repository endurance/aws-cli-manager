import React from "react";
import { Box, Card, CardHeader } from "@material-ui/core";
import { BaseBehavior, useBehavior } from "@enduranceidehen/behavior";
import { Profile } from "aws-accounts/dist/classes/profile";
import { Manager } from "aws-accounts/dist/classes/manager";

class Props {
  name: string;
  aws_access_key_id: string;
  aws_secret_access_key: string;
  region: string;
}

class Behavior extends BaseBehavior<any> {
  confirmClick = async (profileName: string) => {
    // @ts-ignore
    const answer = window.confirm('Set as default?');
    if (answer) {
      const manager: Manager = await window.electron.switchToProfile(profileName);
      console.log(manager);
    }
  }
}

export const SimpleAwsCredentialsCard = (props: Props & any) => {
  const behavior = useBehavior(props, Behavior);
  return (
    <Box width={500}>
      <Card onClick={() => behavior.confirmClick(props.name)}>
        <CardHeader
          title={`Profile: ${props.name}`}
          subheader={`${props.region}`}
        />
      </Card>
    </Box>
  );
};