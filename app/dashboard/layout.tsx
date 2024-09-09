"use client";
import Image from "next/image";
import React, { useState } from "react";
import logo from "../assets/book_preview.png";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardMenu from "./components/DashboardMenu";
import {
  Avatar,
  Button,
  ButtonGroup,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
function Layout() {
  const [openMenu, setOpenMenu] = useState(false);
  const handleOpenClose = () => {
    setOpenMenu((prev) => !prev);
  };
  const matches = useMediaQuery("(min-width:768px)");
  return (
    <main>
      <picture className="sm:flex items-center gap-4 hidden ">
        <Image width={36} height={36} src={logo} alt="logo" />
        <h1>BookJourney</h1>
      </picture>
      <div className="p-2 flex items-center justify-around">
        <div onClick={handleOpenClose}>
          <MenuIcon className="sm:hidden" fontSize="large" />
        </div>
        <Avatar></Avatar>
        <ButtonGroup>
          <IconButton className="bg-blue-300" variant="contained" size="large">
            <NotificationsNoneIcon color="action" variant />
          </IconButton>
        </ButtonGroup>
      </div>
      {openMenu || matches ? <DashboardMenu /> : ""}
    </main>
  );
}

export default Layout;
