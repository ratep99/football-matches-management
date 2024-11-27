import React, { useEffect, useState } from 'react';
import { getGoalsByTeamId, addGoal, deleteGoal } from '../services/goalService';
import GoalModal from './GoalModal';

const GoalSection = ({ resultId,teamId, teamName }) => {
  const [goals, setGoals] = useState([]);
  const [showGoalModal, setShowGoalModal] = useState(false);
  useEffect(() => {
    fetchGoals();
  }, [teamId]);

  const fetchGoals = async () => {
    try {
      const fetchedGoals = await getGoalsByTeamId(teamId);
      setGoals(fetchedGoals);
    } catch (error) {
      console.error(`Error fetching goals for team ${teamId}:`, error.message);
      setGoals([]);
    }
  };


  const handleAddGoal = async (newGoal) => {
    try {
      const addedGoal = await addGoal(newGoal);
      setGoals((prevGoals) => [...prevGoals, addedGoal]);
    } catch (error) {
      console.error('Error adding goal:', error.message);
    }
  };

  const handleDeleteGoal = async (goalId) => {
    try {
      await deleteGoal(goalId);
      setGoals((prevGoals) => prevGoals.filter((goal) => goal.goalId !== goalId));
    } catch (error) {
      console.error('Error deleting goal:', error.message);
    }
  };

  return (
    <div className="mb-6 border-2 rounded-lg p-5 m-2 shadow-md bg-white border-[#000071] w/2-full">
      <h3 className="text-2xl font-bold text-center mb-4" style={{ color: '#000071' }}>
         {teamName} goals
      </h3>
      {goals.length === 0 ? (
        <div>No goals available for this team.</div>
      ) : (
        goals.map((goal) => (
          <div
            key={goal.goalId}
            className="flex items-center justify-between mb-3 p-3 rounded-lg border"
            style={{ borderColor: '#000071', backgroundColor: '#f9f9f9' }}
          >
            <span className="font-semibold text-gray-800">
              {goal.player.name} - {goal.time}'
            </span>
            <button
              className="bg-transparent hover:bg-[#ff0000] text-[#ff0000] font-semibold hover:text-white py-1 px-3 border border-[#ff0000] rounded-lg transition-colors duration-300"
              onClick={() => handleDeleteGoal(goal.goalId)}
            >
              Delete
            </button>
          </div>
        ))
      )}
      <button
        className="mt-4 w-full bg-[#000071] hover:bg-[#ff0000] text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300"
        onClick={() => setShowGoalModal(true)}
      >
        Add Goal
      </button>

      {showGoalModal && (
        <GoalModal
          teamId={teamId}
          resultId={resultId}
          onClose={() => setShowGoalModal(false)}
          onSave={(goalDTO) => { handleAddGoal(goalDTO); }}
        />
      )}
    </div>
  );
};

export default GoalSection;