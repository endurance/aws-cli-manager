import { createMuiTheme } from "@material-ui/core";
import { deepOrange, orange, red } from "@material-ui/core/colors";

export const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: orange[500]
    },
    secondary: {
      main: deepOrange[800],
    },
  }
})
