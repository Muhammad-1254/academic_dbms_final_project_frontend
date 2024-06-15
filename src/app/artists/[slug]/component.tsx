'use client'

import PhotoGallery, { TImageList } from '@/components/elements/PhotoGallery';
import { ArtObjectType, TMixArtObjects } from '@/lib/types';
import React, { useEffect, useState } from 'react'
import { getImageSize } from 'react-image-size';


interface IComponent {
    data: TMixArtObjects;
  }
  const Component: React.FC<IComponent> = ({ data }) => {
    
    const [imageList, setImageList] = useState<TImageList[]>([]);
    useEffect(() => {
      async function sortData() {
        try {
          const tempList = [];
          for (let i = 0; i < data.length; i++) {
            const image = JSON.parse(data[i].image)[0];
            const dimensions = await getImageSize(image);
            tempList.push({
              src: image,
              width: dimensions.width,
              height: dimensions.height,
              link: `/${
                data[i].object_type === ArtObjectType.SCULPTURE
                  ? "sculptures"
                  : data[i].object_type === ArtObjectType.PAINTING
                  ? "paintings"
                  : data[i].object_type === ArtObjectType.OTHER && "other_arts"
              }/${data[i].id}`,
              index: i,
            });
          }
          setImageList([...tempList]);
        } catch (error) {
          console.log({ error });
        }
      }
      sortData();
      
    }, [data]);
    console.log({data})
  console.log({imageList})
  
    return  <PhotoGallery
    imageList={imageList}
    data={null}
  />
  };
  
  export default Component;
  