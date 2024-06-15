
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { useAppSelector } from "@/lib/store/hooks";

export function CarouselSpacing() {
  const data = useAppSelector(
    (state) => state.paintingReducer.value.paintingData
  );
  if (data.length == 0) {
    return <div>Loading...</div>;
  }

  
  return (
    <Carousel className="w-full  relative ">
      <CarouselContent className="-ml-1">
        {data?.map((item, _) => {
          if (
            item.painting &&
            item.painting.image &&
            JSON.parse(item.painting.image).length >= 1
          ) {
            const image = JSON.parse(item.painting.image);
            return (
              <CarouselItem
                key={_}
                className="pl-1    pt-10 pb-5"
              >
                <div className="p-1">
                  <Card className=" border border-red-500">
                    <CardContent className="flex flex-col items-center justify-center overflow-hidden">
                        <Image
                          className="w-full  border border-yellow-500 object-cover object-center"
                          src={image[0]}
                          alt="img.jpg"
                          width={300}
                          height={280}
                        />
                      
                      <span className="text-2xl font-semibold">
                        {item.title}
                      </span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            );
          }
        })}
      </CarouselContent>
      <div className="hidden md:flex absolute right-5 lg:right-10 top-0">
        <CarouselPrevious className="" />
        <CarouselNext className="" />
      </div>
    </Carousel>
  );
}




