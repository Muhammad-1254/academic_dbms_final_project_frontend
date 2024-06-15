import { ArtObjectType, TArtist } from "@/lib/types";
import { TSculptureData as TSculpture } from "@/lib/store/slices/sculptureSlice";
import {
  getAllArtObjectSlugsApiFunction,
  getArtistByIdApiFunction,
  getArtObjectByIdAndTypeApiFunction,
} from "@/lib/utils/apiFunctions";
import Image from "next/image";
import React from "react";
import { Separator } from "@/components/ui/separator";
type Modify<T, R> = Omit<T, keyof R> & R;

type TSculptureData = Modify<
  TSculpture[number],
  {
    sculpture:
      | {
          material: string | null;
          image: string;
          weight: string | null;
          width: string | null;
          height: string | null;
        }
      | undefined;
  }
>;

const page = async ({ params }: { params: { slug: string } }) => {
  const data: TSculptureData = (
    await getArtObjectByIdAndTypeApiFunction(
      params.slug,
      ArtObjectType.SCULPTURE
    )
  ).data;
  const imageUrl: string | null =
    data.sculpture && JSON.parse(data.sculpture.image).length >= 1
      ? JSON.parse(data.sculpture.image)[0]
      : null;
  const material: string | null =
    data.sculpture && data.sculpture.material ? data.sculpture.material : null;
  const height: string | null =
    data.sculpture && data.sculpture.height ? data.sculpture.height : null;
  const width: string | null =
    data.sculpture && data.sculpture.width ? data.sculpture.width : null;
  const weight: string | null =
    data.sculpture && data.sculpture.weight ? data.sculpture.weight : null;

  const artist: TArtist = (await getArtistByIdApiFunction(data.artist_id)).data;
  console.log({ artist });
  console.log({ params });
  if (typeof data == "undefined") {
    return <div>loading...</div>;
  }

  return (
    <div className="w-full flex flex-col items-start mt-10 ">
      <div className="w-[98%] md:w-[95%] lg:w-[80%] mx-auto">
        {imageUrl && (
          <Image
            className="aspect-video object-cover object-center"
            src={imageUrl}
            alt="sculpture image"
            width={1200}
            height={800}
          />
        )}
      </div>
      <Separator className="mb-5" />

      <div className="w-[98%] md:w-[95%] lg:w-[92%] mx-auto">
        <h2 className="text-xl md:text-3xl lg:text-5xl">{data.title}</h2>

        <p className="text-lg md:text-xl lg:text-2xl font-bold">
          Department: <span className="font-normal">{data.department}</span>
        </p>
        <p className="md:text-lg lg:text-xl font-bold">
          Description: <span className="font-normal">{data.description}</span>
        </p>
        <p className="md:text-lg font-bold">
          Dimensions: <span className="font-normal">{data.dimensions}</span>
        </p>

        <div className="flex flex-wrap items-center justify-normal gap-x-10">
          <p className="md:text-lg font-bold">
            Made in: <span className="font-normal">{data.year}</span>
          </p>
          <p className="md:text-lg font-bold">
            Epoch: <span className="font-normal">{data.epoch}</span>
          </p>
          <p className="md:text-lg font-bold">
            Country: <span className="font-normal">{data.origin_country}</span>
          </p>
          <p className="font-bold">
            Material: <span className="font-normal">{material}</span>
          </p>
          <p className="font-bold">
            Height: <span className="font-normal">{height}</span>
          </p>
          <p className="font-bold">
            Width: <span className="font-normal">{width}</span>
          </p>
          <p className="font-bold">
            Weight: <span className="font-normal">{weight}</span>
          </p>
        </div>
        <Separator className="mb-5" />
        <div className=" ">
          <h3 className="text-xl md:text-2xl lg:text-3xl">Artist Details </h3>
          <p className="text-lg md:text-xl lg:text-2xl font-bold">
            Name: <span className="font-normal">{artist.name}</span>
          </p>
          <p className="text-lg md:text-xl lg:text-2xl font-bold">
            Bio: <span className="font-normal">{artist.artist_bio}</span>
          </p>
          <p className="md:text-lg font-bold">
            Description: <span className="font-normal">{data.description}</span>
          </p>
          <div className="flex flex-wrap items-center justify-normal gap-x-10">
            <p className="font-bold">
              Gender: <span className="font-normal">{artist.gender}</span>
            </p>
            <p className="font-bold">
              Country:{" "}
              <span className="font-normal">{artist.origin_country}</span>
            </p>
            <p className="font-bold">
              Born on:{" "}
              <span className="font-normal">{artist.date_of_birth}</span>
            </p>
            <p className="font-bold">
              Died on:{" "}
              <span className="font-normal">{artist.date_of_died}</span>
            </p>
            <p className="font-bold">
              ULAN: <span className="font-normal">{artist.ulan}</span>
            </p>
            <p className="font-bold">
              Wiki Qid: <span className="font-normal">{artist.wiki_qid}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;

export const generateStaticParams = async () => {
  const res = await getAllArtObjectSlugsApiFunction(ArtObjectType.SCULPTURE);
  const slugs = res.data;
  console.log("slugs ", slugs[0]);
  return slugs;
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
