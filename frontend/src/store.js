import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import authReducer from "./features/authSlice";
import postReducer from "./features/postSlice";
import themeReducer from "./features/themeSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  posts: postReducer,
  theme: themeReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: import.meta.env.MODE !== "production",
});

export default store;
