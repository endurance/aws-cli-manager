import React, { useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { BaseBehavior, useBehavior } from "@enduranceidehen/behavior";
import { plainToClass } from "class-transformer";

class ViewState {
  name: string = "";
  aws_access_key_id: string = "";
  aws_secret_access_key: string = "";
  region: string = "";
}

class Props {
  onChange?: any;
  initialState: string;
}

class Behavior extends BaseBehavior<ViewState, Props> {
  public eventSetterChange = (propertyPath) => async (e) => {
    this.eventSetter(propertyPath)(e);
    
  };
}

const initialize = (props) => {
  return props.initialState ?
    plainToClass(ViewState, props.initialState)
    :
    new ViewState();
};

export const AddCredentialsForm = (props: Props) => {
  const b = useBehavior(props, Behavior, () => initialize(props));
  
  useEffect(() => {
    props.onChange(b.viewState);
  }, [b.viewState]);
  
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        {props.initialState ? "Edit an existing credential" : "Add a new credential"}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            label="Profile"
            required
            fullWidth
            value={b.viewState.name}
            onChange={b.eventSetterChange("name")}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Access Key Id"
            required
            fullWidth
            value={b.viewState.aws_access_key_id}
            onChange={b.eventSetterChange("aws_access_key_id")}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Secret Access Key Id"
            required
            fullWidth
            value={b.viewState.aws_secret_access_key}
            onChange={b.eventSetterChange("aws_secret_access_key")}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Region"
            required
            fullWidth
            value={b.viewState.region}
            onChange={b.eventSetterChange("region")}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
