"use client";
import React from "react";
import { useGetEventsQuery } from "../api/betting.api";
import BettingView from "./BettingView";
import { useSelector } from "react-redux";
import { selectIsError, selectIsLoading } from "../state/betting.selectors";

export const BettingLayout: React.FC = () => {
  const { isLoading, isError } = useGetEventsQuery(undefined, {
    selectFromResult: ({ isLoading, isError }) => ({ isLoading, isError }),
  });

  // const isLoading = useSelector(selectIsLoading)
  // const isError = useSelector(selectIsError)

  console.log("BettingLayout", isLoading, isError);

  if (isLoading) return <div>Loading events...</div>;
  if (isError) return <div>Error loading data</div>;

  return <BettingView />;
};
