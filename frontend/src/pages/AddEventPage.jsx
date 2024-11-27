import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createEvent } from '../services/eventService';
import { getAllCompetitionsForDropdown } from '../services/competitionService';
import { getAllTeamsForDropdown } from '../services/teamService';
import { getAllStagesForDropdown } from '../services/stageService';
import { getAllStadiumsForDropdown } from '../services/stadiumService';
import { FaTrophy } from 'react-icons/fa'; // Import FaTrophy here

const AddEventPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    season: '',
    dateVenue: '',
    timeVenueUtc: '',
    status: '',
    homeTeamId: '',
    awayTeamId: '',
    competitionId: '',
    stageId: '',
    stadiumId: '',
  });
  const [competitions, setCompetitions] = useState([]);
  const [teams, setTeams] = useState([]);
  const [stages, setStages] = useState([]);
  const [stadiums, setStadiums] = useState([]);

  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const [competitionData, teamData, stageData, stadiumData] = await Promise.all([
          getAllCompetitionsForDropdown(),
          getAllTeamsForDropdown(),
          getAllStagesForDropdown(),
          getAllStadiumsForDropdown(),
        ]);
        setCompetitions(Array.isArray(competitionData) ? competitionData : []);
        setTeams(Array.isArray(teamData) ? teamData : []);
        setStages(Array.isArray(stageData) ? stageData : []);
        setStadiums(Array.isArray(stadiumData) ? stadiumData : []);
      } catch (error) {
        console.error('Error fetching dropdown data:', error);
      }
    };
    fetchDropdownData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDropdownChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedFormData = {
        season: formData.season,
        dateVenue: formData.dateVenue,
        timeVenueUtc: formData.timeVenueUtc + ':00',
        homeTeam: { teamId: parseInt(formData.homeTeamId) },
        awayTeam: { teamId: parseInt(formData.awayTeamId) },
        competition: { competitionId: formData.competitionId },
        stage: { stageId: formData.stageId },
        stadium: { stadiumId: formData.stadiumId },
      };
      await createEvent(updatedFormData);
      navigate('/events');
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  return (
    <div className="p-10 bg-gray-100 min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-10 shadow-lg rounded-xl border-t-4 border-[#000071] max-w-xl w-full">
        <h2 className="text-3xl font-bold mb-8 text-center text-[#000071] flex items-center justify-center">
          <FaTrophy className="mr-3 text-[#ff0000]" /> Add New Event
        </h2>

        {/* Season Input */}
        <div className="mb-6">
          <label htmlFor="season" className="block text-xl font-bold mb-3 text-[#000071]">Season</label>
          <input
            type="text"
            id="season"
            name="season"
            value={formData.season}
            onChange={handleInputChange}
            placeholder="e.g., 2024"
            className="w-full p-3 border-2 rounded-lg focus:outline-none focus:border-[#ff0000]"
            style={{ borderColor: '#000071' }}
          />
        </div>

        {/* Date Input */}
        <div className="mb-6">
          <label htmlFor="dateVenue" className="block text-xl font-bold mb-3 text-[#000071]">Event Date</label>
          <input
            type="date"
            id="dateVenue"
            name="dateVenue"
            value={formData.dateVenue}
            onChange={handleInputChange}
            className="w-full p-3 border-2 rounded-lg focus:outline-none focus:border-[#ff0000]"
            style={{ borderColor: '#000071' }}
          />
        </div>

        {/* Time Input */}
        <div className="mb-6">
          <label htmlFor="timeVenueUtc" className="block text-xl font-bold mb-3 text-[#000071]">Event Time (UTC)</label>
          <input
            type="time"
            id="timeVenueUtc"
            name="timeVenueUtc"
            value={formData.timeVenueUtc}
            onChange={handleInputChange}
            className="w-full p-3 border-2 rounded-lg focus:outline-none focus:border-[#ff0000]"
            style={{ borderColor: '#000071' }}
          />
        </div>

        {/* Status Input */}
        <div className="mb-6">
          <label htmlFor="status" className="block text-xl font-bold mb-3 text-[#000071]">Status</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            className="w-full p-3 border-2 rounded-lg focus:outline-none focus:border-[#ff0000]"
            style={{ borderColor: '#000071' }}
          >
            <option value="">Select Status</option>
            <option value="scheduled">Scheduled</option>
            <option value="played">Played</option>
          </select>
        </div>

        {/* Home Team Dropdown */}
        <div className="mb-6">
          <label htmlFor="homeTeamId" className="block text-xl font-bold mb-3 text-[#000071]">Home Team</label>
          <select
            id="homeTeamId"
            name="homeTeamId"
            value={formData.homeTeamId}
            onChange={handleDropdownChange}
            className="w-full p-3 border-2 rounded-lg focus:outline-none focus:border-[#ff0000]"
            style={{ borderColor: '#000071' }}
          >
            <option value="">Select Home Team</option>
            {teams.map((team) => (
              <option key={team.id} value={team.id}>
                {team.name}
              </option>
            ))}
          </select>
        </div>

        {/* Away Team Dropdown */}
        <div className="mb-6">
          <label htmlFor="awayTeamId" className="block text-xl font-bold mb-3 text-[#000071]">Away Team</label>
          <select
            id="awayTeamId"
            name="awayTeamId"
            value={formData.awayTeamId}
            onChange={handleDropdownChange}
            className="w-full p-3 border-2 rounded-lg focus:outline-none focus:border-[#ff0000]"
            style={{ borderColor: '#000071' }}
          >
            <option value="">Select Away Team</option>
            {teams.map((team) => (
              <option key={team.id} value={team.id}>
                {team.name}
              </option>
            ))}
          </select>
        </div>

        {/* Competition Dropdown */}
        <div className="mb-6">
          <label htmlFor="competitionId" className="block text-xl font-bold mb-3 text-[#000071]">Competition</label>
          <select
            id="competitionId"
            name="competitionId"
            value={formData.competitionId}
            onChange={handleDropdownChange}
            className="w-full p-3 border-2 rounded-lg focus:outline-none focus:border-[#ff0000]"
            style={{ borderColor: '#000071' }}
          >
            <option value="">Select Competition</option>
            {competitions.map((competition) => (
              <option key={competition.competitionId} value={competition.competitionId}>
                {competition.name}
              </option>
            ))}
          </select>
        </div>

        {/* Stage Dropdown */}
        <div className="mb-6">
          <label htmlFor="stageId" className="block text-xl font-bold mb-3 text-[#000071]">Stage</label>
          <select
            id="stageId"
            name="stageId"
            value={formData.stageId}
            onChange={handleDropdownChange}
            className="w-full p-3 border-2 rounded-lg focus:outline-none focus:border-[#ff0000]"
            style={{ borderColor: '#000071' }}
          >
            <option value="">Select Stage</option>
            {stages.map((stage) => (
              <option key={stage.stageId} value={stage.stageId}>
                {stage.name}
              </option>
            ))}
          </select>
        </div>

        {/* Stadium Dropdown */}
        <div className="mb-6">
          <label htmlFor="stadiumId" className="block text-xl font-bold mb-3 text-[#000071]">Stadium</label>
          <select
            id="stadiumId"
            name="stadiumId"
            value={formData.stadiumId}
            onChange={handleDropdownChange}
            className="w-full p-3 border-2 rounded-lg focus:outline-none focus:border-[#ff0000]"
            style={{ borderColor: '#000071' }}
          >
            <option value="">Select Stadium</option>
            {stadiums.map((stadium) => (
              <option key={stadium.id} value={stadium.id}>
                {stadium.name}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-8 bg-[#ff0000] hover:bg-[#000071] text-white font-bold py-3 px-6 rounded-lg w-full transition-all duration-500"
        >
          Add Event
        </button>
      </form>
    </div>
  );
};

export default AddEventPage;
