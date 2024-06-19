"use client";

import  { useEffect, useState } from "react";
import PhotoGallery, { TImageList } from "./elements/PhotoGallery";
import { useAppSelector } from "@/lib/store/hooks";
import { getImageSize } from "react-image-size";
import { TPaintingData } from "@/lib/store/slices/paintingSlice";


interface IPaintingData {
  paintingData: TPaintingData;
}

const Painting:React.FC<IPaintingData> = ({paintingData}) => {

  const [loading, setLoading] = useState(false);
  const [imageList, setImageList] = useState<TImageList[]>([]);
  // const paintingData = useAppSelector(
  //   (state) => state.paintingReducer.value.paintingData
  // );

  useEffect(() => {
    async function getData() {
      
      try {
        
        setLoading(true);
        const tempList = []
        for (let i = 0; i < paintingData.length; i++) {
          const img = JSON.parse(paintingData[i].painting.image)[0];
          const dimensions = await getImageSize(img);

          tempList.push({
            src: img,
            width: dimensions.width,
            height: dimensions.height,
            link:`/paintings/${paintingData[i].id}`,
            index:i
          });
        }
        setImageList([...tempList])

        setLoading(false);
      } catch (error) {
        console.log({ error });
        setLoading(false);
      }
    }
      getData();
  }, [paintingData]);

  if (loading) return <div className="w-full h-full flex items-center justify-center ">Loading...</div>;
  return (
    <section className=" mt-10 w-full">
      <div className="w-[95%] md:w-[92%] mx-auto ">
        <h1 className="text-2xl md:text-3xl lg:text-5xl font-semibold pb-4 pt-2">Painting </h1>
   
      
        <PhotoGallery
          imageList={imageList}
          data={paintingData}
        />
      </div>
    </section>
  );
};

export default Painting;
