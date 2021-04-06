import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import { Row, Item } from "@mui-treasury/components/flex";
import { Info, InfoTitle, InfoSubtitle } from "@mui-treasury/components/info";
import { useTutorInfoStyles } from "@mui-treasury/styles/info/tutor";
import { useSizedIconButtonStyles } from "@mui-treasury/styles/iconButton/sized";
import { Edit, Remove } from "@material-ui/icons";
import { BaseBehavior, useBehavior } from "@enduranceidehen/behavior";
import { Box, useTheme } from "@material-ui/core";
import { renderModal } from "@enduranceidehen/modal-manager";
import { AddCredentialsDialog } from "./AddCredentialsDialog";

class Props {
  name: string;
  region: string;
  isDefault?: boolean;
  onProfileChange?: () => Promise<any>;
  onRemoveClick?: () => Promise<any>;
}

const useStyles = makeStyles(() => ({
  action: {
    backgroundColor: "#fff",
    color: "#000",
    boxShadow: "0 1px 4px 0 rgba(0,0,0,0.12)",
    "&:hover": {
      // backgroundColor: '#fff',
      // color: '#000',
    },
  },
}));

class Behavior extends BaseBehavior<any, Props> {
  confirmClick = async (profileName: string) => {
    const answer = window.confirm(`Set ${profileName} as default?`);
    if (answer) {
      await window.electron.switchToProfile(profileName);
      await this.props.onProfileChange();
    }
  };
  
  public onRemoveClick = (name: string) => async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const answer = window.confirm(`Remove profile ${name} permanently?`);
    if (answer) {
      await window.electron.removeProfile(name);
      await this.props.onProfileChange();
    }
  };
  
  public onEditClick = (name: string) => async (e) => {
    e.preventDefault();
    e.stopPropagation();
    renderModal(props => <AddCredentialsDialog {...props} initialProfileByName={this.props.name} />);
  };
}

export const AwsCredentialsCard = (props: Props) => {
  const theme = useTheme();
  const behavior = useBehavior(props, Behavior);
  const styles = useStyles();
  const iconBtnStyles = useSizedIconButtonStyles({padding: 6});
  
  return (
    <Row p={1.5} gap={2}
         bgcolor={props.isDefault ? theme.palette.grey.A100 : "#f5f5f5"}
         borderRadius={16}
         onClick={() => behavior.confirmClick(props.name)}
    >
      <Info position={"middle"} useStyles={useTutorInfoStyles}>
        <InfoTitle>{props.name}</InfoTitle>
        <InfoSubtitle>{props.region}</InfoSubtitle>
      </Info>
      <Box display='flex' ml={'auto'}>
        <Item>
          <IconButton
            className={styles.action}
            classes={iconBtnStyles}
            onClick={behavior.onEditClick(props.name)}
          >
            <Edit/>
          </IconButton>
        </Item>
        <Item>
          <IconButton
            className={styles.action}
            classes={iconBtnStyles}
            onClick={behavior.onRemoveClick(props.name)}
          >
            <Remove/>
          </IconButton>
        </Item>
      </Box>
    </Row>
  );
};
