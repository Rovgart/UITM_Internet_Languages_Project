"use client";
import { Container } from "@mui/material";
import Image from "next/image";
import React from "react";

<<<<<<< Updated upstream
const DashboardBookItem = ({ image }: { image: string }) => {
=======
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
>>>>>>> Stashed changes
  return (
    <Container className="flex flex-col">
      <Image src={image} alt="image" />
    </Container>
  );
};

export default DashboardBookItem;
