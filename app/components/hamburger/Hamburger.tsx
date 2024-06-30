"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
type HamburgerProps = {
  closeHandler: () => void;
  hamburgerState: boolean;
};
const Hamburger = ({ closeHandler, hamburgerState }: HamburgerProps) => {
  return (
    <nav
      className={`md:hidden fixed top-0 z-[99999] ${
        hamburgerState ? "left-[0]" : "left-[-300px]"
      }
      }] sm:w-1/3 w-1/2 text-xl text-midnight_green-900 flex flex-col gap-4 pl-3 pt-3 h-screen bg-midnight_green-200`}
    >
      <IoMdClose
        onClick={closeHandler}
        className="cursor-pointer text-reseda_green-500 hover:text-reseda_green-900"
      />
      <h1 className="text-reseda_green-400 text-center text-2xl">Bookify</h1>
      <Link href={"/"}>Home</Link>
      <Link href={"/About"}>About</Link>
      <Link
        className="pl-1.5 pr-1.5 pt-1.5 pb-1.5 bg-reseda_green-800 w-1/2 rounded-lg"
        href={"/login"}
      >
        SignIn
      </Link>
      <Link
        className="pl-1.5 pr-1.5 pt-1.5 pb-1.5 bg-reseda_green-600 w-1/2 rounded-lg"
        href={"/signup"}
      >
        SignUp
      </Link>
    </nav>
  );
};

export default Hamburger;
