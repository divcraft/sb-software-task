import React from "react";
import { useAppSelector } from "store";
import { selectEventNameByOutcomeId, selectOutcomeName } from "features/betting";
import OddsItem from "./OddsItem";

type Props = {
  outcomeId: number;
};

export const CouponItem: React.FC<Props> = ({ outcomeId }) => {
  const eventName = useAppSelector((state) => selectEventNameByOutcomeId(state, outcomeId));
  const outcomeName = useAppSelector((state) => selectOutcomeName(state, outcomeId));

  return (
    <div className="flex items-center justify-between">
      <div className="text-sm truncate">
        {eventName} — {outcomeName}
      </div>
      <OddsItem outcomeId={outcomeId} />
    </div>
  );
};

export default CouponItem;
