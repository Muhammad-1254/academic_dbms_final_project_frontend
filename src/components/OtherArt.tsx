"use client";
import  { useEffect, useState } from "react";
import PhotoGallery, { TImageList } from "./elements/PhotoGallery";
import { getImageSize } from "react-image-size";
import {  TOtherArtData } from "@/lib/store/slices/otherArtSlice";


interface IOtherArtData {
  otherArtData: TOtherArtData;
}

const OtherArt:React.FC<IOtherArtData> = ({otherArtData}) => {
  const [loading, setLoading] = useState(false);
  const [imageList, setImageList] = useState<TImageList[]>([]);
  // const otherArtData = useAppSelector(
  //   (state) => state.otherArtReducer.value.otherArtData
  // );
  useEffect(() => {
    setLoading(true);
    async function getData() {
      try {
       
        const tempList = [];
        for (let i = 0; i < otherArtData.length; i++) {
          otherArtData[i].id
          let img = JSON.parse(otherArtData[i].other.image);
          let dimensions;
          if (typeof img ==='object' && img.length >= 1){

            dimensions = await getImageSize(img[0]);
            img = img[0]

            }else{
 
            dimensions  ={height:350, width:700}
           img = '/imgNotFound.jpg' 
          }

          tempList.push({
            src: img,
            width: dimensions.width,
            height: dimensions.height,
            link: `/other_arts/${otherArtData[i].id}`,
            index: i,
          });
        }
        setImageList([...tempList]);

        setLoading(false);
      } catch (error) {
        
        console.log({ error });
        setLoading(false);
      }
    }
      getData();
  }, [otherArtData]);


  if (loading)
    return (
      <div className="w-full h-full flex items-center justify-center ">
        Loading...
      </div>
    );
  return (
    <section className=" mt-10 w-full">
      <div className="w-[95%] md:w-[92%] mx-auto ">
        <h1 className="text-2xl md:text-3xl lg:text-5xl font-semibold pb-4 pt-2">
          Other Art{" "}
        </h1>

        <PhotoGallery imageList={imageList} data={otherArtData} />
      </div>
    </section>
  );
};

export default OtherArt;
