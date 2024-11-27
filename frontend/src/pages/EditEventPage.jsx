import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useEventData from '../hooks/useEventData';
import useDropdownData from '../hooks/useDropdownData';
import EventDetailsForm from '../components/EventDetailsForm';
import GoalSection from '../components/GoalSection';
import CardSection from '../components/CardSection';
import { updateEvent } from '../services/eventService';

const EditEventPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { eventData, loading, error, setEventData } = useEventData(id);
  const { teams, competitions } = useDropdownData();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading event data</div>;

  const handleSaveEventDetails = async () => {
    try {
      const { eventId, season, status, timeVenueUtc, dateVenue, homeTeam, awayTeam, competition } = eventData;
      const formattedTime = timeVenueUtc.slice(0,5);
      const updatedEventData = {
        eventId,
        season,
        status,
        date: dateVenue,
        time: formattedTime,
        homeTeam: homeTeam,
        awayTeam: awayTeam,
        competition: competition,
      };
      console.log(updatedEventData);
      await updateEvent(updatedEventData);
      navigate(`/event/${id}`);
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 shadow-md rounded-lg w-full">
        <h2 className="text-2xl font-bold mb-6 text-center text-[#000071]">Edit Event</h2>

        <EventDetailsForm
          eventData={eventData}
          handleInputChange={(e) => setEventData({ ...eventData, [e.target.name]: e.target.value })}
          handleDropdownChange={(e) => setEventData({ ...eventData, [e.target.name]: Number(e.target.value) })}
          competitionDropdown={competitions}
          homeTeamDropdown={teams}
          awayTeamDropdown={teams}
        />

            {/* Goal Sections Side by Side */}
            <div className="flex flex-wrap -mx-2 mb-4">
          <div className="w-1/2 px-2">
            <GoalSection
              title="Home Team Goals"
              resultId={eventData.result?.resultId}
              teamId={eventData?.homeTeam?.teamId}
              teamName={eventData?.homeTeam?.name}
            />
          </div>
          <div className="w-1/2 px-2">
            <GoalSection
              title="Away Team Goals"
              resultId={eventData.result?.resultId}
              teamId={eventData?.awayTeam?.teamId}
              teamName={eventData?.awayTeam?.name}
            />
          </div>
        </div>

        {/* Card Sections Side by Side */}
        <div className="flex flex-wrap -mx-2 mb-4">
          <div className="w-1/2 px-2">
            <CardSection
              title="Home Team Cards"
              resultId={eventData.result?.resultId}
              teamId={eventData?.homeTeam?.teamId}
              teamName={eventData?.homeTeam?.name}
            />
          </div>
          <div className="w-1/2 px-2">
            <CardSection
              title="Away Team Cards"
              resultId={eventData.result?.resultId}
              teamId={eventData?.awayTeam?.teamId}
              teamName={eventData?.homeTeam?.name}
            />
          </div>
        </div>
           <button className="mt-4 w-full bg-[#000071] hover:bg-[#ff0000] text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300"
        onClick={handleSaveEventDetails}>
          Save Event Details
        </button>
      </div>
      
    </div>
  );
};

export default EditEventPage;
