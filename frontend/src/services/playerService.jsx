import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/players';

export const getPlayersByTeamId = async (teamId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/team/${teamId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching players for team ${teamId}:`, error.message);
    throw error;
  }
};
