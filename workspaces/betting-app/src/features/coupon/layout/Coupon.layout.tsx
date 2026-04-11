import { FC } from "react";
import { CouponSummary } from "./components/CouponSummary";
import { CouponList } from "./components/CouponList";

export const CouponLayout: FC = () => {
  return (
    <aside className="md:col-span-1">
      <div className="hidden md:block md:w-80 bg-white rounded-md shadow p-4 md:sticky md:top-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">KUPON</h3>
        <CouponList />
        <CouponSummary />
        <div className="mt-4">
          <button className="w-full bg-indigo-700 text-white py-2 rounded-md">POSTAW ZAKŁAD</button>
        </div>
      </div>
    </aside>
  );
};
