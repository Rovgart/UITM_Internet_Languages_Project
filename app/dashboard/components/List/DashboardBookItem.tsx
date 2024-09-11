"use client";
import { Container } from "@mui/material";
import Image from "next/image";
import React from "react";

const DashboardBookItem = ({ image }: { image: string }) => {
  return (
    <Container className="flex flex-col">
      <Image src={image} alt="image" />
    </Container>
  );
};

export default DashboardBookItem;
