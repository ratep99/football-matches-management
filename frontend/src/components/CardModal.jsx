import React, { useState, useEffect } from 'react';
import { getPlayersByTeamId } from '../services/playerService';

const CardModal = ({ teamId, resultId, onClose, onSave }) => {
  const [selectedPlayer, setSelectedPlayer] = useState('');
  const [cardType, setCardType] = useState('');
  const [cardTime, setCardTime] = useState('');
  const [playersDropdown, setPlayersDropdown] = useState([]);
  const [reason, setReason] = useState('');


  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const players = await getPlayersByTeamId(teamId);
        setPlayersDropdown(players);
      } catch (error) {
        console.error('Error fetching players:', error.message);
      }
    };

    fetchPlayers();
  }, [teamId]);

  const handleSave = () => {
    debugger;
    const player = playersDropdown.find(player => player.playerId === Number(selectedPlayer));
    if (player && cardType && cardTime && reason) {
      const newCard = {
        playerId:selectedPlayer,
        teamId,
        type: cardType,
        time: cardTime,
        reason: reason,
        resultId: resultId
      };
      onSave(newCard);
      onClose();
    } else {
      alert('Please select a valid player, card type, and card time');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h3 className="text-xl font-bold mb-4">Add Card</h3>
        <div className="mb-4">
          <label htmlFor="playerId" className="block text-gray-700 font-bold mb-2">
            Player
          </label>
          <select
            id="playerId"
            value={selectedPlayer}
            onChange={(e) => setSelectedPlayer(Number(e.target.value))}
            className="w-full p-2 border rounded-lg"
          >
            <option value="">Select Player</option>
            {playersDropdown.map((player) => (
              <option key={player.playerId} value={player.playerId}>
                {player.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="cardType" className="block text-gray-700 font-bold mb-2">
            Card Type
          </label>
          <select
            id="cardType"
            value={cardType}
            onChange={(e) => setCardType(e.target.value)}
            className="w-full p-2 border rounded-lg"
          >
            <option value="">Select Card Type</option>
            <option value="YELLOW">Yellow Card</option>
            <option value="RED">Red Card</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="time" className="block text-gray-700 font-bold mb-2">
            Time (in minutes)
          </label>
          <input
            type="number"
            id="time"
            value={cardTime}
            onChange={(e) => setCardTime(e.target.value)}
            placeholder="Minute of Card"
            className="w-full p-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
  <label htmlFor="reason" className="block text-gray-700 font-bold mb-2">
    Reason
  </label>
  <input
    type="text"
    id="reason"
    value={reason}
    onChange={(e) => setReason(e.target.value)}
    placeholder="Reason for card"
    className="w-full p-2 border rounded-lg"
  />
</div>

        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg mr-2"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="bg-red-600 text-white px-4 py-2 rounded-lg"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardModal;