import HomePage from "@/components/HomePage";
import { getAllExhibitionsApiFunction, getAllOtherArtApiFunction, getAllPaintingApiFunction, getAllSculptureApiFunction, getExhibitionsArtObjectApiFunction } from "@/lib/utils/apiFunctions";


const Home =async () => {

  const paintingRes = await getAllPaintingApiFunction(0, 10,true, false);
  const sculptureRes = await getAllSculptureApiFunction(0, 10);
  const otherArtRes = await getAllOtherArtApiFunction(0, 10);
  const exhibitionsData = await getAllExhibitionsApiFunction(0,10, true, true);
  console.log({exhibitionsData})
  return (
    <>
    <HomePage exhibitionsData={exhibitionsData.data} paintingData={paintingRes.data} sculptureData={sculptureRes.data} otherArtData={otherArtRes.data} />
    </>
  );
};

export default Home;
