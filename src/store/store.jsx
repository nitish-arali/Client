import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { encryptTransform } from "redux-persist-transform-encrypt";

import LeftMenuItems from "./features/LeftMenuItemSlice.jsx";
import UserContext from "./features/UserContext.jsx";

const persistConfig = {
  key: "root",
  storage,
  transforms: [
    encryptTransform({
      secretKey: "Nitish_Arali",
      onError: function (error) {
        console.log(error);
      },
    }),
  ],
};

const reducers = combineReducers({
  LeftMenuItems: LeftMenuItems,
  UserContext: UserContext,
});

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);

export { store, persistor };
