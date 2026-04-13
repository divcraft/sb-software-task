import { FC } from "react";
import { useAppSelector } from "store";
import { selectCouponTotal } from "features/betslip";

export const BetslipTotal: FC = () => {
  const couponTotal = useAppSelector(selectCouponTotal);
  return <div className="font-semibold text-indigo-700">{couponTotal}</div>;
};
