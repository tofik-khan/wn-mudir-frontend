import { Admin } from "@/types/admin";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AdminSliceType = {
  currentUser: Admin | undefined;
};

const initialState: AdminSliceType = {
  currentUser: undefined,
};

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<Admin>) => {
      state.currentUser = action.payload;
    },
  },
});

export const { setCurrentUser } = adminSlice.actions;

export default adminSlice.reducer;
