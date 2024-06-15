import { createSlice } from "@reduxjs/toolkit";

export type TOtherArtData = {
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
  other: {
    type:string,
    image:string
  };
}[];

export type otherArtSlice = {
  otherArtData: TOtherArtData;
};
const otherArtSliceInitial: otherArtSlice = {
    otherArtData: [],
};
export const OtherArtSlice = createSlice({
  name: "OtherArtSlice",
  initialState: { value: otherArtSliceInitial },
  reducers: {
    setOtherArtData: (state, action) => {
      state.value.otherArtData = action.payload;
    },
  },
});

export default OtherArtSlice.reducer;
export const { setOtherArtData} = OtherArtSlice.actions;
