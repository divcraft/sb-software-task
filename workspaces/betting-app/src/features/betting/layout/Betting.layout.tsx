"use client";
import React from "react";
import { useGetEventsQuery } from "../api/betting.api";
import BettingView from "./BettingView";

export const BettingLayout: React.FC = () => {
  const { isLoading, isError } = useGetEventsQuery();

  if (isLoading) return <div>Loading events...</div>;
  if (isError) return <div>Error loading data</div>;

  return <BettingView />;
};
