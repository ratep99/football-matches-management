import { useEffect, useState } from 'react';
import { getAllTeamsForDropdown } from '../services/teamService';
import {getAllCompetitionsForDropdown} from '../services/competitionService';

const useDropdownData = () => {
  const [teams, setTeams] = useState([]);
  const [competitions, setCompetitions] = useState([]);
  
  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const teamsData = await getAllTeamsForDropdown();
        const competitionsData = await getAllCompetitionsForDropdown();
        setTeams(teamsData);
        setCompetitions(competitionsData);
      } catch (error) {
        console.error("Error fetching dropdown data: ", error);
      }
    };
    
    fetchDropdownData();
  }, []);

  return { teams, competitions };
};

export default useDropdownData;
