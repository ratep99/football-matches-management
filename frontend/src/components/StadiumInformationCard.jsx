import React from 'react';
import { FaMapMarkerAlt, FaUsers, FaInfoCircle } from 'react-icons/fa';

const StadiumInformationCard = ({ stadium }) => {
  return (
    <div className="bg-white p-6 shadow-lg rounded-lg hover:shadow-2xl transition border-t-4 border-[#000071]">
      <h3 className="text-2xl font-bold mb-4 text-[#000071] flex items-center">
        <FaMapMarkerAlt className="mr-2" /> Stadium Information
      </h3>
      <div className="space-y-3">
        <div>
          <p><strong>Name:</strong> {stadium.name}</p>
        </div>
        <div className="flex items-center">
          <FaMapMarkerAlt className="text-gray-500 mr-2" />
          <p><strong>Location:</strong> {stadium.location}</p>
        </div>
        <div className="flex items-center">
          <FaUsers className="text-gray-500 mr-2" />
          <p><strong>Capacity:</strong> {stadium.capacity.toLocaleString()}</p>
        </div>
        <div className="flex items-center">
          <FaInfoCircle className="text-gray-500 mr-2" />
          <p><strong>Surface:</strong> {stadium.surfaceType}</p>
        </div>
      </div>
    </div>
  );
};

export default StadiumInformationCard;
