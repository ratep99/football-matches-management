import React from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarker, FaTrophy, FaClock } from 'react-icons/fa';

const EventCard = ({ event }) => {
  // Null-checks for result properties
  const homeGoals = event.homeTeamGoals ?? '-';
  const awayGoals = event.awayTeamGoals ?? '-';
  const formattedDate = new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const formattedTime = new Date(`1970-01-01T${event.time}Z`).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="bg-white rounded-xl shadow-md relative border-2 border-[#000071] hover:shadow-lg transition-all duration-500">
      <div className="p-6">
        {/* Top Section: Team Names, Logos, and Result */}
        <div className="mb-6 flex justify-between items-center">
          <div className="flex items-center text-[#000071]">
            <img
              src={event.homeTeam.logoUrl}
              alt={`${event.homeTeam.name} logo`}
              className="h-12 w-12 mr-3 object-contain"
            />
            <span
              className="text-md font-bold truncate max-w-[140px] lg:max-w-[200px] overflow-hidden whitespace-nowrap"
              title={event.homeTeam.officialName || event.homeTeam.name}
            >
              {event.homeTeam.abbreviation}
            </span>
          </div>

          <div className="text-2xl font-bold text-[#ff0000]">
            {event.status === 'played' && (
              <span>
                {homeGoals} - {awayGoals}
              </span>
            )}
          </div>

          <div className="flex items-center text-[#000071]">
            <span
              className="text-md font-bold truncate max-w-[140px] lg:max-w-[200px] overflow-hidden whitespace-nowrap"
              title={event.awayTeam.officialName || event.awayTeam.name}
            >
              {event.awayTeam.abbreviation}
            </span>
            <img
              src={event.awayTeam.logoUrl}
              alt={`${event.awayTeam.name} logo`}
              className="h-10 w-10 ml-3 object-contain"
            />
          </div>
        </div>

        {/* Competition and Stage */}
        <h3 className="text-xl font-bold text-center text-[#000071]">
          <FaTrophy className="inline text-[#ff0000] mr-2" />
          {event.competition.name} - {event.stage.name}
        </h3>

        {/* Date and Time */}
        <div className="text-center text-gray-700 mt-3 mb-6">
          <FaClock className="inline text-[#000071] mr-2" />
          {formattedDate}, {formattedTime} UTC
        </div>

        {/* Divider */}
        <div className="border border-gray-200 mb-6"></div>

        {/* Stadium Info */}
        <div className="flex flex-col lg:flex-row justify-between items-center">
          <div className="text-[#ff0000] text-center lg:text-left mb-3 lg:mb-0">
            <FaMapMarker className="inline text-lg mb-1 mr-2" />
            {event.stadium.name}, {event.stadium.location}
          </div>
          <Link
            to={`/event/${event.eventId}`}
            className="w-[160px] bg-[#000071] hover:bg-[#ff0000] text-white px-4 py-2 rounded-lg text-center text-base font-semibold transition-all duration-500"
          >
            View Match Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
