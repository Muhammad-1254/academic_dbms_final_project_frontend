import { createSlice } from "@reduxjs/toolkit";


export type TPaintingData=
    {

id: string;
artist_id: string;
title: string;
department: string | null;
description: string | null;
dimensions: string | null;
epoch: string | null;
object_type: string;
origin_country: string | null;
style: string | null;
year: string | null;
painting: {
    drawn_on: string 
image: string 
paint_type: string 

}
}[]


export type paintingSlice = {
    paintingData:TPaintingData
}
const paintingSliceInitial: paintingSlice = {
   paintingData:[]



}
export const PaintingSlice = createSlice({
  name: "paintingSlice",
  initialState: { value: paintingSliceInitial},
  reducers: {
    setPaintingData:(state,action)=>{
       state.value.paintingData = action.payload;
    }
   
  },
});

export default PaintingSlice.reducer;
export const { setPaintingData} = PaintingSlice.actions;
