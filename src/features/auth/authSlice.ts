import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api";

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
}

const initialState: AuthState = {
  isAuthenticated: !!localStorage.getItem("token"),
  token: localStorage.getItem("token") || null,
};

export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password }: { username: string; password: string }) => {
    const res = await api.login(username, password);
    return res.token;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
