import React from "react";
import { Box, Card, CardHeader, makeStyles, Theme } from "@material-ui/core";
import { BaseBehavior, useBehavior } from "@enduranceidehen/behavior";
import { Manager } from "aws-accounts/dist/classes/manager";

class Props {
  name: string;
  region: string;
  isDefault: boolean;
  onProfileSwitch: () => void = () => {};
}

class Behavior extends BaseBehavior<any> {
  confirmClick = async (profileName: string) => {
    const answer = window.confirm(`Set ${profileName} as default?`);
    if (answer) {
      const manager: Manager = await window.electron.switchToProfile(profileName);
      await this.props.onProfileSwitch();
    }
  };
}

const useStyles = makeStyles<Theme, Props>((theme) => {
  return {
    card: props => ({
      backgroundColor: props.isDefault && theme.palette.primary.main,
    }),
  };
});

export const SimpleAwsCredentialsCard = (props: Props & any) => {
  const behavior = useBehavior(props, Behavior);
  const styles = useStyles(props);
  return (
    <Box width={500} bgcolor={props.isDefault ? "primary.main" : false}>
      <Card onClick={() => behavior.confirmClick(props.name)} className={styles.card}>
        <CardHeader
          title={`Profile: ${props.name}`}
          subheader={`${props.region}`}
        />
      </Card>
    </Box>
  );
};
