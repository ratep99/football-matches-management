import React from 'react';
import CardIcon from './CardIcon';
import PlayerInfoCard from './PlayerInfoCard';

const TimelineEvent = ({ event }) => {
  if (event.team === 'home') {
    return (
      <div className="flex items-center justify-end mb-2 mr-2">
        <PlayerInfoCard player={event.player} time={event.time} reason={event.reason} />
        <CardIcon type={event.type} />
        <span className="text-sm font-bold text-[#000071] ml-4 mr-1">{event.time}'</span>
      </div>
    );
  } else if (event.team === 'away') {
    return (
      <div className="flex items-center justify-start mb-2 ml-2">
        <span className="text-sm font-bold text-[#000071] mr-4 ml-1">{event.time}'</span>
        <CardIcon type={event.type} />
        <PlayerInfoCard player={event.player} time={event.time} reason={event.reason} />
      </div>
    );
  }

  return null;
};

export default TimelineEvent;
