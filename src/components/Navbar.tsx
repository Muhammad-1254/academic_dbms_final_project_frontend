"use client";

import { useAppSelector } from "@/lib/store/hooks";
import Link from "next/link";
import React, { useState } from "react";
import { ProfileAvatar } from "./ProfileAvatar";
import Login from "@/components/Login";
const Navbar = () => {
  const isLogin = useAppSelector((state) => state.userReducer.value.isLogin);
  return (
    <header
      className="w-full h-16 md:h-18 
    flex items-center justify-between px-2 md:px-0 
    "
    >
      <div>
        <Link href={"/"} className="text-2xl md:text-4xl font-semibold">
          Museum
        </Link>
      </div>

      <nav className="hidden md:flex items-center justify-normal gap-x-8">
        <ul className="flex items-center justify-normal gap-x-5">
          {navbarList.map(({ link, name }, _) => (
            <li key={_}>
              <Link href={link}>{name}</Link>
            </li>
          ))}
        </ul>
        {isLogin ? <ProfileAvatar /> : <Login />}
      </nav>
      <nav className="flex md:hidden">
      {isLogin ? <ProfileAvatar /> : <Login />}
      </nav>
    </header>
  );
};

export default Navbar;

export const navbarList = [
  {
    name: "Home",
    link: "/",
  },

  {
    name: "Exhibitions",
    link: "/exhibitions",
  },

  {
    name: "Paintings",
    link: "/paintings",
  },
  {
    name: "Sculptures",
    link: "/sculptures",
  },
  {
    name: "OtherArts",
    link: "/other_arts",
  },
  {
    name: "Artists",
    link: "/artists",
  },
];
