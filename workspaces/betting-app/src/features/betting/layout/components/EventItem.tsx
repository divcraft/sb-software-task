import React from "react";
import { EventType } from "shared/types";
import { GameRow } from "./GameRow";

type Props = {
  event: EventType;
};

export const EventItem: React.FC<Props> = ({ event }) => {
  console.log("EventItem", event.eventName);

  return (
    <div className="mb-4 bg-white rounded-md overflow-hidden">
      <div className="px-4 py-3">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="text-sm text-indigo-800 font-semibold">
            {event.eventName}
          </div>
          {/* <div className="text-xs text-gray-500 mt-1 md:mt-0">
            {new Date(event.eventStart).toLocaleString()}
          </div> */}
        </div>
      </div>
      <div className="px-4">
        {event.eventGames.map((g) => (
          <GameRow key={g.gameId} game={g} />
        ))}
      </div>
    </div>
  );
};
