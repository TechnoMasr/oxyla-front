import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProfile, logoutUser } from "../../services/authServices";
import { getCartCount } from "../../services/cartServices";

const initialState = {
  profile: null,
  loading: true,
  logOutLoading: false,
  error: null,
  cartCount: 0,
};

export const getProfileAct = createAsyncThunk(
  "profile/getProfileAct",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getProfile();

      return data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to load profile",
      );
    }
  },
);

export const logoutAct = createAsyncThunk(
  "profile/logoutAct",
  async (_, { rejectWithValue }) => {
    try {
      const data = await logoutUser();

      return data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to load profile",
      );
    }
  },
);

export const getCartCountAct = createAsyncThunk(
  "profile/getCartCountAct",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getCartCount();

      return data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to load profile",
      );
    }
  },
);

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    addProfile: (state, action) => {
      state.profile = action.payload;
    },
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
      .addCase(logoutAct.pending, (state) => {
        state.logOutLoading = true;
        state.error = null;
      })
      .addCase(logoutAct.fulfilled, (state) => {
        state.logOutLoading = false;
        state.profile = null;
      })
      .addCase(logoutAct.rejected, (state, action) => {
        state.logOutLoading = false;
        state.error = action.payload;
      })

      // cart count
      .addCase(getCartCountAct.fulfilled, (state, action) => {
        state.cartCount = action.payload;
      });
  },
});

export const { clearProfile, addProfile } = profileSlice.actions;
export default profileSlice.reducer;
