import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { getEventById } from "../services/eventService";

const EventDetails = () => {
  const { id } = useParams(); 
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const data = await getEventById(id);
        setEvent(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>{event.homeTeam.name} vs {event.awayTeam.name}</h1>
      <p>{event.dateVenue} - {event.timeVenueUtc}</p>
      <p>Stadium: {event.stadium.name}</p>
      <p>Competition: {event.competition.name}</p>
    </div>
  );
};

export default EventDetails;
