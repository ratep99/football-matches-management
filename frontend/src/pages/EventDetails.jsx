import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getEventById } from "../services/eventService";

import EventScoreHeader from "../components/EventScoreHeader";
import EventDetailsCard from "../components/EventDetailsCard";
import StadiumInformationCard from "../components/StadiumInformationCard";
import MatchTimeline from "../components/MatchTimeline";
import NoDataFound from "../components/NoDataFound";

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      const data = await getEventById(id);
      setEvent(data);
    };
    fetchEvent();
  }, [id]);


  if (!event || !event.homeTeam || !event.awayTeam || !event.stadium) {
    return <NoDataFound />;
  } 

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <EventScoreHeader event={event} id={id} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <EventDetailsCard event={event} />
        <StadiumInformationCard stadium={event.stadium} />
      </div>
      {event.status === "scheduled" ? (
        <div className="text-center text-lg font-semibold text-gray-700 mt-6">
          This event is scheduled to take place on {event.dateVenue} at {event.timeVenueUtc}.
        </div>
      ) : (
        <MatchTimeline event={event} />
      )}
    </div>
  );
};

export default EventDetails;
