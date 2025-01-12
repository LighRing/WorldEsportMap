import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/homePage";
import ClubsPage from "./pages/clubsPage";
import CompetitionsPage from "./pages/competitionsPage";
import ClassementPage from "./pages/classementPage";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/clubs" element={<ClubsPage />} />
        <Route path="/competitions" element={<CompetitionsPage />} />
        <Route path="/classement" element={<ClassementPage />} />
      </Routes>
    </Router>
  );
};

export default App;
