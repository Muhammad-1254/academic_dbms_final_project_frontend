import {  TExhibitionsAssociation } from "@/lib/types";
import {
  getAllExhibitionsIdsApiFunction,
  getExhibitionsArtObjectApiFunction,
  getExhibitionsByIdApiFunction,
} from "@/lib/utils/apiFunctions";
import Image from "next/image";
import React from "react";
import { Separator } from "@/components/ui/separator";

import Component from "./component";

const page = async ({ params }: { params: { slug: string } }) => {
  const res: TExhibitionsAssociation = (
    await getExhibitionsArtObjectApiFunction(params.slug)
  ).data;
  const exhibition = res.exhibition;
  const data = res.art_objects;
  const images: string[] | null =
    exhibition.image && JSON.parse(exhibition.image).length >= 1
      ? JSON.parse(exhibition.image)
      : null;

  
  return (
    <div className="w-full flex flex-col items-center mt-10 ">
      <div className="w-full flex flex-col md:flex-row items-center md:justify-center md:flex-wrap gap-2 mx-auto ">
        {images &&
          images.map((item, _) => {
            return (
              <Image
              placeholder="empty"
                key={_}
                src={item}
                width={700}
                height={480}
                priority={false}
                loading={'lazy'}
                alt="exhibition image"
                className={`${
                  images.length === 1 ? "w-[95%]" : "w-[95%] md:w-[48%]"
                } object-center object-cover rounded aspect-video`}
              />
            );
          })}
      </div>
      <Separator/>
      <div className="w-full flex flex-col items-start mt-10 ">
        <h3 className="text-xl md:text-3xl lg:text-5xl capitalize">Exhibition Name: <span  className="font-normal">{exhibition.name}</span></h3>
        <p className="md:text-lg font-bold capitalize">from: <span className="font-normal">{exhibition.start_date}</span></p>
        <p className="md:text-lg font-bold capitalize">to: <span className="font-normal">{exhibition.end_date}</span></p>
        

      </div>
      <Separator/>
      <div className="w-[98%] md:w-[95%] lg:w-[92%] mx-auto mt-5 ">
        <Component data={data} />
      </div>
    
    </div>
  );
};

export default page;

export const generateStaticParams = async () => {
  const res = await getAllExhibitionsIdsApiFunction();
  const slugs = res.data;
  console.log("slugs ", slugs[0]);
  return slugs;
};

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const exhibition = (await getExhibitionsByIdApiFunction(params.slug)).data;

  return {
    title: exhibition.name,
    description: `exhibition starts from: ${exhibition.start_date}, and end at:${exhibition.end_date}`,
    keywords: ["exhibitions", "art", "object"],
  };
}
