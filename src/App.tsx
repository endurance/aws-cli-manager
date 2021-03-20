import React from "react";
import { Container, CssBaseline, Grid } from "@material-ui/core";
import { AwsCredentialsSelector } from "./views/AwsCredentialsSelector";
import { SideBar } from "./layout/SideBar";

const App = () => {
  return (
    <div className="App">
      <CssBaseline />
      <Grid container>
        <Grid item>
          <SideBar/>
        </Grid>
        <Grid item>
          <Container maxWidth="lg">
            <AwsCredentialsSelector/>
          </Container>
        </Grid>
      </Grid>
    </div>
  );
};

export default App;
