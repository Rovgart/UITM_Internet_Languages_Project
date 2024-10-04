import { IconButton, Container, Avatar } from "@mui/material";
import React, { useEffect } from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LogoutIcon from "@mui/icons-material/Logout";
import { useGetCurrentUser } from "@/hooks/useGetCurrentUser";
function Header() {
  const { data } = useGetCurrentUser();
  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <header className="w-full col-[1/-1] row-[1] border flex p-2 ">
      <Container className="flex justify-around items-center gap-12">
        <h1>BookJourney</h1>
        <Container className="flex items-center justify-end gap-4">
          <IconButton>
            <NotificationsIcon fontSize="large" />
          </IconButton>
          <IconButton>
            <DarkModeIcon />
          </IconButton>
          <Avatar>D</Avatar>
        </Container>
      </Container>
    </header>
  );
}

export default Header;
