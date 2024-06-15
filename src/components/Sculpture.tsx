"use client";
import  { useEffect, useState } from "react";
import PhotoGallery, { TImageList } from "./elements/PhotoGallery";
import { getImageSize } from "react-image-size";
import { TSculptureData } from "@/lib/store/slices/sculptureSlice";


interface ISculpture {
  sculptureData:TSculptureData
}
const Sculpture:React.FC<ISculpture> = ({sculptureData}) => {
  const [loading, setLoading] = useState(false);
  const [imageList, setImageList] = useState<TImageList[]>([]);
  // const sculptureData = useAppSelector(
  //   (state) => state.sculptureReducer.value.sculptureData
  // );
  useEffect(() => {
    async function getData() {
      try {
        
        setLoading(true);
        const tempList = [];
        for (let i = 0; i < sculptureData.length; i++) {
          
          let img = JSON.parse(sculptureData[i].sculpture.image);
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
            link: `/sculptures/${sculptureData[i].id}`,
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

  }, [sculptureData]);


  console.log({ imageList });
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
          Sculpture{" "}
        </h1>

        <PhotoGallery imageList={imageList} data={sculptureData} />
      </div>
    </section>
  );
};

export default Sculpture;
