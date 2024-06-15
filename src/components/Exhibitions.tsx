"use client";

import { Card } from "./ui/card";
import { Separator } from "./ui/separator";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { TExhibitions } from "@/lib/types";

interface IExhibitions {
  exhibitionsData: TExhibitions[];
}

const Exhibitions: React.FC<IExhibitions> = ({ exhibitionsData }) => {
  const [loading, setLoading] = useState(false);

  if (loading)
    return (
      <div className="w-full h-full flex items-center justify-center ">
        Loading...
      </div>
    );
  return (
    <section className="  w-full">
      <div className="w-[95%] md:w-[92%] mx-auto ">
        <h1 className="text-2xl md:text-3xl lg:text-5xl font-semibold pb-4 pt-2">
          Exhibitions
        </h1>
        <div className="flex items-center justify-center flex-wrap gap-x-4 gap-y-6  ">
          {exhibitionsData.map(
            ({ id, name, image, start_date, end_date }, _) => {
              const images = JSON.parse(image);
              return (
                <Link href={`/exhibitions/${id}`} key={_}>
                  <Card className="w-[330px] lg:w-[450px] h-[550px] md:h-[550px] rounded-3xl overflow-hidden">
                    <div className="flex flex-wrap gap-0.5 w-full overflow-hidden h-[85%] mx-auto">
                      {images.map((img: string, __: number) => (
                      
                          <Image
                          key={__}
                          src={img}
                          alt="image"
                          width={400}
                          height={280}
                          className={`${images.length===1?"w-full":"w-[49%]"} object-cover object-center `}
                          />
                      ))}
                    </div>
                    <Separator/>
                    <div className="h-[15%] flex flex-col items-start justify-normal ">
                      <h3 className="w-full text-xl lg:text-2xl  capitalize text-center  pt-1.5  ">{name}</h3>
                      <Separator/>

                      <p className="w-full h-full flex items-center justify-center">
                        {start_date} - {end_date}
                      </p>
                    </div>
                  </Card>
                </Link>
              );
            }
          )}
        </div>
      </div>
    </section>
  );
};

export default Exhibitions;
