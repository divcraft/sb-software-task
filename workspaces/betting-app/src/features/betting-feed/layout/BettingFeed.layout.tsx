"use client";
import { FC } from "react";
import { useGetBettingFeedQuery } from "features/betting-feed";
import { FeedGroup } from "./components/FeedGroup";

export const BettingFeedLayout: FC = () => {
  const { isLoading, isError } = useGetBettingFeedQuery(undefined, {
    selectFromResult: ({ isLoading, isError }) => ({ isLoading, isError }),
  });

  console.log("BettingFeedLayout", { isLoading, isError });

  if (isLoading) return <div>Loading events...</div>;
  if (isError) return <div>Error loading data</div>;

  return <FeedGroup />;
};
