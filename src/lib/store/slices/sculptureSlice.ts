import { createSlice } from "@reduxjs/toolkit";

export type TSculptureData = {
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
  sculpture: {
    material: string | null;
    image: string;
    weight: string | null;
    width: string | null;
    height: string | null;
  };
}[];

export type TSculptureSlice = {
  sculptureData: TSculptureData;
};
const sculptureSliceInitial: TSculptureSlice = {
  sculptureData: [],
};
export const SculptureSlice = createSlice({
  name: "sculptureSlice",
  initialState: { value: sculptureSliceInitial },
  reducers: {
    setSculptureData: (state, action) => {
      state.value.sculptureData = action.payload;
    },
  },
});

export default SculptureSlice.reducer;
export const { setSculptureData } = SculptureSlice.actions;
