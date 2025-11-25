import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProfile, logoutUser } from "../../services/authServices";

const initialState = {
  profile: null,
  loading: false,
  error: null,
};

export const getProfileAct = createAsyncThunk(
  "profile/getProfileAct",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getProfile();

      return data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to load profile"
      );
    }
  }
);

export const logoutAct = createAsyncThunk(
  "profile/logoutAct",
  async (_, { rejectWithValue }) => {
    try {
      const data = await logoutUser();

      return data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to load profile"
      );
    }
  }
);


const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    clearProfile: (state) => {
      state.profile = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProfileAct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProfileAct.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(getProfileAct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "فشل في جلب البيانات";
      })

      // log out
      .addCase(logoutAct.fulfilled, (state) => {
        state.loading = false;
        state.profile = null;
      });
  },
});

export const { clearProfile } = profileSlice.actions;
export default profileSlice.reducer;
