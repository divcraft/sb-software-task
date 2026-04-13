import { FC } from "react";
import { OutcomeButton } from "./OutcomeButton";
import { selectGameName, selectOutcomesIds } from "features/betting-feed";
import { useAppSelector } from "store";

interface PropsType {
  gameId: number;
}

export const GameItem: FC<PropsType> = ({ gameId }) => {
  const outcomesIds = useAppSelector((state) => selectOutcomesIds(state, gameId));
  const gameName = useAppSelector((state) => selectGameName(state, gameId));

  console.log("GameItem", gameName);

  return (
    <div className="py-3 border-b border-gray-100">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 md:gap-0">
        <div className="flex flex-wrap items-center gap-2 mt-2 md:mt-0">
          {outcomesIds.map((outcomeId) => (
            <OutcomeButton key={outcomeId} outcomeId={outcomeId} gameId={gameId} />
          ))}
        </div>
      </div>
    </div>
  );
};
