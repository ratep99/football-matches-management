import axios from 'axios';

export const getAllTeamsForDropdown = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/teams/dropdown');
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};