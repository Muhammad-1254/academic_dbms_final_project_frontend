"use client";
import SearchInput from "@/components/elements/SearchInput";
import Exhibitions from "@/components/Exhibitions";
import Painting from "@/components/Painting";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getAllExhibitionsApiFunction } from "@/lib/utils/apiFunctions";
import { useEffect } from "react";
import { useState } from "react";

const Component = () => {
  const [data, setData] = useState([]);
  const [sortByDate, setSortByDate] = useState(true);
  const [sortByTitle, setSortByTitle] = useState(false);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(10);
  const [fetch_, setFetch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        const res = await getAllExhibitionsApiFunction(
          skip,
          limit,
          sortByDate,
          sortByTitle
        );
        setData(res.data);
        setIsLoading(false);
        setFetch(false);
      } catch (error) {
        setIsLoading(false);
        setFetch(false);
        setIsError(true);
        console.log({ error });
      }
    }
    getData();
  }, [fetch_]);
  return (
    <div>
      {/* <div>
        <SearchInput artObjectType={ArtObjectType.PAINTING}/>
      </div> */}
      <div className=" relative pt-16 md:pt-0">
        <Card
          className=" px-4 py-2 md:p-4 absolute right-[2%] md:right-[4%] top-2 md:-top-2 
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
            variant={sortByDate ? "secondary" : "link"}
            onClick={() => setSortByDate(!sortByDate)}
          >
            Sort By Date
          </Button>
          <Button
            variant={sortByTitle ? "secondary" : "link"}
            onClick={() => setSortByTitle(!sortByTitle)}
          >
            Sort By Title
          </Button>

          <Button
            variant={"default"}
            disabled={fetch_}
            onClick={() => setFetch(true)}
          >
            Fetch
          </Button>
        </Card>
        <div>
          {isError ? (
            <div>Something went wrong. Kindly reload the page</div>
          ) : (
            <Exhibitions exhibitionsData={data}/>         
          )}
        </div>
      </div>
    </div>
  );
};

export default Component;
