"use client";
import React from "react";
import { useGetEventsQuery } from "features/betting";
import BettingView from "./BettingView";

export const BettingLayout: React.FC = () => {
  const { isLoading, isError } = useGetEventsQuery(undefined, {
    selectFromResult: ({ isLoading, isError }) => ({ isLoading, isError }),
  });

  console.log("BettingLayout", isLoading, isError);

  if (isLoading) return <div>Loading events...</div>;
  if (isError) return <div>Error loading data</div>;

  return <BettingView />;
};
