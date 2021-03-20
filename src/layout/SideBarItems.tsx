import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";

export const SideBarItems = () => {
  return (
    <div>
      <ListItem button>
        <ListItemIcon>
          <DashboardIcon/>
        </ListItemIcon>
        <ListItemText primary="AWS Credentials"/>
      </ListItem>
      {/*<ListItem button>*/}
      {/*  <ListItemIcon>*/}
      {/*    <ShoppingCartIcon />*/}
      {/*  </ListItemIcon>*/}
      {/*  <ListItemText primary="Orders" />*/}
      {/*</ListItem>*/}
      {/*<ListItem button>*/}
      {/*  <ListItemIcon>*/}
      {/*    <PeopleIcon />*/}
      {/*  </ListItemIcon>*/}
      {/*  <ListItemText primary="Customers" />*/}
      {/*</ListItem>*/}
      {/*<ListItem button>*/}
      {/*  <ListItemIcon>*/}
      {/*    <BarChartIcon />*/}
      {/*  </ListItemIcon>*/}
      {/*  <ListItemText primary="Reports" />*/}
      {/*</ListItem>*/}
      {/*<ListItem button>*/}
      {/*  <ListItemIcon>*/}
      {/*    <LayersIcon />*/}
      {/*  </ListItemIcon>*/}
      {/*  <ListItemText primary="Integrations" />*/}
      {/*</ListItem>*/}
    </div>
  );
};

