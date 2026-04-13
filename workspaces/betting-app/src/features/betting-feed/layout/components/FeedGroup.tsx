"use client";
import { selectSportIds } from "features/betting-feed";
import { SportGroup } from "./SportGroup";
import { useAppSelector } from "store";
import { shallowEqual } from "react-redux";

export const FeedGroup = () => {
  const sportIds = useAppSelector(selectSportIds, shallowEqual);
  console.log("FeedGroup");
  return (
    <div className="w-full">
      {sportIds.map((sportId) => (
        <SportGroup key={sportId} sportId={sportId} />
      ))}
    </div>
  );
};
