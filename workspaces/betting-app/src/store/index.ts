import { configureStore, Middleware } from "@reduxjs/toolkit";
import { useDispatch, useSelector, useStore } from "react-redux";
import { bettingReducer, bettingApi } from "features/betting";

export const makeStore = () => {
  return configureStore({
    reducer: {
      betting: bettingReducer,
      [bettingApi.reducerPath]: bettingApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(bettingApi.middleware),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore["dispatch"];
export type RootState = ReturnType<AppStore["getState"]>;

export const useAppStore = useStore.withTypes<AppStore>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
