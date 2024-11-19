import axios from "axios";
export const getAllCompetitionsForDropdown = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/competitions/dropdown');
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
};