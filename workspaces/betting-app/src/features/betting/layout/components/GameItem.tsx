import React from "react";
import { OutcomeButton } from "./OutcomeButton";
import { selectGameName, selectOutcomesIds } from "features/betting";
import { useSelector } from "react-redux";

type Props = {
  gameId: number;
  sportId: number;
  countryId: number;
  eventId: number;
};

export const GameItem: React.FC<Props> = ({ gameId, sportId, countryId, eventId }) => {
  const outcomesIds = useSelector((state) => selectOutcomesIds(state, sportId, countryId, eventId, gameId));
  const gameName = useSelector((state) => selectGameName(state, sportId, countryId, eventId, gameId));

  if (!outcomesIds || !gameName) return null;
  return (
    <div className="py-3 border-b border-gray-100">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 md:gap-0">
        {/* <div className="text-sm text-gray-700 font-semibold">{gameName}</div> */}
        <div className="flex flex-wrap items-center gap-2 mt-2 md:mt-0">
          {outcomesIds.map((outcomeId) => (
            <OutcomeButton
              key={outcomeId}
              outcomeId={outcomeId}
              gameId={gameId}
              sportId={sportId}
              countryId={countryId}
              eventId={eventId}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
