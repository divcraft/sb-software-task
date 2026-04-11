import React from "react";
import { CouponItem } from "./CouponItem";
import { useAppSelector } from "store";
import { selectCouponOutcomesIds } from "features/coupon";
import { shallowEqual } from "react-redux";

export const CouponList: React.FC = () => {
  const couponOutcomesIds = useAppSelector(selectCouponOutcomesIds, shallowEqual);
  console.debug("CouponList");

  return (
    <div className="space-y-3">
      {couponOutcomesIds.map((outcomeId) => (
        <CouponItem key={outcomeId} outcomeId={outcomeId} />
      ))}
    </div>
  );
};
