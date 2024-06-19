"use client";
import { Card, } from "@/components/ui/card";
import { TArtist } from "@/lib/types";
import { getAllArtistApiFunction } from "@/lib/utils/apiFunctions";
import  { useEffect, useState, lazy, Suspense } from "react";


  import { Button } from "@/components/ui/button";
  import { Label } from "@/components/ui/label";
  import { Input } from "@/components/ui/input";
  import { Separator } from "@/components/ui/separator";
  import { useRouter } from "next/navigation";
  
const ArtistTable = lazy(()=>import("./ArtistTable"))
const Component = () => {
    const router = useRouter ()
  const [artistData, setArtistData] = useState<TArtist[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(10);
  const [sortDob, setSortDob] = useState(false);
  const [sortName, setSortName] = useState(true);
  const [fetch_, setFetch] = useState(false);
  const [modelPath, setModelPath] = useState({ x: 0, y: 0,id:"", showMode: false });
  useEffect(() => {
    async function getArtists() {
      try {
        setIsLoading(true);
        const data = (
          await getAllArtistApiFunction(sortDob, sortName, skip, limit)
        ).data;
        
        setArtistData([...data]);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log({ error });
      }
    }

    getArtists();
  }, [fetch_, sortName, sortDob]);
  function handleOnClick(id:string, event:any){
    setModelPath({x:event.pageX, y:event.pageY,id:id, showMode:true})
  }
  function openArtistPage(){
router.push(`/artists/${modelPath.id}`)
  }
//   console.log({ artistData });
  return (
    <>
     <Card
        style={{ top: `${modelPath.y}px`, left: `${modelPath.x}px` }}
        className={`${modelPath.showMode ? "flex" : "hidden"}
     absolute  z-[100]
     `}
      >
   
          <div className="flex flex-col-reverse  md:flex-row items-center justify-normal
           gap-y-2 md:gap-x-4 p-2 md:py-4">
            <Button variant={'outline'} onClick={openArtistPage}>GOTO</Button>
            <Button variant={"secondary"} onClick={()=>setModelPath({...modelPath, showMode:false})}>X</Button>
          </div>
        </Card>
        {isLoading?<div>Loading...</div>:
        
    <div className="w-[98%] md:w-[95%] lg:w-[92%] mx-auto mt-14 md:mt-20 ">
     
     
      <div className="flex flex-col md:flex-row items-start gap-y-5 md:gap-y-0 md:items-center  md:justify-between mb-5">
        <h2 className="text-2xl md:text-3xl lg:text-5xl font-semibold ">
          Artists
        </h2>
        <Card
          className=" px-4 py-2 md:p-4  
      flex items-start md:items-center  flex-wrap  gap-x-4 md:gap-x-4
      rounded-xl
      "
        >
          <div className="w-24 flex items-center">
            <Label>From:&nbsp;</Label>
            <Input
              value={skip}
              placeholder={"from"}
              onChange={(e) => {
                const num = parseInt(e.target.value);
                !isNaN(num) && setSkip(num);
                if (e.target.value === "" || num > limit) {
                  setLimit(0);
                }
              }}
            />
          </div>
          <div className="w-20 flex items-center">
            <Label>To:&nbsp;</Label>

            <Input
              value={limit}
              placeholder={"to"}
              onChange={(e) => {
                const num = parseInt(e.target.value);
                !isNaN(num) && setLimit(num);
                if (e.target.value === "" || num < skip) {
                  setLimit(10);
                }
              }}
            />
          </div>
          <Button
            variant={sortDob ? "secondary" : "link"}
            onClick={() => setSortDob(!sortDob)}
          >
            Sort By DOB
          </Button>
          <Button
            variant={sortName ? "secondary" : "link"}
            onClick={() => setSortName(!sortName)}
          >
            Sort By Name
          </Button>

          <Button
            variant={"default"}
            disabled={isLoading}
            onClick={() => setFetch(true)}
          >
            Fetch
          </Button>
        </Card>
      </div>
      <Separator />

     <Suspense fallback={<div>Loading...</div>}>
     <ArtistTable artistData={artistData} handleOnClick={handleOnClick}/>
     </Suspense>
    </div>
}
    </>

  );
};

export default Component;


 