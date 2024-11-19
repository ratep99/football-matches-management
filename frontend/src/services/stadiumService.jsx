import axios from 'axios';

export const getAllStadiumsForDropdown = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/stadiums/dropdown');
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
