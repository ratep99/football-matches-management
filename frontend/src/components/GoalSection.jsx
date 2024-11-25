import React from 'react';

const GoalSection = ({ title, goals, onAddGoal, onDeleteGoal }) => (
  <div className="mb-6 border-2 rounded-lg p-5 m-2 shadow-md bg-white border-[#000071]">
    <h3 className="text-2xl font-bold text-center mb-4" style={{ color: '#000071' }}>{title}</h3>
    {goals.map((goal) => (
      <div
        key={goal.goalId}
        className="flex items-center justify-between mb-3 p-3 rounded-lg border"
        style={{ borderColor: '#000071', backgroundColor: '#f9f9f9' }}
      >
        <span className="font-semibold text-gray-800">{goal.player.name} - {goal.time}'</span>
        <button
          className="bg-transparent hover:bg-[#ff0000] text-[#ff0000] font-semibold hover:text-white py-1 px-3 border border-[#ff0000] rounded-lg transition-colors duration-300"
          onClick={() => onDeleteGoal(goal.goalId)}
        >
          Delete
        </button>
      </div>
    ))}
    <button
      className="mt-4 w-full bg-[#000071] hover:bg-[#ff0000] text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300"
      onClick={onAddGoal}
    >
      Add Goal
    </button>
  </div>
);

export default GoalSection;
