import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

export const getAllEvents = async (isHomePage) => {
  const response = await axios.get(`${API_BASE_URL}/events?_limit=3`);
    return isHomePage? response.data.slice(0, 3):response.data; 

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
export const createEvent = async (eventData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/events`, eventData);
    return response.data; 
  } catch (error) {
    console.error('Error creating event:', error);
    throw new Error('Failed to create event'); 
  }
};