import { FC } from "react";
import { GameItem } from "./GameItem";
import { selectEventDayStart, selectEventTeams, selectEventTimeStart, selectGamesIds } from "features/betting-feed";
import { useAppSelector } from "store";
import { shallowEqual } from "react-redux";

interface PropsType {
  eventId: number;
}

export const EventGroup: FC<PropsType> = ({ eventId }) => {
  const eventTeams = useAppSelector((state) => selectEventTeams(state, eventId), shallowEqual);
  const eventDayStart = useAppSelector((state) => selectEventDayStart(state, eventId));
  const eventTimeStart = useAppSelector((state) => selectEventTimeStart(state, eventId));
  const gamesIds = useAppSelector((state) => selectGamesIds(state, eventId));

  console.log("EventGroup", eventTeams);

  return (
    <div className="px-2 py-3 bg-white rounded-md overflow-hidden flex justify-between gap-4 text-sm text-nowrap">
      <div className="flex gap-3 items-center shrink-0">
        <div className="flex flex-col text-xs text-gray-500">
          <div>{eventTimeStart}</div>
          <div>{eventDayStart}</div>
        </div>
        <div className="text-indigo-800 font-semibold">
          {eventTeams.map((team) => (
            <div key={team}>{team}</div>
          ))}
        </div>
      </div>
      <div>
        {gamesIds.map((gameId) => (
          <GameItem key={gameId} gameId={gameId} />
        ))}
      </div>
    </div>
  );
};
