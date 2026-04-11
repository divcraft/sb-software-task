import { FC } from "react";
import { useAppSelector } from "store";
import { selectCouponTotal } from "features/coupon";

export const CouponTotal: FC = () => {
  const couponTotal = useAppSelector(selectCouponTotal);
  return <div className="font-semibold text-indigo-700">{couponTotal}</div>;
};
