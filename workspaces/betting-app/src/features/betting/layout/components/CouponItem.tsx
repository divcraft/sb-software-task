import React, { useMemo } from "react";
import { useGetEventsQuery } from "features/betting";
import { useAppSelector } from "store";
import { selectResolvedCouponItem } from "features/betting";

type Props = {
  gameId: number;
  outcomeId: number;
};

export const CouponItem: React.FC<Props> = ({ gameId, outcomeId }) => {
  const { data: events } = useGetEventsQuery();

  const selectResolved = useMemo(() => selectResolvedCouponItem(), []);

  const item = useAppSelector((s) =>
    // pass events from query as first arg, selector factory expects (events, gameId, outcomeId)
    selectResolved(events ?? [], gameId, outcomeId),
  );

  return (
    <div className="flex items-center justify-between">
      <div className="text-sm truncate">
        {item.eventName} — {item.outcomeName}
      </div>
      <div className="text-sm font-semibold text-indigo-700">
        {item.odds.toFixed(2)}
      </div>
    </div>
  );
};

export default CouponItem;
