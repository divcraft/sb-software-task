import { FC } from "react";
import { GameItem } from "./GameItem";
import { selectEventName, selectGamesIds } from "features/betting";
import { useAppSelector } from "store";

interface PropsType {
  eventId: number;
}

export const EventGroup: FC<PropsType> = ({ eventId }) => {
  const eventName = useAppSelector((state) => selectEventName(state, eventId));
  const gamesIds = useAppSelector((state) => selectGamesIds(state, eventId));

  console.log("EventGroup", eventName);

  return (
    <div className="mb-4 bg-white rounded-md overflow-hidden">
      <div className="px-4 py-3">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="text-sm text-indigo-800 font-semibold">{eventName}</div>
          {/* <div className="text-xs text-gray-500 mt-1 md:mt-0">
            {new Date(event.eventStart).toLocaleString()}
          </div> */}
        </div>
      </div>
      <div className="px-4">
        {gamesIds.map((gameId) => (
          <GameItem key={gameId} gameId={gameId} />
        ))}
      </div>
    </div>
  );
};
