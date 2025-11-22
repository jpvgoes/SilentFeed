import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FeedbackProvider } from './context/FeedbackContext';
import Layout from './components/layout/Layout';
import HomePage from './components/pages/HomePage';
import ClientPage from './components/pages/ClientPage';
import ManagerDashboard from './components/pages/ManagerDashboard';
import NotFound from './components/pages/NotFound';

export default function App() {
  return (
    <FeedbackProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="feedback" element={<ClientPage />} />
            <Route path="dashboard" element={<ManagerDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </FeedbackProvider>
  );
}
