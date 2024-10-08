"use client";
import { Dancing_Script, Lato } from "next/font/google";
import Link from "next/link";
import React, { ReactNode, useEffect, useState } from "react";

import { GiHamburgerMenu } from "react-icons/gi";
import Search from "./search/search";
import { routes } from "constants/routes";
import {
  Avatar,
  Button,
  Divider,
  ListItemIcon,
  Menu,
  MenuItem,
} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getUser } from "@/actions/getCurrentUser";
import LogoutIcon from "@mui/icons-material/Logout";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/actions/logout";
import { useTheme } from "@/providers/theme-provider";
const lato = Lato({ subsets: ["latin"], weight: "400" });
const roboto = Dancing_Script({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-dancingScript",
});
const Header = ({
  children,
  auth,
}: {
  children?: ReactNode;
  auth?: ReactNode;
}) => {
  const [headerState, setHeaderState] = useState({
    hamburgerState: false,
    searchState: false,
  });
  const router = useRouter();
  const { hamburgerState, searchState } = headerState;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { data, isPending, isError } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });
  const { mutate } = useMutation({
    mutationFn: logoutUser,
    mutationKey: ["logout"],
    onSuccess: () => {
      toast.success("User logged out ");
      router.push(routes.signIn);
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });
  const handleLogout = () => {
    mutate();
  };
  const theme = useTheme();
  return (
    <div className={lato.className}>
      <header
        className={`p-5 text-info-main flex justify-around items-center  w-full`}
      >
        <picture
          className={`${
            searchState ? "hidden" : "block"
          } order-1  flex  flex-col justify-center items-center  bg-reseda_green-700`}
        >
          <span
            className={`${roboto.variable} tracking-wide font-robotoSzef text-[2em] flex items-center justify-center  font-semibold`}
          >
            Bookjourney
          </span>
        </picture>
        <div className="flex items-center gap-3 order-5">
          <nav className={`md:flex gap-3 hidden`}>
            <Link href={routes.signIn}>Sign In</Link>
            <Link href={routes.signUp}>Sign Up</Link>
          </nav>
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
              <Avatar /> Profile
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
        </div>
        <p>{data}</p>

        <nav
          className={` ${
            searchState ? "hidden" : "block"
          } flex items-center order-2 sm:order-3`}
        ></nav>
        <GiHamburgerMenu className="md:hidden text-3xl " />
      </header>
    </div>
  );
};

export default Header;
