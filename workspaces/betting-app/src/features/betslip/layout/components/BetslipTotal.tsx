import { FC } from "react";
import { useAppSelector } from "store";
import { selectBetslipTotal } from "features/betslip";

export const BetslipTotal: FC = () => {
  const betslipTotal = useAppSelector(selectBetslipTotal);
  return <div className="font-semibold text-indigo-700">{betslipTotal}</div>;
};
