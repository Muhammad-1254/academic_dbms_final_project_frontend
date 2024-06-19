import { Separator } from '@/components/ui/separator'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import React from 'react'


interface IArtistTable {
  artistData: any[];
  handleOnClick: (id: string, e: any) => void;
}
const ArtistTable:React.FC<IArtistTable> = ({artistData,handleOnClick}) => {
  return (
    <Table>
    <TableCaption>A list of Artist.</TableCaption>
    <TableHeader>
      <TableRow className='cursor-pointer'>
        <TableHead className="">Name</TableHead>
        <TableHead>Bio</TableHead>
        <TableHead>Desc</TableHead>
        <TableHead className="">Gender</TableHead>
        <TableHead className="">DOB</TableHead>
        <TableHead className="">DOD</TableHead>
        <TableHead className="">Country</TableHead>

        <TableHead>ULAN</TableHead>
        <TableHead>WIKI</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {artistData.map(
        (
          {
            artist_bio,
            name,
            date_of_birth,
            date_of_died,
            description,
            gender,
            id,
            origin_country,
            ulan,
            wiki_qid,
          }
          
        ) => (
          <TableRow key={id} onClick={(e)=>handleOnClick(id, e)}>
            <TableCell className="font-medium capitalize">{name}</TableCell>
            <TableCell className="capitalize">{artist_bio}</TableCell>
            <TableCell>{description}</TableCell>
            <TableCell className="capitalize">{gender}</TableCell>

            <TableCell className="">{date_of_birth}</TableCell>
            <TableCell className="">{date_of_died}</TableCell>
            <TableCell className="capitalize">{origin_country}</TableCell>

            <TableCell>{ulan}</TableCell>
            <TableCell>{wiki_qid}</TableCell>
          </TableRow>
        )
      )}
      <Separator />
    </TableBody>
  </Table>
  )
}

export default ArtistTable
