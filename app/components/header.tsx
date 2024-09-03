"use client";
import { Dancing_Script, Lato } from "next/font/google";
import Link from "next/link";
import React, { ReactNode, useEffect, useState } from "react";
import Hamburger from "./hamburger/Hamburger";
import { GiHamburgerMenu } from "react-icons/gi";
import Search from "./search/search";
import { routes } from "constants/routes";
import { Avatar } from "@mui/material";
import useAppStore from "@/store/ApplicationStore";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getUser } from "@/actions/getCurrentUser";
type Props = {};
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
  const { hamburgerState, searchState } = headerState;
  const { isAuthenticated } = useAppStore();
  const { data, isPending, isError } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });
  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <div className={lato.className}>
      <header className="bg-midnight_green p-5 text-midnight_green-900 flex justify-around items-center  w-full">
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
        {isAuthenticated ? (
          <>
            <Avatar alt={data} src={data} className="order-3" />
            <p>{data}</p>
          </>
        ) : (
          <nav className={`md:flex gap-3 order-3 sm:order-2 hidden`}>
            <Link href={routes.signIn}>Sign In</Link>
            <Link href={routes.signUp}>Sign Up</Link>
          </nav>
        )}

        <Hamburger
          hamburgerState={hamburgerState}
          closeHandler={() => setHeaderState({ hamburgerState: false })}
        />
        <nav
          className={` ${
            searchState ? "hidden" : "block"
          } flex items-center order-2 sm:order-3`}
        ></nav>
        <GiHamburgerMenu
          className="md:hidden text-3xl "
          onClick={() => setHeaderState({ hamburgerState: true })}
        />
      </header>
    </div>
  );
};

export default Header;
