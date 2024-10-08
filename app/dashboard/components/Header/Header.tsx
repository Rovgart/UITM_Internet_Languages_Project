import { IconButton, Container, Avatar } from "@mui/material";
import React, { useEffect } from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LogoutIcon from "@mui/icons-material/Logout";
import { useGetCurrentUser } from "@/hooks/useGetCurrentUser";
function Header() {
  const { data } = useGetCurrentUser();
  return (
    <header className="w-full col-[1/-1] row-[1] border flex p-2 bg-background-default ">
      <Container className="flex justify-around items-center gap-12">
        <h1 className="text-info-main font-semibold">BookJourney</h1>
        <Container className="flex items-center justify-end gap-4">
          <IconButton>
            <NotificationsIcon fontSize="large" color="info" />
          </IconButton>
          <IconButton>
            <DarkModeIcon color="info" />
          </IconButton>
          <Avatar sx={{ bgcolor: "teal" }}>D</Avatar>
        </Container>
      </Container>
    </header>
  );
}

export default Header;
