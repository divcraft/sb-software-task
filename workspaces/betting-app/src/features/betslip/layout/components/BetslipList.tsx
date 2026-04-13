import { FC } from "react";
import { BetslipItem } from "./BetslipItem";
import { useAppSelector } from "store";
import { selectBetslipOutcomesIds } from "features/betslip";
import { shallowEqual } from "react-redux";

export const BetslipList: FC = () => {
  const betslipOutcomesIds = useAppSelector(selectBetslipOutcomesIds, shallowEqual);
  console.debug("BetslipList");

  return (
    <div className="space-y-3">
      {betslipOutcomesIds.map((outcomeId) => (
        <BetslipItem key={outcomeId} outcomeId={outcomeId} />
      ))}
    </div>
  );
};
