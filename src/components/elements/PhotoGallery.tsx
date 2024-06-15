"use client";
import {  useState } from "react";

import PhotoAlbum from "react-photo-album";

// @ts-ignore
import LightBox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

// import optional lightbox plugins
// @ts-ignore

import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
// @ts-ignore

import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
// @ts-ignore

import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";
// @ts-ignore

import Zoom from "yet-another-react-lightbox/plugins/zoom";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Card, CardContent, CardTitle } from "../ui/card";

import { TPaintingData } from "@/lib/store/slices/paintingSlice";
import { TSculptureData } from "@/lib/store/slices/sculptureSlice";
import { TOtherArtData } from "@/lib/store/slices/otherArtSlice";
import { Button } from "../ui/button";

export type TImageList = {
  index: number;
  link: string;
  src: string;
  width: number;
  height: number;
};

export default function PhotoGallery({
  imageList,
  data,
}: {
  imageList: TImageList[];
  data: TPaintingData | TSculptureData | TOtherArtData | null;
}) {
  const router = useRouter();
  const [index, setIndex] = useState(-1);
  const [photoDataPageUrl, setPhotoDataPageUrl] = useState<string | null>(null);
  const [modelPath, setModelPath] = useState({ x: 0, y: 0, showMode: false });
  const [clickedPhotoData, setClickedPhotoData] = useState<TImageList | null>(
    null
  );

  // const [hover, setHover] = useState<{
  //   isHover: Boolean;
  //   photo: { objectId: string | null };
  // }>({ isHover: false, photo: { objectId: null } });
  // const [cardData, setCardData] = useState<
  //   TPaintingData | TSculptureData | TOtherArtData
  // >([]);

  // useEffect(() => {
  //   if (hover.isHover) {
  //     // @ts-ignore
  //     setCardData(data.filter((item: any) => {
  //       console.log(item.id == hover.photo.objectId)
  //       return item.id == hover.photo.objectId}));
  //     console.log({cardData})
  //   }
  // }, [hover]);

  // const handlePhotoHover = (event: any, photo: TImageList) => {
  //   setHover({ isHover: true, photo: { objectId: photo.link } });
  // };
  const handlePhotoClick = (event: any, photo: TImageList) => {
    setClickedPhotoData(photo);
    setModelPath({ x: event.pageX, y: event.pageY, showMode: true });
    setPhotoDataPageUrl(photo.link);
  };
  const renderPhoto = ({
    photo,
    imageProps,
  }: {
    photo: TImageList;
    imageProps: any;
  }) => (
    <div
      // onMouseEnter={(event) => handlePhotoHover(event, photo)}
      onClick={(event) => handlePhotoClick(event, photo)}
    >
      {/* @ts-ignore  */}
      <Image loading="lazy" priority={false} width={350} height={300} quality={70}  {...imageProps} alt={photo.link} />
    </div>
  );

  const openImageHandler = () => {
    if (photoDataPageUrl) {
      router.push(photoDataPageUrl);
    }
  };

  const showImageHandler = () => {
    if (clickedPhotoData) {
      setIndex(clickedPhotoData.index);
    }
  };
  return (
    <>
    
       <Card
        style={{ top: `${modelPath.y}px`, left: `${modelPath.x}px` }}
        className={`${modelPath.showMode ? "flex" : "hidden"}
     absolute 
     `}
      >
   
          <CardContent className="flex flex-col-reverse  md:flex-row items-center justify-normal
           gap-y-2 md:gap-x-4 p-2 md:py-4">
            <Button variant={'outline'} onClick={showImageHandler}>Show Image</Button>
            <Button variant={'outline'} onClick={openImageHandler}>GOTO</Button>
            <Button variant={"secondary"} onClick={()=>setModelPath({...modelPath, showMode:false})}>X</Button>
          </CardContent>
        </Card>

      <div
        className="w-full"
        // onMouseLeave={() =>
        //   setHover({ isHover: false, photo: { objectId: null } })
        // }
      >
        {/* {data&&
        <Card
        className={`fixed bottom-0 left-0     duration-200 
  w-full h-auto ${hover.isHover ? "max-h-[250px]" : "max-h-0"}`}
      >
        <CardContent className="w-[95%] md:w-[85%] lg:w-[80%] mx-auto  ">
          <CardTitle className="text-xl md:text-2xl lg:text-3xl">
            Title: {cardData[0]?.title}
          </CardTitle>
          <Separator />
          <ScrollArea>
            <div className="pt-2">
              <p className="">Description: {cardData[0]?.description}</p>
              <p>Department: {cardData[0]?.department}</p>
              <p>Dimensions: {cardData[0]?.dimensions}</p>
              <p>Epoch: {cardData[0]?.epoch}</p>
              <p>Art Type: {cardData[0]?.object_type}</p>
              <p>Style: {cardData[0]?.style}</p>
              <p>Year: {cardData[0]?.year}</p>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>} */}

        <PhotoAlbum
          photos={imageList}
          layout="masonry"
          targetRowHeight={150}
          renderPhoto={renderPhoto}
        />

        <LightBox
          className="z-0 "
          slides={imageList}
          open={index >= 0}
          index={index}
          close={() => setIndex(-1)}
          // enable optional lightbox plugins
          plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
        />
      </div>
    </>
  );
}
