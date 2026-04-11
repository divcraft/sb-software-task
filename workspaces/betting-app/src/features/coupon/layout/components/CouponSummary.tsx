import { FC } from "react";
import { CouponTotal } from "./CouponTotal";

export const CouponSummary: FC = () => {
  return (
    <div className="pt-3 border-t mt-2">
      <div className="flex items-center justify-between text-sm">
        <div>Kurs całkowity</div>
        <CouponTotal />
      </div>
    </div>
  );
};
