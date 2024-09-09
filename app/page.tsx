import React from "react";
import Books from "./components/books/Books";
import { cn } from "./utils/cn";
import { Button } from "@mui/material";
import Image from "next/image";
import { Images } from "./url/urls";
import Header from "./components/header";
type Props = {};

const page = () => {
  const { landingSvg } = Images;
  return (
    <>
    <Header/>
    <main
      className={cn(
        "grid h-[89.1vh] gap-6 p-4 border border-slate-800 items-center",
        "lg:grid-cols-bestseller_container sm:grid-cols-1 grid-cols-1"
      )}
    >
      {/* Section: Heading and Text */}
      <section className="col-[2/3] flex flex-col  gap-6 p-6 border">
        <h1 className="text-8xl text-naples_yellow-100 font-semibold">
          Your online library
        </h1>
        <span className="text-naples_yellow-10 text-md">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus autem
          unde tempora alias magni dolore nobis explicabo non officia quia culpa
          incidunt odit placeat, sapiente ipsa fugiat voluptatibus voluptate
          iste possimus quaerat?
        </span>
        <Button color="info" size="large" variant="contained">
          Let's go
        </Button>
      </section>

      {/* Section: Image */}
      <section className="md:col-[3/4] row-[1/2] ">
        <Image alt="landing" width={800} height={800} src={landingSvg} />
      </section>
    </main>
  </>
  );
};

export default page;
