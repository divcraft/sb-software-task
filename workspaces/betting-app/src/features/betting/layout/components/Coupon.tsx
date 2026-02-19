import React from "react";

export const Coupon: React.FC = () => {
  console.log("SidebarCoupon");

  return (
    <aside className="md:col-span-1">
      <div className="hidden md:block md:w-80 bg-white rounded-md shadow p-4 md:sticky md:top-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">KUPON</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-sm">Newcastle United</div>
            <div className="text-sm font-semibold text-indigo-700">1.60</div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm">Remis</div>
            <div className="text-sm font-semibold text-indigo-700">3.35</div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm">Udinese Calcio</div>
            <div className="text-sm font-semibold text-indigo-700">3.96</div>
          </div>
        </div>
        <div className="mt-4">
          <button className="w-full bg-indigo-700 text-white py-2 rounded-md">
            POSTAW ZAKŁAD
          </button>
        </div>
      </div>
    </aside>
  );
};
