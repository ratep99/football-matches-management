import React from 'react';
import { FaFutbol } from "react-icons/fa";

const CardIcon = ({ type }) => {
  if (type === 'yellowCard') {
    return <div className="ml-2 w-6 h-8 bg-yellow-400 rounded-sm shadow-lg"></div>; // Yellow card
  } else if (type === 'secondYellowCard') {
    return (
      <div className="flex space-x-1">
        <div className="ml-2 w-3 h-8 bg-yellow-400 rounded-sm shadow-lg"></div>
        <div className="ml-2 w-3 h-8 bg-red-600 rounded-sm shadow-lg"></div>
      </div>
    ); // Yellow and Red card (second yellow)
  } else if (type === 'redCard') {
    return <div className="ml-2 w-6 h-8 bg-red-600 rounded-sm shadow-lg"></div>; // Red card
  } else if (type === 'goal') {
    return (
      <div className="ml-2 w-8 h-8 rounded-full flex justify-center items-center bg-red-600 text-white shadow-lg">
        <FaFutbol />
      </div>
    ); // Goal icon
  }
  return null;
};

export default CardIcon;
