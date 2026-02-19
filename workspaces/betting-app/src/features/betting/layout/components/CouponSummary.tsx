import React from "react";
import { useAppSelector } from "store";
import { useGetEventsQuery } from "features/betting";
import {
  selectResolvedCoupon,
  selectCouponTotal,
} from "../../state/betting.selectors";

export const CouponSummary: React.FC = () => {
  const { data: events } = useGetEventsQuery();
  const coupon = useAppSelector((s) => s.betting.couponOutcomesIds);

  const resolved = selectResolvedCoupon(events ?? [], coupon);
  const total = selectCouponTotal(resolved);

  return (
    <div className="pt-3 border-t mt-2">
      <div className="flex items-center justify-between text-sm">
        <div>Kurs całkowity</div>
        <div className="font-semibold text-indigo-700">{total.toFixed(2)}</div>
      </div>
    </div>
  );
};

export default CouponSummary;
