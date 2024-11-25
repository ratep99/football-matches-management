import React, { useState, useEffect } from 'react';
import { addGoal } from '../services/goalService';
import { getPlayersByTeamId } from '../services/playerService'; // Assuming you have a service to fetch players by team

const GoalModal = ({ teamId, resultId, onClose, onSave }) => {
  const [goalData, setGoalData] = useState({
    playerId: '',
    teamId: teamId,
    time: '',
  });

  const [filteredPlayers, setFilteredPlayers] = useState([]);

  // Fetch players for the given teamId whenever teamId changes
  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        if (teamId) {
          const playersForTeam = await getPlayersByTeamId(teamId);
          setFilteredPlayers(playersForTeam);
        }
      } catch (error) {
        console.error('Error fetching players:', error.message);
      }
    };

    fetchPlayers();
  }, [teamId]);

  // Handle player selection change
  const handlePlayerChange = (e) => {
    const { value } = e.target;
    setGoalData((prev) => ({
      ...prev,
      playerId: value,
    }));
  };

  // Handle save action
  const handleSave = async () => {
    const completeGoalData = {
      ...goalData,
      resultId: resultId,
    };

    try {
      // Save goal to the backend
      const savedGoal = await addGoal(completeGoalData);

      // Update the event data with the new goal
      onSave(savedGoal);
      onClose(); // Close modal after successful save
    } catch (error) {
      console.error('Error saving goal:', error.message);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h3 className="text-xl font-bold mb-4">Add Goal</h3>

        {/* Player Selection */}
        <div className="mb-4">
          <label htmlFor="playerId" className="block text-gray-700 font-bold mb-2">Player</label>
          <select
            id="playerId"
            name="playerId"
            value={goalData.playerId}
            onChange={handlePlayerChange}
            className="w-full p-2 border rounded-lg focus:outline-none focus:border-indigo-500"
            disabled={!teamId} // Disable if no team is selected
          >
            <option value="">Select Player</option>
            {filteredPlayers.map((player) => (
              <option key={player.playerId} value={player.playerId}>
                {player.name}
              </option>
            ))}
          </select>
        </div>

        {/* Time Input */}
        <div className="mb-4">
          <label htmlFor="time" className="block text-gray-700 font-bold mb-2">Time</label>
          <input
            type="number"
            id="time"
            name="time"
            value={goalData.time}
            onChange={(e) => setGoalData({ ...goalData, time: e.target.value })}
            placeholder="Minute of Goal"
            className="w-full p-2 border rounded-lg"
          />
        </div>

        {/* Action Buttons */}
        <button
          onClick={handleSave}
          className="bg-[#000071] text-white px-4 py-2 rounded-lg mr-2"
        >
          Save
        </button>
        <button
          onClick={onClose}
          className="bg-[#ff0000] text-white px-4 py-2 rounded-lg"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default GoalModal;
