import { TArtistArtObjects } from "@/lib/types";
import {
  getArtistArtObjectByIdApiFunction,
  getArtistByIdApiFunction,
  getArtistsIdApiFunction,
} from "@/lib/utils/apiFunctions";
import React from "react";
import Component from "./component";
import { Separator } from "@/components/ui/separator";

const page = async ({ params }: { params: { slug: string } }) => {
  console.log({ params });

  const res: TArtistArtObjects = await getArtistArtObjectByIdApiFunction(
    params.slug
  );
  const artist = res.artist;
  const artObjects = res.art_objects;
  console.log("artObjects ");
  return (
    <div className="w-full flex flex-col items-center mt-10 ">
      <Separator />
      <div className="w-full flex flex-col items-start mt-10 ">
        <h3 className="text-xl md:text-3xl lg:text-5xl capitalize">
          Artist Name: <span className="font-normal">{artist.name}</span>
        </h3>
        <p className="md:text-lg font-bold capitalize">
          Artist Bio: <span className="font-normal">{artist.artist_bio}</span>
        </p>
        <p className="md:text-lg font-bold capitalize">
          Gender: <span className="font-normal">{artist.gender}</span>
        </p>
        <p className="md:text-lg font-bold capitalize">
          Description: <span className="font-normal">{artist.description}</span>
        </p>
        <p className="md:text-lg font-bold capitalize">
          Date of Birth:{" "}
          <span className="font-normal">{artist.date_of_birth}</span>
        </p>
        <p className="md:text-lg font-bold capitalize">
          Date of Died:{" "}
          <span className="font-normal">{artist.date_of_died}</span>
        </p>
        <p className="md:text-lg font-bold capitalize">
          Country: <span className="font-normal">{artist.origin_country}</span>
        </p>
        <p className="md:text-lg font-bold capitalize">
          ULAN: <span className="font-normal">{artist.ulan}</span>
        </p>
        <p className="md:text-lg font-bold capitalize">
          Wiki QID: <span className="font-normal">{artist.wiki_qid}</span>
        </p>
      </div>
      <Separator />
      <div className="w-[98%] md:w-[95%] lg:w-[92%] mx-auto mt-5 ">
        <Component data={artObjects} />
      </div>
    </div>
  );
};

export default page;

export const generateStaticParams = async () => {
  const res = await getArtistsIdApiFunction();
  const slugs = res.data;
  console.log("slugs ", slugs[0]);
  return slugs;
};

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const artist = await getArtistByIdApiFunction(params.slug);

  return {
    title: artist.name,
    description: artist.bio,
    keywords: [artist.wiki_qid, artist.ulan],
  };
}
