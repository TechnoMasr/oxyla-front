import { configureStore } from "@reduxjs/toolkit";
import settingReducer from "./setting/setting";
import profileReducer from "./profile/profileSlice";
import languageReducer from "./languageSlice/languageSlice";
import modalsReducer from "./modals/modalsSlice";

export const store = configureStore({
  reducer: {
    setting: settingReducer,
    profile: profileReducer,
    language: languageReducer,
    modals: modalsReducer,
  },
});
