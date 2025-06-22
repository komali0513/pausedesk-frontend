import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './components/HomePage';
import FacultyLogin from './components/FacultyLogin';
import HODLogin from './components/HODLogin';
import FacultyDashboard from './components/FacultyDashboard';
import HODDashboard from './components/HODDashboard';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/faculty-login" element={<FacultyLogin />} />
        <Route path="/hod-login" element={<HODLogin />} />
        <Route path="/faculty-dashboard" element={<FacultyDashboard />} />
        <Route path="/hod-dashboard" element={<HODDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
