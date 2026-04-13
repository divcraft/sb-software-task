import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, useStore } from "react-redux";
import { betslipReducer } from "features/betslip";
import { bettingFeedApi } from "features/betting-feed";

export const makeStore = () => {
  return configureStore({
    reducer: {
      betslip: betslipReducer,
      [bettingFeedApi.reducerPath]: bettingFeedApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(bettingFeedApi.middleware),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore["dispatch"];
export type RootState = ReturnType<AppStore["getState"]>;

export const useAppStore = useStore.withTypes<AppStore>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
