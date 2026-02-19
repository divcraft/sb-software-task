import React, { useState } from "react";

export const MobileCoupon: React.FC = () => {
  const [open, setOpen] = useState(false);

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
            3
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

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="text-sm">Newcastle United</div>
                <div className="text-sm font-semibold text-indigo-700">
                  1.60
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm">Remis</div>
                <div className="text-sm font-semibold text-indigo-700">
                  3.35
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm">Udinese Calcio</div>
                <div className="text-sm font-semibold text-indigo-700">
                  3.96
                </div>
              </div>
            </div>

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
