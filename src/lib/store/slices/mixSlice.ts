import { createSlice } from "@reduxjs/toolkit";
import {Role} from '@/lib/types'
type mixSlice = {
  showLoginDialog: boolean;
};

const mixSliceInitial: mixSlice = {
  showLoginDialog: false,
};

export const mixSlice = createSlice({
  name: "mixSlice",
  initialState: { value: mixSliceInitial},
  reducers: {
    
    setShowLoginDialog: (state, action) => {
      state.value.showLoginDialog = action.payload;
    },
  },
});

export default mixSlice.reducer;
export const { setShowLoginDialog} = mixSlice.actions;
