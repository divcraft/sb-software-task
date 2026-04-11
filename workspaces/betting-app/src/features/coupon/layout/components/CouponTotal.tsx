import React from "react";
import { useAppSelector } from "store";
import { selectCouponTotal } from "features/coupon";

export const CouponTotal: React.FC = () => {
  const couponTotal = useAppSelector(selectCouponTotal);
  return <div className="font-semibold text-indigo-700">{couponTotal}</div>;
};

export default CouponTotal;
