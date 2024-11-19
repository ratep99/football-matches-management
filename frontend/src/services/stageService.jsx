import axios from 'axios';

export const getAllStagesForDropdown = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/stages/dropdown');
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};