import { FC, useState } from "react";
import { BetslipList } from "./components/BetslipList";
import { BetslipSummary } from "./components/BetslipSummary";

export const BetslipLayout: FC = () => {
  const [show, setShow] = useState(false);
  return (
    <aside
      className={`fixed bottom-4 ${!show && `transform translate-y-[calc(100%-40px)]`} right-6 col-span-1 lg:sticky lg:block lg:translate-0`}
    >
      <div className="block w-100 bg-gray-100 lg:bg-white rounded-md lg:shadow p-4">
        <div
          onClick={() => setShow((show) => !show)}
          className="flex items-center justify-between mb-3 cursor-pointer lg:cursor-auto"
        >
          <h3 className="text-sm font-semibold text-gray-700">KUPON</h3>
          <button className="lg:hidden cursor-pointer p-1">{show ? "▾" : "▸"}</button>
        </div>
        <BetslipList />
        <BetslipSummary />
        <div className="mt-4">
          <button className="w-full bg-indigo-700 text-white py-2 rounded-md">POSTAW ZAKŁAD</button>
        </div>
      </div>
    </aside>
  );
};
