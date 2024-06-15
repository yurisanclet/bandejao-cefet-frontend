import React from "react";
import { ArrowForwardIos, FiberManualRecord } from "@mui/icons-material";
interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps){
  return (
    <header className="bg-transparent flex items-center mb-20">
      <ArrowForwardIos className="mr-2" />
      <h1 className="text-4xl font-bold">{title}</h1>
    </header>
  );
}