import React, { useState } from 'react';

const CardModal = ({ event, onClose, onSave, playersDropdown = [] }) => {
  const [cardData, setCardData] = useState({
    playerId: '',
    teamId: '',
    time: '',
    cardType: '', // 'yellow', 'second_yellow', or 'red'
    reason: '',
  });

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle player selection change and autofill the team field
  const handlePlayerChange = (e) => {
    const selectedPlayerId = Number(e.target.value);
    const selectedPlayer = playersDropdown.find((player) => player.playerId === selectedPlayerId);
    if (selectedPlayer) {
      setCardData((prev) => ({
        ...prev,
        playerId: selectedPlayerId,
        teamId: selectedPlayer.teamId,
      }));
    }
  };

  // Handle save action
  const handleSave = () => {
    onSave(cardData);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h3 className="text-xl font-bold mb-4">Add Card</h3>

        <div className="mb-4">
          <label htmlFor="playerId" className="block text-gray-700 font-bold mb-2">Player</label>
          <select
            id="playerId"
            name="playerId"
            value={cardData.playerId}
            onChange={handlePlayerChange}
            className="w-full p-2 border rounded-lg focus:outline-none focus:border-indigo-500"
          >
            <option value="">Select Player</option>
            {playersDropdown.length > 0 ? (
              playersDropdown.map((player) => (
                <option key={player.playerId} value={player.playerId}>
                  {player.name}
                </option>
              ))
            ) : (
              <option disabled>No players available</option>
            )}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="teamId" className="block text-gray-700 font-bold mb-2">Team</label>
          <input
            type="text"
            id="teamId"
            name="teamId"
            value={cardData.teamId}
            onChange={handleInputChange}
            placeholder="Team ID"
            className="w-full p-2 border rounded-lg"
            readOnly
          />
        </div>

        <div className="mb-4">
          <label htmlFor="time" className="block text-gray-700 font-bold mb-2">Time</label>
          <input
            type="number"
            id="time"
            name="time"
            value={cardData.time}
            onChange={handleInputChange}
            placeholder="Minute of Card"
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="cardType" className="block text-gray-700 font-bold mb-2">Card Type</label>
          <select
            id="cardType"
            name="cardType"
            value={cardData.cardType}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-lg"
          >
            <option value="">Select Card Type</option>
            <option value="yellow">Yellow</option>
            <option value="second_yellow">Second Yellow</option>
            <option value="red">Red</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="reason" className="block text-gray-700 font-bold mb-2">Reason</label>
          <input
            type="text"
            id="reason"
            name="reason"
            value={cardData.reason}
            onChange={handleInputChange}
            placeholder="Reason for Card"
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <button
          onClick={handleSave}
          className="bg-green-500 text-white px-4 py-2 rounded-lg mr-2"
        >
          Save
        </button>
        <button
          onClick={onClose}
          className="bg-red-500 text-white px-4 py-2 rounded-lg"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default CardModal;
