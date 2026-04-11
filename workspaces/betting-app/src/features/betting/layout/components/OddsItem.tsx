import React from "react";
import { useAppSelector } from "store";
import { selectOutcomeOdds } from "features/betting";

type Props = {
  outcomeId: number;
};

export const OddsItem: React.FC<Props> = ({ outcomeId }) => {
  const outcomeOdds = useAppSelector((state) => selectOutcomeOdds(state, outcomeId));

  return <div className="text-sm font-semibold text-indigo-700">{outcomeOdds}</div>;
};

export default OddsItem;
