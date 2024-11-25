import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/goals';


export const getGoalById = async (goalId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${goalId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching goal ${goalId}:`, error.message);
    throw new Error(`Failed to fetch goal with id ${goalId}`);
  }
};

export const getGoalsByTeamId = async (teamId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/team/${teamId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching goals for team ${teamId}:`, error.message);
    throw new Error(`Failed to fetch goals for team with id ${teamId}`);
  }
};

export const addGoal = async (goalDTO) => {
  try {
    console.log(goalDTO)
    const response = await axios.post(`${API_BASE_URL}`, goalDTO);
    
    return response.data;
  } catch (error) {
    console.error('Error adding goal:', error.message);
    throw new Error('Failed to add goal');
  }
};


export const deleteGoal = async (goalId) => {
  try {
    await axios.delete(`${API_BASE_URL}/${goalId}`);
    return; 
  } catch (error) {
    console.error('Error deleting goal:', error.message);
    throw new Error('Failed to delete goal');
  }
};