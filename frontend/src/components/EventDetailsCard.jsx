import React from 'react';
import { FaCalendarAlt, FaTrophy } from 'react-icons/fa';

const EventDetailsCard = ({ event }) => {
  return (
    <div className="bg-white p-6 shadow-lg rounded-lg hover:shadow-2xl transition border-t-4 border-[#000071]">
      <h3 className="text-2xl font-bold mb-4 text-[#000071] flex items-center">
        <FaTrophy className="mr-2" /> Event Details
      </h3>
      <div className="space-y-3">
        <div className="flex items-center">
          <FaCalendarAlt className="text-gray-500 mr-2" />
          <p><strong>Date:</strong> {event.dateVenue} - {event.timeVenueUtc}</p>
        </div>
        <div>
          <p><strong>Status:</strong> <span className="text-[#000071]">{event.status}</span></p>
        </div>
        <div>
          <p><strong>Competition:</strong> {event.competition.name}</p>
          <p><strong>Stage:</strong> {event.stage.name}</p>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsCard;
