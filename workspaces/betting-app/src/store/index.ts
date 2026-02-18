import { configureStore } from "@reduxjs/toolkit";
import { bettingReducer } from "features/betting";
import { useDispatch, useSelector, useStore } from "react-redux";

export const makeStore = () => {
  return configureStore({
    reducer: { betting: bettingReducer },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
type AppDispatch = AppStore["dispatch"];
type RootState = ReturnType<AppStore["getState"]>;

export const useAppStore = useStore.withTypes<AppStore>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
