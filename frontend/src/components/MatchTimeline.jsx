import React, { useMemo } from 'react';
import _ from 'lodash';
import TimelineEvent from './TimelineEvent';
import CentralLine from './CentralLine';

/**
 * MatchTimeline Component:
 * This component is responsible for rendering a timeline of match events.
 * 1. Extract all relevant match events using a helper function (`getTimelineEvents`).
 * 2. Filter out events without valid time data and sort them chronologically.
 * 3. Group events by the time using lodash.
 * 4. Render the timeline by displaying grouped events on either side of a central vertical line.
 */

const getTimelineEvents = (event) => {
  if (!event?.result) return [];

  return [
    ...(event.result.goals?.map((goal) => ({
      type: 'goal',
      time: goal.time,
      player: goal.player.name,
      team: goal.teamId === event.homeTeam.teamId ? 'home' : 'away',
    })) || []),

    ...(event.result.yellowCards?.map((card) => ({
      type: 'yellowCard',
      time: card.time,
      player: card.player.name,
      reason: card.reason,
      team: card.teamId === event.homeTeam.teamId ? 'home' : 'away',
    })) || []),

    ...(event.result.secondYellowCards?.map((card) => ({
      type: 'secondYellowCard',
      time: card.time,
      player: card.player.name,
      reason: card.reason,
      team: card.teamId === event.homeTeam.teamId ? 'home' : 'away',
    })) || []),

    ...(event.result.directRedCards?.map((card) => ({
      type: 'redCard',
      time: card.time,
      player: card.player.name,
      reason: card.reason,
      team: card.teamId === event.homeTeam.teamId ? 'home' : 'away',
    })) || []),
  ];
};

const MatchTimeline = ({ event }) => {
  // Use useMemo to optimize re-renders and compute timeline events only when the event changes
  const timelineEvents = useMemo(() => getTimelineEvents(event), [event]);

  // Filter out events with no valid time and sort them by time
  const validTimelineEvents = useMemo(
    () => timelineEvents.filter((e) => e.time !== null && e.time !== undefined).sort((a, b) => a.time - b.time),
    [timelineEvents]
  );

  // Group events by the time they occurred
  const groupedEvents = useMemo(() => _.groupBy(validTimelineEvents, 'time'), [validTimelineEvents]);

  return (
    <div className="bg-white p-6 shadow-md rounded-lg md:col-span-2 hover:shadow-xl transition border-t-4 border-red-600 mb-8">
      <h3 className="text-2xl font-bold mb-4 text-red-600 text-center">Match Timeline</h3>
      <div className="relative flex items-start">
        <CentralLine />

        {/* Render grouped events by time */}
        <div className="w-full">
          {Object.entries(groupedEvents).map(([time, events], groupIndex) => (
            <div key={groupIndex} className="flex items-center justify-between mb-2">
              {/* Home Team Events (Left Side of the Timeline) */}
              <div className="w-1/2 text-right">
                {events
                  .filter((event) => event.team === 'home')
                  .map((event, index) => (
                    <TimelineEvent key={index} event={event} />
                  ))}
              </div>

              {/* Empty Space for Central Line */}
              <div className="text-center w-1/24"></div>

              {/* Away Team Events (Right Side of the Timeline) */}
              <div className="w-1/2 text-left">
                {events
                  .filter((event) => event.team === 'away')
                  .map((event, index) => (
                    <TimelineEvent key={index} event={event} />
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MatchTimeline;
