import React from 'react';

const EventDetailsForm = ({ eventData, handleInputChange, handleDropdownChange, competitionDropdown, homeTeamDropdown, awayTeamDropdown }) => (
  <div className="border-2 rounded-lg p-6 m-4 shadow-md bg-white border-[#000071]">
    {/* Season */}
    <div className="mb-6">
      <label htmlFor="season" className="block text-xl font-bold mb-2" style={{ color: '#000071' }}>Season</label>
      <input
        type="text"
        id="season"
        name="season"
        value={eventData.season}
        onChange={handleInputChange}
        className="w-full p-3 border-2 rounded-lg focus:outline-none focus:border-[#000071] disabled:bg-gray-200"
        style={{ borderColor: '#000071' }}
        disabled={eventData.status === "played"}
      />
    </div>
    {/* Event Date */}
    <div className="mb-6">
      <label htmlFor="dateVenue" className="block text-xl font-bold mb-2" style={{ color: '#000071' }}>Event Date</label>
      <input
        type="date"
        id="dateVenue"
        name="dateVenue"
        value={eventData.dateVenue}
        onChange={handleInputChange}
        className="w-full p-3 border-2 rounded-lg focus:outline-none focus:border-[#000071] disabled:bg-gray-200"
        style={{ borderColor: '#000071' }}
        disabled={eventData.status === "played"}
      />
    </div>
    {/* Event Time */}
    <div className="mb-6">
      <label htmlFor="timeVenueUtc" className="block text-xl font-bold mb-2" style={{ color: '#000071' }}>Event Time (UTC)</label>
      <input
        type="time"
        id="timeVenueUtc"
        name="timeVenueUtc"
        value={eventData.timeVenueUtc}
        onChange={handleInputChange}
        className="w-full p-3 border-2 rounded-lg focus:outline-none focus:border-[#000071] disabled:bg-gray-200"
        style={{ borderColor: '#000071' }}
        disabled={eventData.status === "played"}
      />
    </div>
    {/* Competition Dropdown */}
    <div className="mb-6">
      <label htmlFor="competitionId" className="block text-xl font-bold mb-2" style={{ color: '#000071' }}>Competition</label>
      <select
        id="competitionId"
        name="competition"
        value={eventData.competition?.competitionId}
        onChange={handleDropdownChange}
        className="w-full p-3 border-2 rounded-lg focus:outline-none focus:border-[#000071] disabled:bg-gray-200"
        style={{ borderColor: '#000071' }}
        disabled={eventData.status === "played"}
      >
        <option value="">Select Competition Team</option>
        {competitionDropdown.map((competition) => (
          <option key={competition.competitionId} value={competition.competitionId}>{competition.name}</option>
        ))}
      </select>
    </div>
    {/* Home Team Dropdown */}
    <div className="mb-6">
      <label htmlFor="homeTeamId" className="block text-xl font-bold mb-2" style={{ color: '#000071' }}>Home Team</label>
      <select
        id="homeTeamId"
        name="homeTeam"
        value={eventData.homeTeam?.teamId}
        onChange={handleDropdownChange}
        className="w-full p-3 border-2 rounded-lg focus:outline-none focus:border-[#000071] disabled:bg-gray-200"
        style={{ borderColor: '#000071' }}
        disabled={eventData.status === "played"}
      >
        <option value="">Select Home Team</option>
        {homeTeamDropdown.map((team) => (
          <option key={team.id} value={team.id}>{team.name}</option>
        ))}
      </select>
    </div>
    {/* Away Team Dropdown */}
    <div className="mb-6">
      <label htmlFor="awayTeamId" className="block text-xl font-bold mb-2" style={{ color: '#000071' }}>Away Team</label>
      <select
        id="awayTeamId"
        name="awayTeam"
        value={eventData.awayTeam?.teamId}
        onChange={handleDropdownChange}
        className="w-full p-3 border-2 rounded-lg focus:outline-none focus:border-[#000071] disabled:bg-gray-200"
        style={{ borderColor: '#000071' }}
        disabled={eventData.status === "played"}
      >
        <option value="">Select Away Team</option>
        {awayTeamDropdown.map((team) => (
          <option key={team.id} value={team.id}>{team.name}</option>
        ))}
      </select>
    </div>
  </div>
);

export default EventDetailsForm;
