import React from "react";
import { CouponItem } from "./CouponItem";
import { useAppSelector } from "store";
import { selectCouponOutcomesIds, selectCouponTotal } from "features/betting";

export const CouponList: React.FC = () => {
  const coupon = useAppSelector((state) => state.betting.coupon);
  //   const couponOutcomesIds = useAppSelector(selectCouponOutcomesIds);
  console.debug("CouponList", coupon);
  const couponTotal = useAppSelector(selectCouponTotal);

  return (
    <div className="space-y-3">
      {coupon.map(({ outcomeId }) => (
        <CouponItem key={outcomeId} outcomeId={outcomeId} />
      ))}
    </div>
  );
};
