"use client";
import React from "react";
import { useGetEventsQuery } from "../api/betting.api";
import BettingView from "./BettingView";
import { selectIsError, selectIsLoading } from "../state/betting.selectors";
import { useAppSelector } from "store";

export const BettingLayout: React.FC = () => {
  const { isLoading, isError } = useGetEventsQuery(undefined, {
    selectFromResult: ({ isLoading, isError }) => ({ isLoading, isError }),
  });

  // const isLoading = useAppSelector(selectIsLoading)
  //   const isError = useAppSelector(selectIsError)

  console.log("BettingLayout", isLoading, isError);

  if (isLoading) return <div>Loading events...</div>;
  if (isError) return <div>Error loading data</div>;

  return <BettingView />;
};
