'use client'
import { getAllArtistApiFunction } from '@/lib/utils/apiFunctions';
import React, { useEffect } from 'react'

const Artist = () => {
    
  useEffect(() => {
    async function getData() {
      try {
        const res = await getAllArtistApiFunction();
        const data =res.data
        // console.log({ data });
      } catch (error) {
        console.log({error})

      }
    }
    getData();
  }, []);
  return <div></div>;
};


export default Artist


