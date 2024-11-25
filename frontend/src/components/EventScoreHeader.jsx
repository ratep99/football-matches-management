import React from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { deleteEvent } from '../services/eventService'; // Import the delete function

const EventScoreHeader = ({ event, id }) => {
  const navigate = useNavigate();

  const handleEditEvent = () => {
    navigate(`/edit-event/${id}`);
  };

  const handleDeleteEvent = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this event?');
    if (confirmDelete) {
      try {
        await deleteEvent(id); 
        navigate('/events'); 
      } catch (error) {
        console.error('Error deleting event:', error.message);
        alert('Failed to delete the event. Please try again.');
      }
    }
  };

  return (
    <div className="relative bg-[#000071] text-white py-8 px-6 rounded-lg shadow-lg mb-10">
      <div className="absolute top-4 right-4 flex gap-2">
        <button
          className="text-[#000071] border border-[#000071] px-4 py-2 rounded-lg bg-white hover:bg-[#000071] hover:text-white transition"
          onClick={handleEditEvent}
        >
          <FaEdit className="inline mr-2" /> Edit Event
        </button>
        <button
          className="text-[#000071] border border-[#ff0000] px-4 py-2 rounded-lg bg-white hover:bg-[#ff0000] hover:text-white transition"
          onClick={handleDeleteEvent}
        >
          <FaTrashAlt className="inline mr-2" /> Delete Event
        </button>
      </div>
      <div className="flex justify-center items-center gap-8 mb-4">
        {/* Home Team */}
        <div className="flex items-center gap-4 bg-[#000071] p-4 rounded-lg shadow-lg">
          <img
            src={event.homeTeam.logoUrl}
            alt={`${event.homeTeam.name} logo`}
            className="w-24 h-24 object-contain bg-white rounded-full p-2 shadow-md"
          />
          <span className="text-2xl font-semibold text-[#ffffff]">{event.homeTeam.name}</span>
        </div>
        {/* Score */}
        <div className="bg-white text-[#000071] px-8 py-4 rounded-full shadow-lg text-4xl font-bold">
          {event.status === 'played' ? `${event.result.homeGoals} : ${event.result.awayGoals}` : 'vs'}
        </div>
        {/* Away Team */}
        <div className="flex items-center gap-4 bg-[#000071] p-4 rounded-lg shadow-lg">
          <img
            src={event.awayTeam.logoUrl}
            alt={`${event.awayTeam.name} logo`}
            className="w-24 h-24 object-contain bg-white rounded-full p-2 shadow-md"
          />
          <span className="text-2xl font-semibold text-[#ffffff]">{event.awayTeam.name}</span>
        </div>
      </div>
    </div>
  );
};

export default EventScoreHeader;
