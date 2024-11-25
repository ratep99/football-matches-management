import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useEventData from '../hooks/useEventData';
import useDropdownData from '../hooks/useDropdownData';
import EventDetailsForm from '../components/EventDetailsForm';
import GoalSection from '../components/GoalSection';
import CardSection from '../components/CardSection';
import GoalModal from '../components/GoalModal';
import CardModal from '../components/CardModal';
import { updateEvent } from '../services/eventService';
import { addGoal, deleteGoal } from '../services/goalService';
import { addCard, deleteCard } from '../services/cardService';
import { getPlayersByTeamId } from '../services/playerService';

const EditEventPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { eventData, loading, error, setEventData } = useEventData(id);
  const { teams, competitions } = useDropdownData();
  const [showGoalModal, setShowGoalModal] = useState({ visible: false, teamId: null });
  const [showCardModal, setShowCardModal] = useState(false);
  const [teamPlayers, setTeamPlayers] = useState([]);
  const [homeTeamGoals, setHomeTeamGoals] = useState([]);
  const [awayTeamGoals, setAwayTeamGoals] = useState([]);
  const [homeTeamCards, setHomeTeamCards] = useState([]);
  const [awayTeamCards, setAwayTeamCards] = useState([]);

  // Effect for separating goals into home and away arrays
  useEffect(() => {
    if (eventData && eventData.result && eventData.result.goals) {
      const separateGoals = (goals, homeTeamId, awayTeamId) => {
        const formattedTime = eventData.timeVenueUtc.slice(0, 5); // Extract "HH:mm" from "HH:mm:ss"
        setEventData((prevData) => ({
          ...prevData,
          timeVenueUtc: formattedTime,
        }));
        const homeTeamGoalsArr = goals.filter((goal) => goal.teamId === homeTeamId);
        const awayTeamGoalsArr = goals.filter((goal) => goal.teamId === awayTeamId);
        return { homeTeamGoalsArr, awayTeamGoalsArr };
      };

      const { homeTeamGoalsArr, awayTeamGoalsArr } = separateGoals(
        eventData.result.goals,
        eventData.homeTeam.teamId,
        eventData.awayTeam.teamId
      );

      setHomeTeamGoals(homeTeamGoalsArr);
      setAwayTeamGoals(awayTeamGoalsArr);
    }
  }, [eventData]);

  // Effect for separating cards into home and away arrays
  useEffect(() => {
    if (eventData && eventData.result) {
      const separateCards = (cards, homeTeamId, awayTeamId) => {
        const allCards = [
          ...(cards.yellowCards || []),
          ...(cards.secondYellowCards || []),
          ...(cards.directRedCards || []),
        ];
        const homeTeamCardsArr = allCards.filter((card) => card.teamId === homeTeamId);
        const awayTeamCardsArr = allCards.filter((card) => card.teamId === awayTeamId);
        return { homeTeamCardsArr, awayTeamCardsArr };
      };

      const { homeTeamCardsArr, awayTeamCardsArr } = separateCards(
        eventData.result,
        eventData.homeTeam.teamId,
        eventData.awayTeam.teamId
      );

      setHomeTeamCards(homeTeamCardsArr);
      setAwayTeamCards(awayTeamCardsArr);
    }
  }, [eventData]);

  // Fetch players by teamId when opening the goal modal
  const handleAddGoal = async (teamId) => {
    try {
      const playersForTeam = await getPlayersByTeamId(teamId);
      setTeamPlayers(playersForTeam);
      setShowGoalModal({ visible: true, teamId: teamId });
    } catch (error) {
      console.error('Error fetching players:', error.message);
    }
  };

  // Handle deleting a goal and updating the local state
  const handleDeleteGoal = async (goalId) => {
    try {
      await deleteGoal(goalId);
      // Update the state after successfully deleting the goal
      setEventData((prevData) => ({
        ...prevData,
        result: {
          ...prevData.result,
          goals: prevData.result.goals.filter((goal) => goal.goalId !== goalId),
        },
      }));
    } catch (error) {
      console.error('Error deleting goal:', error.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading event data</div>;

  // Updated function to handle saving only event-level data
  const handleSaveChanges = async () => {
    try {
      const { eventId, season, status, timeVenueUtc, dateVenue, homeTeam, awayTeam, competition } = eventData;
      const updatedEventData = {
        eventId,
        season,
        status,
        date: dateVenue,
        time: timeVenueUtc,
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
      <div className="bg-white p-8 shadow-md rounded-lg max-w-3xl w-full">
        <h2 className="text-2xl font-bold mb-6 text-center text-indigo-600">Edit Event</h2>

        <EventDetailsForm
          eventData={eventData}
          handleInputChange={(e) => setEventData({ ...eventData, [e.target.name]: e.target.value })}
          handleDropdownChange={(e) => setEventData({ ...eventData, [e.target.name]: Number(e.target.value) })}
          competitionDropdown={competitions}
          homeTeamDropdown={teams}
          awayTeamDropdown={teams}
        />

        {/* Home Team Goal Section */}
        <GoalSection
          title="Home Team Goals"
          goals={homeTeamGoals}
          onAddGoal={() => handleAddGoal(eventData.homeTeam.teamId)}
          onDeleteGoal={handleDeleteGoal}
        />

        {/* Away Team Goal Section */}
        <GoalSection
          title="Away Team Goals"
          goals={awayTeamGoals}
          onAddGoal={() => handleAddGoal(eventData.awayTeam.teamId)}
          onDeleteGoal={handleDeleteGoal}
        />

        <button className="mt-6 bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg w-full" 
        onClick={handleSaveChanges}>
          Save Changes
        </button>

        {showGoalModal.visible && (
          <GoalModal
            teamId={showGoalModal.teamId}
            resultId={eventData.result.resultId}
            playersDropdown={teamPlayers}
            onClose={() => setShowGoalModal({ visible: false, teamId: null })}
            onSave={(goal) =>
              setEventData({
                ...eventData,
                result: {
                  ...eventData.result,
                  goals: [...eventData.result.goals, goal],
                },
              })
            }
          />
        )}
      </div>
    </div>
  );
};

export default EditEventPage;
