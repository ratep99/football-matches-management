import React from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarker, FaTrophy, FaClock } from 'react-icons/fa';

const EventCard = ({ event }) => {
  // Null-checks for result properties
  const homeGoals = event.result?.homeGoals ?? '-';
  const awayGoals = event.result?.awayGoals ?? '-';

  return (
    <div className="bg-white rounded-xl shadow-md relative">
      <div className="p-4">
        {/* Top Section: Team Names, Logos, and Result */}
        <div className="mb-4 flex justify-between items-center">
          <div className="flex items-center text-gray-600">
            <img
              src={event.homeTeam.logoUrl}
              alt={`${event.homeTeam.name} logo`}
              className="h-10 w-10 mr-2 object-contain"
            />
            <span
              className="text-sm font-bold truncate max-w-[120px] lg:max-w-[160px] overflow-hidden whitespace-nowrap"
              title={event.homeTeam.officialName || event.homeTeam.name}
            >
              {event.homeTeam.abbreviation}
            </span>
          </div>

          <div className="text-lg font-bold text-gray-800">
            {event.status === 'played' && (
              <span>
                {homeGoals} - {awayGoals}
              </span>
            )}
          </div>

          <div className="flex items-center text-gray-600">
            <span
              className="text-sm font-bold truncate max-w-[120px] lg:max-w-[160px] overflow-hidden whitespace-nowrap"
              title={event.awayTeam.officialName || event.awayTeam.name}
            >
              {event.awayTeam.abbreviation}
            </span>
            <img
              src={event.awayTeam.logoUrl}
              alt={`${event.awayTeam.name} logo`}
              className="h-8 w-8 ml-2 object-contain"
            />
          </div>
        </div>

        {/* Competition and Stage */}
        <h3 className="text-xl font-bold text-center">
          <FaTrophy className="inline text-yellow-500 mr-2" />
          {event.competition.name} - {event.stage.name}
        </h3>

        {/* Date and Time */}
        <div className="text-center text-gray-600 mt-2 mb-4">
          <FaClock className="inline text-indigo-500 mr-1" />
          {event.dateVenue}, {event.timeVenueUtc} UTC
        </div>

        {/* Divider */}
        <div className="border border-gray-100 mb-5"></div>

        {/* Stadium Info */}
        <div className="flex flex-col lg:flex-row justify-between items-center">
          <div className="text-orange-700 text-center lg:text-left mb-3 lg:mb-0">
            <FaMapMarker className="inline text-lg mb-1 mr-1" />
            {event.stadium.name}, {event.stadium.location}
          </div>
          <Link
            to={`/event/${event.eventId}`}
            className="h-[36px] bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-center text-sm"
          >
            View Match Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
