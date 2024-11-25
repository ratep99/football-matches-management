import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

// Fetch all events
export const getAllEvents = async () => {
  const response = await axios.get(`${API_BASE_URL}/events/dto`);
  console.log(response.data);
  return response.data;
};

export const getEventById = async (eventId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/events/${eventId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching event ${eventId}:`, error.message);
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


export const updateEvent = async (event) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/events/${event.eventId}`, event);
    return response.data;
  } catch (error) {
    console.error('Error updating event:', error.message);
    throw new Error('Failed to update event');
  }
};
