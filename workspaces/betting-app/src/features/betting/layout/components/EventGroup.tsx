"use client";
import { selectSportIds } from "features/betting";
import { SportGroup } from "./SportGroup";
import { useAppSelector } from "store";

export const FeedGroup = () => {
  const sportIds = useAppSelector(selectSportIds);
  console.log("FeedGroup", sportIds);
  return (
    <div className="w-full">
      {sportIds.map((sportId) => (
        <SportGroup key={sportId} sportId={sportId} />
      ))}
    </div>
  );
};
