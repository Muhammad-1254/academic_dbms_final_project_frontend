'use client'

import { useEffect, } from "react";
import {  getCookie, loginUserApiFunction } from "@/lib/utils/apiFunctions";
import { setUser } from "@/lib/store/slices/userSlice";
import { useDispatch } from "react-redux";

const LoginProvider = ({children}:{children:React.ReactNode}) => {
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
        //  console.log({res})
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
        app_startup();
        
      }, []);

  return (children)
}

export default LoginProvider
