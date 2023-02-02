import { configureStore } from "@reduxjs/toolkit";
import goodsReducer from "./modules/medicalfactory";
import reduxLogger from "redux-logger";
import userInfoReducer from "./modules/user";
export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(reduxLogger),
  reducer: {
    medicalgoods: goodsReducer,
    userInfo: userInfoReducer,
  },
});
