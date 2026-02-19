"use client";

import { FeedGroup } from "./components/EventGroup";
import { MobileCoupon } from "./components/MobileCoupon";
import { Coupon } from "./components/Coupon";

export const BettingView = () => {
  console.log("BettingView");
  return (
    <div className="mx-auto px-4 py-6">
      <div className="flex w-full gap-6">
        <FeedGroup />
        <Coupon />
      </div>
      <MobileCoupon />
    </div>
  );
};

export default BettingView;
