import React from 'react';

const PlayerInfoCard = ({ player, time, reason, isHome }) => (
  <div className={`${isHome ? 'mr-4' : 'ml-4'} pl-4 pr-4 bg-gray-100 p-2 rounded-md shadow-sm`}>
    <p>
      <strong>{player}</strong>
    </p>
    {reason && <p className="text-sm text-gray-600">Reason: {reason}</p>}
  </div>
);

export default PlayerInfoCard;
