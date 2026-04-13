import { FC } from "react";
import { BetslipItem } from "./BetslipItem";
import { useAppSelector } from "store";
import { selectCouponOutcomesIds } from "features/betslip";
import { shallowEqual } from "react-redux";

export const BetslipList: FC = () => {
  const couponOutcomesIds = useAppSelector(selectCouponOutcomesIds, shallowEqual);
  console.debug("CouponList");

  return (
    <div className="space-y-3">
      {couponOutcomesIds.map((outcomeId) => (
        <BetslipItem key={outcomeId} outcomeId={outcomeId} />
      ))}
    </div>
  );
};
