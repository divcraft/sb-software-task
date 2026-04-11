import { FC } from "react";
import { useAppSelector } from "store";
import { selectEventNameByOutcomeId, selectOutcomeName } from "features/betting";
import { CouponOdds } from "./CouponOdds";

interface PropsType {
  outcomeId: number;
}

export const CouponItem: FC<PropsType> = ({ outcomeId }) => {
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
