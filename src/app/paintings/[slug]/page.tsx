import { TPaintingData as TPainting } from "@/lib/store/slices/paintingSlice";
import { ArtObjectType, TArtist } from "@/lib/types";
import { getAllArtObjectSlugsApiFunction, getArtistByIdApiFunction, getArtObjectByIdAndTypeApiFunction } from '@/lib/utils/apiFunctions'
import Image from "next/image";
import React from 'react'
import {Separator} from '@/components/ui/separator'
type Modify<T, R> = Omit<T, keyof R> & R;

type TPaintingData = Modify<
  TPainting[number],
  {
    painting:  {
      drawn_on: string 
  image: string 
  paint_type: string 
  
  }|undefined;
  }
>;

const page =async ({ params }: { params: { slug: string } }) => {
  


const data:TPaintingData =( await getArtObjectByIdAndTypeApiFunction(params.slug,ArtObjectType.PAINTING)).data
const imageUrl:string|null =data.painting && JSON.parse(data.painting.image).length>=1?JSON.parse(data.painting.image)[0]  : null;
const drawnOn :string|null =data.painting && data.painting.drawn_on?data.painting.drawn_on  : null;
const paintType :string|null =data.painting && data.painting.paint_type?data.painting.paint_type  : null;
const artist:TArtist = (await getArtistByIdApiFunction(data.artist_id)).data
// console.log(({artist}))
    // console.log({params})
if (typeof data =='undefined'){
  return <div>loading...</div>
}


  return (
    <div className="w-full flex flex-col items-start mt-10 ">
    <div className="w-[98%] md:w-[95%] lg:w-[80%] mx-auto">
    {

imageUrl&&
        <Image
         className="aspect-video object-cover object-center"
        src={imageUrl}
        alt="painting image"
        width={1200}
        height={800}
        />
      }
      </div>
     <Separator className="mb-5"/>

      <div className="w-[98%] md:w-[95%] lg:w-[92%] mx-auto">
      <h2 className="text-xl md:text-3xl lg:text-5xl">{data.title}</h2>
      
      
      <p className="text-lg md:text-xl lg:text-2xl font-bold">Department: <span className="font-normal">{data.department}</span></p>
      <p className="md:text-lg lg:text-xl font-bold">Description: <span className="font-normal">{data.description}</span></p>
      <p className="md:text-lg font-bold">Dimensions: <span className="font-normal">{data.dimensions}</span></p>
     
     <div className="flex flex-wrap items-center justify-normal gap-x-10">

      <p className="md:text-lg font-bold">Made in: <span className="font-normal">{data.year}</span></p>
      <p className="md:text-lg font-bold">Epoch: <span className="font-normal">{data.epoch}</span></p>
      <p className="md:text-lg font-bold">Country: <span className="font-normal">{data.origin_country}</span></p>
      <p className="font-bold">Drown on: <span className="font-normal">{drawnOn}</span></p>
      <p className="font-bold">Paint type: <span className="font-normal">{paintType}</span></p>
     </div>
     <Separator className="mb-5"/>
     <div className=" ">
      <h3 className="text-xl md:text-2xl lg:text-3xl">Artist Details </h3>
      <p className="text-lg md:text-xl lg:text-2xl font-bold">Name: <span className="font-normal">{artist.name}</span></p>
      <p className="text-lg md:text-xl lg:text-2xl font-bold">Bio: <span className="font-normal">{artist.artist_bio}</span></p>
      <p className="md:text-lg font-bold">Description: <span className="font-normal">{data.description}</span></p>
      <div className="flex flex-wrap items-center justify-normal gap-x-10">

      <p className="font-bold">Gender: <span className="font-normal">{artist.gender}</span></p>
      <p className="font-bold">Country: <span className="font-normal">{artist.origin_country}</span></p>
      <p className="font-bold">Born on: <span className="font-normal">{artist.date_of_birth}</span></p>
      <p className="font-bold">Died on: <span className="font-normal">{artist.date_of_died}</span></p>
      <p className="font-bold">ULAN: <span className="font-normal">{artist.ulan}</span></p>
      <p className="font-bold">Wiki Qid: <span className="font-normal">{artist.wiki_qid}</span></p>

    </div>
            
     </div>
      </div>
      


    </div>
  )
}

export default page





export const generateStaticParams = async () => {
  const res = await getAllArtObjectSlugsApiFunction(ArtObjectType.PAINTING)
  const slugs = res.data;
  // console.log("slugs ",slugs[0]);
  return slugs
};

// export async function generateMetadata({
//   params,
// }: {
//   params: { slug: string };
// }) {
//   // const { meta } = await getDataBySlug(params.slug, projectDirectory); // Fetch post data based on slug

//   // return {
//   //   title: meta.title,
//   //   description: meta.description,
//   //   keywords: meta.categories,
//   // };
// }
