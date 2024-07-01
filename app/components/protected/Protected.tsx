import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

const Protected = async ({ children }: { children: ReactNode }) => {
  const sessionRetriever = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/protected");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      if (data) {
        console.log(data);
        return data;
      }
    } catch (error: any) {
      console.error(error);
    }
  };
  const session = await sessionRetriever();
  if (!session) {
    return redirect("/login");
  }

  return <>{children}</>;
};

export default Protected;
