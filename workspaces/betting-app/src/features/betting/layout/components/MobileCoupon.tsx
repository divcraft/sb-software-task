import React, { useState } from "react";
import { useAppSelector } from "store";
import { useGetEventsQuery } from "features/betting";
import CouponList from "./CouponList";
import CouponSummary from "./CouponSummary";
import { selectResolvedLength } from "../../state/betting.selectors";

export const MobileCoupon: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { data: events } = useGetEventsQuery();

  const coupon = useAppSelector((s) => s.betting.couponOutcomesIds);

  const resolvedLength = selectResolvedLength(events ?? [], coupon);

  return (
    <>
      <div className="md:hidden fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setOpen(true)}
          className="bg-indigo-700 text-white px-4 py-2 rounded-full shadow-lg flex items-center space-x-3"
          aria-label="Open coupon"
        >
          <span className="text-sm font-semibold">KUPON</span>
          <span className="bg-white text-indigo-700 text-xs px-2 py-1 rounded">
            {resolvedLength}
          </span>
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/40"
            onClick={() => setOpen(false)}
          />

          <div className="ml-auto w-full max-w-md bg-white h-full shadow-xl p-4 overflow-auto">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold">KUPON</h3>
              <button
                className="text-gray-600"
                onClick={() => setOpen(false)}
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            {resolvedLength === 0 ? (
              <div className="text-sm text-gray-500">
                Brak wybranych zakładów
              </div>
            ) : (
              <>
                <CouponList />
                <CouponSummary />
              </>
            )}

            <div className="mt-6">
              <button className="w-full bg-indigo-700 text-white py-2 rounded-md">
                POSTAW ZAKŁAD
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
