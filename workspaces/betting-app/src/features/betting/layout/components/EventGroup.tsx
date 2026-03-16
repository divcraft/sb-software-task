"use client";
import { useGetEventsQuery } from "features/betting";
import { SportGroup } from "./SportGroup";

export const FeedGroup = () => {
  const { sportIds } = useGetEventsQuery(undefined, {
    selectFromResult: ({ data }) => ({
      sportIds: data?.sportIds ?? [],
    }),
  });
  console.log("FeedGroup", sportIds);
  return (
    <div className="w-full">
      {sportIds.map((sportId) => (
        <SportGroup key={sportId} sportId={sportId} />
      ))}
    </div>
  );
};
