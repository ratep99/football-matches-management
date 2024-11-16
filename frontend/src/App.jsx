import React from 'react'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Router and Routes
import HomePage from "./pages/HomePage";
import EventDetails from "./pages/EventDetails";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/event/:id" element={<EventDetails />} />
      </Routes>
    </Router>
  );
}

export default App
