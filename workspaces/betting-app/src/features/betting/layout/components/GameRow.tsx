import React from "react";
import { GameType } from "shared/types";
import { OutcomeButton } from "./OutcomeButton";

type Props = {
  game: GameType;
};

export const GameRow: React.FC<Props> = ({ game }) => {
  return (
    <div className="py-3 border-b border-gray-100">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 md:gap-0">
        <div className="text-sm text-gray-700 font-semibold">
          {game.gameName}
        </div>
        <div className="flex flex-wrap items-center gap-2 mt-2 md:mt-0">
          {game.outcomes.map((o) => (
            <OutcomeButton key={o.outcomeId} outcome={o} />
          ))}
        </div>
      </div>
    </div>
  );
};
