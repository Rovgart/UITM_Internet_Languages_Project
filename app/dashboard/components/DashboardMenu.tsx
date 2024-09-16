import React from "react";
import List from "@mui/material/List";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import HouseIcon from "@mui/icons-material/House";
import ExploreIcon from "@mui/icons-material/Explore";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import HelpIcon from "@mui/icons-material/Help";
import DashboardSearch from "../components/DashboardSearch";

function DashboardMenu() {
  return (
    <main className="col-[1/2] sm:block hidden border  ">
      <List className=" sm:flex sm:flex-col" sx={{ bgcolor: "white" }}>
        <DashboardSearch />

        <ListItemButton>
          <ListItemIcon className="flex items-center gap-2">
            <HouseIcon color="info" fontSize="large" />
            <ListItemText primary="Home"></ListItemText>
          </ListItemIcon>
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon className="flex items-center gap-2">
            <ExploreIcon color="info" fontSize="large" />
            <ListItemText primary="Discover"></ListItemText>
          </ListItemIcon>
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon className="flex items-center gap-2">
            <BookmarkIcon color="info" fontSize="large" />
            <ListItemText primary="Bookmark"></ListItemText>
          </ListItemIcon>
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon className="flex items-center gap-2">
            <HelpIcon color="info" fontSize="large" />
            <ListItemText primary="Help"></ListItemText>
          </ListItemIcon>
        </ListItemButton>
      </List>
    </main>
  );
}

export default DashboardMenu;
