export enum Role {
  ADMIN = "admin",
  MANAGER = "manager",
  USER = "user",
}
export enum Type {
  LOGIN = "login",
  SIGNUP = "signup",
}

export enum ArtObjectType {
  PAINTING = "painting",
  SCULPTURE = "sculpture",
  OTHER = "other",
}

export type TArtist = {
  id: string;
  name: string;
  artist_bio: string;
  description: string | null;
  gender: string;
  origin_country: string | null;
  date_of_birth: string;
  date_of_died: string | null;
  wiki_qid: string | null;
  ulan: string | null;
};

export type TExhibitions = {
    id: string;
    end_date: string;
    image: string;
    name: string;
    start_date: string;
  
};

export type TExhibitionsAssociation = {
  exhibition:TExhibitions,
  art_objects:TMixArtObjects
};

export type TMixArtObjects = {
  id: string;
  object_type:ArtObjectType
  image:string
  
}[];
