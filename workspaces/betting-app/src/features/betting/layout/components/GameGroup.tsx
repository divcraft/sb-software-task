import React from "react";
import { GameItem } from "./GameItem";
import { useGetEventsQuery } from "features/betting";

type Props = {
  sportId: number;
  countryId: number;
  eventId: number;
};

export const GameGroup: React.FC<Props> = ({ eventId, sportId, countryId }) => {
  const { gamesIds, eventName } = useGetEventsQuery(undefined, {
    selectFromResult: ({ data }) => {
      const event = Object.values(
        data?.sports[sportId]?.countries[countryId]?.events ?? {},
      ).find((e) => e.eventId === eventId);
      return {
        gamesIds: event?.gamesIds,
        eventName: event?.eventName,
      };
    },
  });
  if (!gamesIds || !eventName) return null;
  console.log("GameGroup", eventName, gamesIds);

  return (
    <div className="mb-4 bg-white rounded-md overflow-hidden">
      <div className="px-4 py-3">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="text-sm text-indigo-800 font-semibold">
            {eventName}
          </div>
          {/* <div className="text-xs text-gray-500 mt-1 md:mt-0">
            {new Date(event.eventStart).toLocaleString()}
          </div> */}
        </div>
      </div>
      <div className="px-4">
        {gamesIds.map((gameId) => (
          <GameItem key={gameId} eventId={eventId} sportId={sportId} countryId={countryId} gameId={gameId} />
        ))}
      </div>
    </div>
  );
};
