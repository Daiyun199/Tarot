// interface User {
//     username:string,
//     password:string,
// }

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../model/User";
// import { User } from "../../model/user";
interface UserState {
    user: User | null;
    loginTime: number | null;
  }
  const savedData = localStorage.getItem("userData");
  const initialState: UserState = savedData
  ? JSON.parse(savedData)
  : { user: null, loginTime: null };
// default value

export const userSlice = createSlice({
    name:"user",
    initialState:initialState,
    reducers:{
        login: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
            localStorage.setItem("userData", JSON.stringify(action.payload));
            state.loginTime = Date.now(); 
          },
        logout: (state) => {
            state.user = null;
            state.loginTime = null;
            // Xóa khỏi localStorage
            localStorage.removeItem("userData");
          },
          updateLoginTime: (state, action: PayloadAction<number>) => {
            state.loginTime = action.payload;
            localStorage.setItem("userData", JSON.stringify(state));
          },
    },
});

export const{login,logout, updateLoginTime} = userSlice.actions;
export default userSlice.reducer;