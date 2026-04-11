"use client";
import { selectSportIds } from "features/betting";
import { SportGroup } from "./SportGroup";
import { useSelector } from "react-redux";

export const FeedGroup = () => {
  const sportIds = useSelector(selectSportIds);
  console.log("FeedGroup", sportIds);
  return (
    <div className="w-full">
      {sportIds.map((sportId) => (
        <SportGroup key={sportId} sportId={sportId} />
      ))}
    </div>
  );
};
