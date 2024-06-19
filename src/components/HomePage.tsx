"use client";
import { TPaintingData } from "@/lib/store/slices/paintingSlice";
import Painting from "./Painting";
import Login from "./Login";
import { useAppSelector } from "@/lib/store/hooks";
import {  TSculptureData } from "@/lib/store/slices/sculptureSlice";
import {  TOtherArtData } from "@/lib/store/slices/otherArtSlice";
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
  const showLoginDialog= useAppSelector(state=>state.mixReducer.value.showLoginDialog)
 
  
  

  return  (
    <div className="w-full mt-10 mb-14 md:mb-20">
      {showLoginDialog &&<Login/>}
     <Painting paintingData={paintingData}/>
     <Sculpture sculptureData={sculptureData}/>
     <OtherArt otherArtData={otherArtData}/>
<Exhibitions exhibitionsData={exhibitionsData}/>


      
    </div>
    )
  

};

export default HomePage;
