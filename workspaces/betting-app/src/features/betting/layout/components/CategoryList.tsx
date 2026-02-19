import { EventType } from "shared/types";
import { SportGroup } from "./SportGroup";
import { useGetEventsQuery } from "features/betting";

export const CategoryList = () => {
  const { data: events } = useGetEventsQuery();

  if (!events) return <div>Loading...</div>;
  console.log("CategoryList");

  const groups = events.reduce<Record<string, EventType[]>>((acc, ev) => {
    const key = ev.category1Name || "Other";
    if (!acc[key]) acc[key] = [];
    acc[key].push(ev);
    return acc;
  }, {});

  return (
    <div className="w-full">
      {Object.entries(groups).map(([categoryName, evs]) => (
        <SportGroup
          key={categoryName}
          categoryName={categoryName}
          events={evs}
        />
      ))}
    </div>
  );
};
