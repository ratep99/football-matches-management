import React from 'react'
import { FaExclamationTriangle } from 'react-icons/fa';

const NoDataFound = () => {
    return (
      <div className="flex flex-col items-center justify-center mt-20 p-6 bg-red-100 rounded-lg shadow-md border border-red-400 max-w-md mx-auto">
        <FaExclamationTriangle className="text-red-500 text-4xl mb-4" />
        <p className="text-xl font-semibold text-red-700">No event data found</p>
        <p className="text-md text-red-600 mt-2">
          Please check back later or try refreshing the page.
        </p>
      </div>
    );
}
export default NoDataFound;