import React from "react";
import { useAppSelector } from "store";
import { selectCouponTotal } from "../../state/betting.selectors";

export const CouponSummary: React.FC = () => {
  const couponTotal = useAppSelector(selectCouponTotal);

  return (
    <div className="pt-3 border-t mt-2">
      <div className="flex items-center justify-between text-sm">
        <div>Kurs całkowity</div>
        <div className="font-semibold text-indigo-700">{couponTotal.toFixed(2)}</div>
      </div>
    </div>
  );
};

export default CouponSummary;
