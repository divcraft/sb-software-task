import { FC } from "react";
import { BetslipTotal } from "./BetslipTotal";

export const BetslipSummary: FC = () => {
  return (
    <div className="pt-3 border-t mt-2">
      <div className="flex items-center justify-between text-sm">
        <div>Kurs całkowity</div>
        <BetslipTotal />
      </div>
    </div>
  );
};
