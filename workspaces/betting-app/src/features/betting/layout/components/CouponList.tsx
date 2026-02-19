import React from "react";
import { CouponItem } from "./CouponItem";
import { useAppSelector } from "store";

type Item = {
  gameId: number;
  outcomeId: number;
};

export const CouponList: React.FC = () => {
  const coupons = useAppSelector((s) => s.betting.couponOutcomesIds);

  return (
    <div className="space-y-3">
      {coupons.map((coupon) => (
        <CouponItem
          key={`${coupon.gameId}-${coupon.outcomeId}`}
          gameId={coupon.gameId}
          outcomeId={coupon.outcomeId}
        />
      ))}
    </div>
  );
};
export default CouponList;
