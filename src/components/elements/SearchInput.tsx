"use client";
import _ from "lodash";
import  {  useState } from "react";
import { Input } from "../ui/input";
import { useCallback } from "react";
import { searchArtObjectByNameApiFunction,  } from "@/lib/utils/apiFunctions";
import Loading from "./Loading";
import { TPaintingData as TPainting } from "@/lib/store/slices/paintingSlice";
import { Separator } from "../ui/separator";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArtObjectType } from "@/lib/types";

type Modify<T, R> = Omit<T, keyof R> & R;

type TPaintingData = Modify<
  TPainting[number],
  {
    painting: undefined;
  }
>[];

interface ISearchInput{
  artObjectType:ArtObjectType
}

const SearchInput:React.FC<ISearchInput> = ({artObjectType}) => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<TPaintingData>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter()
  async function searchData(q: string) {
    try {
      setLoading(true);
      const res = await searchArtObjectByNameApiFunction(q, artObjectType);
      console.log(res.data);
      setResult(res.data);
      setLoading(false);
    } catch (error: any) {
      console.log({ error });
      setLoading(false);
    }
  }
  const functionDebounce = useCallback(
    _.debounce(async (q: string) => await searchData(q), 300),
    []
  );
  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const q = event.target.value;
    setQuery(q);
    if (q.length > 3) {
      setLoading(true);
      functionDebounce(q);
    }
    if (q.length == 0) {
      setLoading(false);
    }
  };
  return (
    <div className="w-[98%] md:w-[95%] lg:w-[92%] mx-auto">
      <div className="w-full relative">
        <Input
          type="text"
          value={query}
          onChange={onChangeHandler}
          placeholder="Search..."
        />
        <div className="w-20 h-10 flex items-center justify-center text-2xl absolute right-0 top-0">
          <Loading className={loading ? "flex" : "hidden"} />
        </div>
      </div>

      <div className="border border-t-0 rounded-b-md ">
        {result?.map((item, _) => (
          <Link
          href={`/paintings/${item.id}`}
          key={_}
          
          >
            <div
              className="w-full h-10 flex  items-center justify-between px-2  gap-x-3
              overflow-ellipsis overflow-hidden whitespace-nowrap"
            >
              <h3 className="text-sm md:text-lg">{item.title}</h3>
              <div className="h-[80%] border " />
              <div className="flex items-center gap-x-4">
                <p className="font-semibold">
                  Department:{" "}
                  <span className="font-normal">{item.department}</span>
                </p>
                <p className="font-semibold">
                  Description:{" "}
                  <span className="font-normal overflow-ellipsis overflow-hidden whitespace-nowrap">
                    {item.description}
                  </span>
                </p>
                <p className="font-semibold">
                  Made in: <span className="font-normal">{item.year}</span>
                </p>
              </div>
            </div>
            <Separator />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SearchInput;
