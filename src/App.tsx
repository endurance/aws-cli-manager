import React from "react";
import { Box, CssBaseline, ThemeProvider } from "@material-ui/core";
import { AwsCredentialsSelector } from "./views/AwsCredentialsSelector";
import { ModalContainer } from "@enduranceidehen/modal-manager";
import { AddNewCredentialsButton } from "./components/AddNewCredentialsButton";
import Dashboard from "./layout/Dashboard";
import { theme } from "./layout/theme";

const App = () => {
  document.title = "AWS Credentials Manager";
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <ModalContainer/>
      <Dashboard>
        <AddNewCredentialsButton/>
        <Box mb={4}/>
        <AwsCredentialsSelector/>
      </Dashboard>
    </ThemeProvider>
  );
};

export default App;
