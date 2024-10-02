"use client";
import { Container } from "@mui/material";
import Image from "next/image";
import React from "react";

const DashboardBookItem = ({
  id,
  image,
  author,
  title,
}: {
  id: number;
  image: string;
  author: string;
  title: string;
}) => {
  return (
    <Container className="flex flex-col">
      <Image src={image} alt="image" />
    </Container>
  );
};

export default DashboardBookItem;
