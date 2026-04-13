import { FC } from "react";
import { useAppSelector } from "store";
import { selectEventNameByOutcomeId, selectOutcomeName } from "features/betting-feed";
import { BetslipOdds } from "./BetslipOdds";

interface PropsType {
  outcomeId: number;
}

export const BetslipItem: FC<PropsType> = ({ outcomeId }) => {
  const eventName = useAppSelector((state) => selectEventNameByOutcomeId(state, outcomeId));
  const outcomeName = useAppSelector((state) => selectOutcomeName(state, outcomeId));

  return (
    <div className="flex justify-between py-1">
      <div className="text-sm truncate">
        <div className='font-semibold'>
          {eventName}
        </div>
        <div>
          Wynik: {outcomeName}
        </div>
      </div>
      <BetslipOdds outcomeId={outcomeId} />
    </div>
  );
};
