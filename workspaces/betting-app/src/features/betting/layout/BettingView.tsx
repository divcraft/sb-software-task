"use client";

import { Coupon } from "features/coupon/layout/Coupon";
import { FeedGroup } from "./components/EventGroup";

export const BettingView = () => {
  console.log("BettingView");
  return (
    <div className="mx-auto px-4 py-6">
      <div className="flex w-full gap-6">
        <FeedGroup />
        <Coupon />
      </div>
    </div>
  );
};

export default BettingView;
