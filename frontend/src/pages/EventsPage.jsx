import React, { useState, useEffect } from 'react';
import { getAllEvents } from '../services/eventService';
import EventCard from '../components/EventCard';

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getAllEvents(false);
        setEvents(data);
      } catch (error) {
        setError('Error fetching events');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-red-600 mb-6 text-center">
          All Events
        </h2>
        {loading && (
          <div className="flex justify-center items-center min-h-[200px]">
            <p className="text-lg text-gray-600">Loading events...</p>
          </div>
        )}
        {error && (
          <div className="flex justify-center items-center min-h-[200px]">
            <p className="text-lg text-red-500">{error}</p>
          </div>
        )}

        {!loading && !error && events.length === 0 && (
          <div className="flex justify-center items-center min-h-[200px]">
            <p className="text-lg text-gray-600">No events found</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCard key={event.eventId} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventsPage;
