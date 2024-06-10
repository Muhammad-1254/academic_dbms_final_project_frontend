"use client";

import Navbar from "@/components/Navbar";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";

import Cookie from "js-cookie";
import { getCookie, loginUserApiFunction } from "@/lib/utils/apiFunctions";
import { setUser } from "@/lib/store/slices/userSlice";
import { useDispatch } from "react-redux";

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    // checking if user cookies is present then log in
    async function app_startup() {
      const cookie = getCookie();
      if (typeof cookie == "object") {
        const res = await loginUserApiFunction(
          cookie.email,
          cookie.password,
          cookie.role
        );
        dispatch(
          setUser({
            userId: res.userId,
            email: res.email,
            username: res.username,
            isLogin: true,
            isAuth: res.isAuth,
            role: res.role,
          })
        );
      }
    }
    setIsLoading(true);
    app_startup();
    setIsLoading(false);
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="w-full h-full text-2xl">loading...</div>
      ) : (
        <div className="w-full">
          <Navbar />
        </div>
      )}
    </>
  );
};

export default HomePage;
