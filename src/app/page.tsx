import HomePage from "@/components/HomePage";
import { getHomePageDataApiFunction } from "@/lib/utils/apiFunctions";

export const revalidate = 3600 *24 
const Home =async () => {

  const data = (await getHomePageDataApiFunction()).data
console.log(data.exhibition_data)
  return (
    <>
    <HomePage exhibitionsData={data.exhibition_data} paintingData={data.painting_data} sculptureData={data.sculpture_data} otherArtData={data.other_data} />
    </>
  );
};

export default Home;
