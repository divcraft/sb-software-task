import { SportGroup } from "./SportGroup";
import { useGetEventsQuery, selectSportGroups } from "features/betting";

export const FeedGroup = () => {
  const { data: events } = useGetEventsQuery();

  if (!events) return <div>Loading...</div>;

  const sportGroups = selectSportGroups(events);

  return (
    <div className="w-full">
      {sportGroups.map((sport) => (
        <SportGroup
          key={sport.sportName}
          categoryName={sport.sportName}
          events={sport.events}
        />
      ))}
    </div>
  );
};
