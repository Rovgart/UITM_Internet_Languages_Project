"use client";
import { Dancing_Script, Lato, Roboto_Mono } from "next/font/google";
import Link from "next/link";
import React, { ReactNode, useState } from "react";
import { CiShoppingCart } from "react-icons/ci";
import Hamburger from "./hamburger/Hamburger";
import { GiHamburgerMenu } from "react-icons/gi";
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
  const [isOpened, setIsOpened] = useState(false);
  return (
    <div className={lato.className}>
      <header className="bg-midnight_green px-5 text-midnight_green-900 min-h-[12vh] flex justify-around items-center">
        <picture className="order-1  flex  flex-col justify-center items-center  bg-reseda_green-700">
          <span
            className={`${roboto.variable} tracking-wide font-robotoSzef text-[2em] flex items-center justify-center  font-semibold`}
          >
            Bookjourney
          </span>
        </picture>
        <nav className="md:flex gap-3 order-3 sm:order-2 hidden">
          <Link href={"/"}>Home</Link>
          <Link href={"/About"}>About</Link>
          <Link href={"/login"}>SignIn</Link>
          <Link href={"/signup"}>SignUp</Link>
        </nav>
        <Hamburger
          hamburgerState={isOpened}
          closeHandler={() => setIsOpened(false)}
        />
        <nav className="flex items-center order-2 sm:order-3">
          <div className="size-10 cursor-pointer rounded-full overflow-hidden flex justify-center items-center bg-reseda_green-900">
            <CiShoppingCart size={"3rem"} />
            <h1>{/*Some Cart Prop for product count */}</h1>
          </div>
        </nav>
        {/* Hamburger icon */}
        <GiHamburgerMenu
          className="md:hidden text-3xl "
          onClick={() => setIsOpened(true)}
        />
      </header>
    </div>
  );
};

export default Header;
