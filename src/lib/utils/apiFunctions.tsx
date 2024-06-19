import axios from "axios";
import Cookie from 'js-cookie'
import { ArtObjectType, Role } from "../types";


function domainName(){
  if (process.env.NODE_ENV === 'development') {
    return "http://localhost:8000"
  }
  return "https://muhammad-1254-dbms-project.hf.space"

}

export function getCookie() {
  try {
    const cookie = Cookie.get("user_credentials");
    if (cookie) {
      const user_credentials = JSON.parse(cookie);
      return user_credentials;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
}



export async function loginUserApiFunction(
  email: string,
  password: string,
  role: string
) {
  const res = await axios.post(`${domainName()}/api/v1/user/login`, {
    email,
    password,
    role,
  });
  // console.log({res})
  
  return res.data;
}

export async function signupUserApiFunction(
  username: string,
  email: string,
  password: string,
  role: string
) {
  const res = await axios.post(`${domainName()}/api/v1/user/signup`, {
    username,
    email,
    password,
    role,
  });
 
  return res.data;
}






export async function getAllExhibitionsApiFunction(
  skip: number=0,
    limit: number=10,
    sortByDate:boolean=true,
    sortByTitle:boolean=true,
) {

  const res = await axios.get(`${domainName()}/api/v1/museum/get/exhibitions/all/${skip}/${limit}?sort_data_asc=${sortByDate}&sort_data_title=${sortByTitle}`);
  return res.data;
}

// get all exhibitions ids
export async function getAllExhibitionsIdsApiFunction(

) {

  const res = await axios.get(`${domainName()}/api/v1/museum/get/exhibitions/all/ids`);
  return res.data;
}


export async function getExhibitionsByIdApiFunction(
  exhibitionId:string
) {

  const res = await axios.get(`${domainName()}/api/v1/museum/get/exhibitions/art_object/${exhibitionId}`);
  return res.data;
}


export async function getExhibitionsArtObjectApiFunction(

    exhibitionId:string

) {

  const res = await axios.get(`${domainName()}/api/v1/museum/get/exhibitions/art_object/${exhibitionId}`);
  return res.data;
}



export async function getAllArtistApiFunction(
  sort_by_dob: boolean = false,
  sort_by_name: boolean= true,
  skip: number = 0,
  limit: number = 10,
) {

  const res = await axios.get(`${domainName()}/api/v1/museum/get/artist/all/${skip}/${limit}?sort_by_dob=${sort_by_dob}&sort_by_name=${sort_by_name}`);
  
  return res.data;
  }

  
// get all exhibitions ids
export async function getAllArtistsIdsApiFunction(

) {

  const res = await axios.get(`${domainName()}/api/v1/museum/get/exhibitions/all/ids`);
  return res.data;
}

export async function getArtistByIdApiFunction(
  id:string
  ) {
    const res = await axios.get(`${domainName()}/api/v1/museum/get/artist/id/${id}`);
    
    return res.data;
    }


    
export async function getArtistsIdApiFunction(
  ) {

    const res = await axios.get(`${domainName()}/api/v1/museum/get/artist/all/ids`);
    
    return res.data;
    }


    
export async function getArtistArtObjectByIdApiFunction(
  id:string
  ) {


    const res = await axios.get(`${domainName()}/api/v1/museum/get/art_object/artist/all/${id}`);
    
    return res.data;
    }



      
  export async function getAllSculptureApiFunction(
    skip: number=0,
    limit: number=10,
    sortByDate:boolean=true,
    sortByTitle:boolean=true,
  ) {
    const res = await axios.get(`${domainName()}/api/v1/museum/get/art_object/sculpture/all/${skip}/${limit}?sort_data_asc=${sortByDate}&sort_data_title=${sortByTitle}`);
    return res.data;
  }

  export async function getAllPaintingApiFunction(
    skip: number=0,
    limit: number=10,
    sortByDate:boolean=true,
    sortByTitle:boolean=true,
  )
   {

    const res = await axios.get(`${domainName()}/api/v1/museum/get/art_object/painting/all/${skip}/${limit}?sort_data_asc=${sortByDate}&sort_data_title=${sortByTitle}`);
    return res.data;
  }

  export async function getAllOtherArtApiFunction(
    skip: number=0,
    limit: number=10,
    sortByDate:boolean=true,
    sortByTitle:boolean=true,
  ) {
    const res = await axios.get(`${domainName()}/api/v1/museum/get/art_object/other_art/all/${skip}/${limit}?sort_data_asc=${sortByDate}&sort_data_title=${sortByTitle}`);
    return res.data;
  }



// getting all paths of art objects
export async function getAllArtObjectSlugsApiFunction(
  artObjectType:ArtObjectType
) {

  const res = await axios.get(`${domainName()}/api/v1/museum/get/art_object/id/all?object_type=${artObjectType}`);
  return res.data;
}



// searching painting by name
export async function searchArtObjectByNameApiFunction(
  name: string,
  artObjectType:ArtObjectType
) {

  const res = await axios.get(`${domainName()}/api/v1/museum/get/paintings/name/?painting_name=${name}&art_object_type=${artObjectType}`);
  return res.data;
}



// get art object painting by id
export async function getArtObjectByIdAndTypeApiFunction(
  id: string,
  object_type:ArtObjectType
) {
  
  const res = await axios.get(`${domainName()}/api/v1/museum/get/art_object/?object_type=${object_type}&art_object_id=${id}`);
  return res.data;
}




export async function getHomePageDataApiFunction(

) {
  
  const res = await axios.get(`${domainName()}/api/v1/museum/get/homepage/data`);
  return res.data;
}




