import { createSlice } from "@reduxjs/toolkit";
import {Role} from '@/lib/types'
type userSlice = {
  userId: string | null;
  email: string | null;
  username: string | null;
  isAuth: Boolean;
  isLogin: Boolean;
  role:Role;
  profileImage:string
};

const userSliceInitial: userSlice = {
  userId: null,
  email: null,
  username: null,
  isAuth: false,
  isLogin: false,
  role:Role.USER,
  profileImage:"https://github.com/shadcn.png"
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState: { value: userSliceInitial },
  reducers: {
    setUser: (state, action) => {
      state.value.userId = action.payload.userId;
      state.value.email = action.payload.email;
      state.value.username = action.payload.username;
      state.value.isLogin = action.payload.isLogin;
      


    },
    setIsAuth: (state, action) => {
      state.value.isAuth = action.payload;
    },
    setIsLogin: (state, action) => {
      state.value.isLogin = action.payload;
    },
    setProfileImage: (state, action) => {
      state.value.profileImage = action.payload;
    }
  },
});

export default userSlice.reducer;
export const { setIsAuth, setUser, setIsLogin, setProfileImage } = userSlice.actions;
