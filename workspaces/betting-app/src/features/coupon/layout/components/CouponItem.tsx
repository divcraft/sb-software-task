import React from "react";
import { useAppSelector } from "store";
import { selectEventNameByOutcomeId, selectOutcomeName } from "features/betting";
import { CouponOdds } from "features/coupon/layout/components/CouponOdds";

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
      <CouponOdds outcomeId={outcomeId} />
    </div>
  );
};

export default CouponItem;
