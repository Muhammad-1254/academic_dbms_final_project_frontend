"use client";

import { useAppSelector } from "@/lib/store/hooks";
import Link from "next/link";
import React, { useState } from "react";
import {ProfileAvatar} from "./ProfileAvatar";
import Login from "@/components/Login";
const Navbar = () => {
  const isLogin = useAppSelector((state) => state.userReducer.value.isLogin);
  const [isNav, setIsNave] = useState(true);
  return (
    <header
      className="w-full h-16 md:h-18 border border-red-500
    flex items-center justify-between px-2 md:px-0 
    "
    >
      <div>
        <h1 className="text-2xl md:text-4xl font-semibold">Museum</h1>
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
      <ProfileAvatar/>
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
    name: "About",
    link: "/about",
  },
  {
    name: "Contact",
    link: "/contact",
  },
  {
    name: "Contact",
    link: "/contact",
  },
];
