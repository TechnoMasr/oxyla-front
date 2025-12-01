import { configureStore } from "@reduxjs/toolkit";
import settingReducer from "./setting/setting";
import profileReducer from "./profile/profileSlice";
import languageReducer from "./languageSlice/languageSlice";

export const store = configureStore({
  reducer: {
    setting: settingReducer,
    profile: profileReducer,
    language: languageReducer,
  },
});
