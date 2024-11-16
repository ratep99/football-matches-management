import { Link } from "react-router-dom";
import Header from "../components/Header";
import EventsContainer from "../components/EventsContainer";
const HomePage = () => {
 

  return (<>
    <Header/>
    <EventsContainer/>
    </>
  );
};

export default HomePage;

/**
 *  const events = [
    { eventId: 36, name: "Manchester City vs Real Madrid" },
    { eventId: 37, name: "Bayern Munich vs PSG" },
  ];
 * 
 * <div>
      <h1>Upcoming Events</h1>
      <ul>
        {events.map((event) => (
          <li key={event.eventId}>
            <Link to={`/event/${event.eventId}`}>{event.name}</Link>
          </li>
        ))}
      </ul>
    </div> */