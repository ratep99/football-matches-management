import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

export const getAllEvents = async () => {
  const response = await axios.get(`${API_BASE_URL}/events`);
  return response.data;
};

export const getEventById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/events/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching event ${id}:`, error.message);
    throw error;
  }
};
