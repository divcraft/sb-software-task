"use client";
import { FC } from "react";
import { useGetEventsQuery } from "features/betting";
import { FeedGroup } from "./components/FeedGroup";

export const BettingLayout: FC = () => {
  const { isLoading, isError } = useGetEventsQuery(undefined, {
    selectFromResult: ({ isLoading, isError }) => ({ isLoading, isError }),
  });

  console.log("BettingLayout", { isLoading, isError });

  if (isLoading) return <div>Loading events...</div>;
  if (isError) return <div>Error loading data</div>;

  return <FeedGroup />;
};
