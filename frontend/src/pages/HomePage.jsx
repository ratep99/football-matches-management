import { Link } from "react-router-dom";

const HomePage = () => {
  const events = [
    { eventId: 36, name: "Manchester City vs Real Madrid" },
    { eventId: 37, name: "Bayern Munich vs PSG" },
  ];

  return (
    <div>
      <h1>Upcoming Events</h1>
      <ul>
        {events.map((event) => (
          <li key={event.eventId}>
            <Link to={`/event/${event.eventId}`}>{event.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
