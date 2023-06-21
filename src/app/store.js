import { configureStore } from "@reduxjs/toolkit";
import innetaryReducer from "../feature/innetarySlice";
import userReducer from "../feature/userSlice";

const rootReducer = {
  innetary: innetaryReducer,
  user: userReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
