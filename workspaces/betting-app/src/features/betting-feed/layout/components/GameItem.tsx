import { FC } from "react";
import { OutcomeButton } from "./OutcomeButton";
import { selectGameName, selectOutcomesIds } from "features/betting-feed";
import { useAppSelector } from "store";
import { Tile } from "components/shared-ui";

interface PropsType {
  gameId: number;
}

export const GameItem: FC<PropsType> = ({ gameId }) => {
  const outcomesIds = useAppSelector((state) => selectOutcomesIds(state, gameId));
  const gameName = useAppSelector((state) => selectGameName(state, gameId));

  console.log("GameItem", gameName);

  return (
    <div className="flex gap-1 text-sm">
      {outcomesIds.map((outcomeId) => (
        <Tile key={outcomeId}>
          <OutcomeButton key={outcomeId} outcomeId={outcomeId} gameId={gameId} />
        </Tile>
      ))}
      <Tile className="ml-1.5">56+</Tile>
    </div>
  );
};
