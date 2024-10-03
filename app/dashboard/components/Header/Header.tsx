import { IconButton, Container, Avatar } from "@mui/material";
import React from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LogoutIcon from "@mui/icons-material/Logout";
function Header() {
  return (
    <header className="w-full col-[1/-1] row-[1] border flex p-2 ">
      <Container className="flex justify-around items-center gap-12">
        <h1>BookJourney</h1>
        <Container className="flex items-center justify-end">
          <IconButton>
            <NotificationsIcon fontSize="large" />
          </IconButton>
          <IconButton>
            <DarkModeIcon />
          </IconButton>
          <Avatar>D</Avatar>
          <LogoutIcon />
        </Container>
      </Container>
    </header>
  );
}

export default Header;
