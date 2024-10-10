"use client";
import {
  IconButton,
  Container,
  Avatar,
  Button,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LogoutIcon from "@mui/icons-material/Logout";
import { useGetCurrentUser } from "@/hooks/useGetCurrentUser";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/actions/logout";
import toast from "react-hot-toast";
import { routes } from "constants/routes";
import { useMutation } from "@tanstack/react-query";
function Header() {
  const { data } = useGetCurrentUser();

  const router = useRouter();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { mutate } = useMutation({
    mutationFn: logoutUser,
    mutationKey: ["logout"],
    onSuccess: () => {
      toast.success("User logged out ");
      router.push(routes.signIn);
    },
    onError: (error: any) => {
      toast.error(error?.message);
    },
  });
  const handleLogout = () => {
    mutate();
  };
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
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <Avatar />
          </Button>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            slotProps={{
              paper: {
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&::before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem onClick={handleClose}>
              <Avatar /> {data?.email}
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleClose}>
              <ListItemIcon></ListItemIcon>
              Add another account
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ListItemIcon></ListItemIcon>
              Settings
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Container>
      </Container>
    </header>
  );
}

export default Header;
