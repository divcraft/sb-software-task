import { FC } from "react";
import { useAppSelector } from "store";
import { selectOutcomeOdds } from "features/betting";

interface PropsType {
  outcomeId: number;
}

export const CouponOdds: FC<PropsType> = ({ outcomeId }) => {
  const outcomeOdds = useAppSelector((state) => selectOutcomeOdds(state, outcomeId));
  return <div className="text-sm font-semibold text-indigo-700">{outcomeOdds}</div>;
};
