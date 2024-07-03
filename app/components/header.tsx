"use client";
import { Dancing_Script, Lato, Roboto_Mono } from "next/font/google";
import Link from "next/link";
import React, { ReactNode, useState } from "react";
import { CiShoppingCart } from "react-icons/ci";
import Hamburger from "./hamburger/Hamburger";
import { GiHamburgerMenu } from "react-icons/gi";
import { CiSearch } from "react-icons/ci";
import { TextField } from "@mui/material";
import Search from "./search/search";
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
  children: ReactNode;
  auth: ReactNode;
}) => {
  const [headerState, setHeaderState] = useState({
    hamburgerState: false,
    searchState: false,
  });
  const { hamburgerState, searchState } = headerState;
  return (
    <div className={lato.className}>
      <header className="bg-midnight_green px-5 text-midnight_green-900 min-h-[12vh] flex justify-around items-center fixed top-0 w-full">
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
        <nav className={`md:flex gap-3 order-3 sm:order-2 hidden`}>
          <Link href={"/"}>Home</Link>
          <Link href={"/About"}>About</Link>
          <Link href={"/login"}>SignIn</Link>
          <Link href={"/signup"}>SignUp</Link>
        </nav>
        <Hamburger
          hamburgerState={hamburgerState}
          closeHandler={() => setHeaderState({ hamburgerState: false })}
        />
        <nav
          className={` ${
            searchState ? "hidden" : "block"
          } flex items-center order-2 sm:order-3`}
        >
          {/* Hamburger icon */}
          <Search searchStateProp={searchState} />
        </nav>
        <GiHamburgerMenu
          className="md:hidden text-3xl "
          onClick={() => setHeaderState({ hamburgerState: true })}
        />
      </header>
    </div>
  );
};

export default Header;
