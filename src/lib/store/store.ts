import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import mixReducer from "./slices/mixSlice";
import paintingReducer from "./slices/paintingSlice";
import sculptureReducer from "./slices/sculptureSlice";
import otherArtReducer from "./slices/otherArtSlice";


export const store = configureStore({
  reducer: {
    userReducer,
    mixReducer,
    paintingReducer,
    sculptureReducer,
    otherArtReducer,
    
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
