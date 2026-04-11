"use client";
import { CouponLayout } from "features/coupon";
import { BettingLayout } from "features/betting";

export const BettingView = () => {
  console.log("BettingView");
  return (
    <div className="mx-auto px-4 py-6">
      <div className="flex w-full gap-6">
        <BettingLayout />
        <CouponLayout />
      </div>
    </div>
  );
};
