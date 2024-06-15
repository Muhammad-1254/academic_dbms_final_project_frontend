"use client";
import { TPaintingData } from "@/lib/store/slices/paintingSlice";
import {  getCookie, loginUserApiFunction } from "@/lib/utils/apiFunctions";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Painting from "./Painting";
import Login from "./Login";
import { useAppSelector } from "@/lib/store/hooks";
import { setUser } from "@/lib/store/slices/userSlice";
import {  TSculptureData } from "@/lib/store/slices/sculptureSlice";
import {  TOtherArtData } from "@/lib/store/slices/otherArtSlice";
import Loading from "./elements/Loading";
import Sculpture from "./Sculpture";
import OtherArt from "./OtherArt";
import Exhibitions from "./Exhibitions";
import { TExhibitions } from "@/lib/types";

interface IHomePage{
    paintingData: TPaintingData,
     sculptureData:TSculptureData,
      otherArtData:TOtherArtData
      exhibitionsData:TExhibitions[]
}

const HomePage:React.FC<IHomePage> = ({paintingData, sculptureData, otherArtData,exhibitionsData}) => {
    console.log({paintingData})
    const [isLoading,setIsLoading] = useState(false)
  const dispatch = useDispatch();
  const showLoginDialog= useAppSelector(state=>state.mixReducer.value.showLoginDialog)
  
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
     console.log({res})
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
    // app_startup();
    setIsLoading(false);
  }, []);
  
  // useEffect(() => {
  //   dispatch(setPaintingData(paintingData));
  //   dispatch(setSculptureData(sculptureData));
  //   dispatch(setOtherArtData(otherArtData));
  // }, []);

  return  <>
{(isLoading?<Loading className=""/>:
    <div className="w-full mt-10 mb-14 md:mb-20">
      {showLoginDialog &&<Login/>}
     <Painting paintingData={paintingData}/>
     <Sculpture sculptureData={sculptureData}/>
     <OtherArt otherArtData={otherArtData}/>
<Exhibitions exhibitionsData={exhibitionsData}/>


      
    </div>
    )}
  
</>
};

export default HomePage;
