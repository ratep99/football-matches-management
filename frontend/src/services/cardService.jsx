import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/cards';

export const getCardById = async (cardId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${cardId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching card ${cardId}:`, error.message);
    throw new Error(`Failed to fetch card with id ${cardId}`);
  }
};

export const getCardsByTeamId = async (teamId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/team/${teamId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching cards for team ${teamId}:`, error.message);
    throw new Error(`Failed to fetch cards for team with id ${teamId}`);
  }
};

export const addCard = async (cardDTO) => {
  try {
    const response = await axios.post(`${API_BASE_URL}`, cardDTO);
    return response.data;
  } catch (error) {
    console.error('Error adding card:', error.message);
    throw new Error('Failed to add card');
  }
};

export const deleteCard = async (cardId) => {
  try {
    await axios.delete(`${API_BASE_URL}/${cardId}`);
    return; 
  } catch (error) {
    console.error('Error deleting card:', error.message);
    throw new Error('Failed to delete card');
  }
};
