import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./pages/homePage";
import ClubsPage from "./pages/ClubsPage";
import CompetitionsPage from "./pages/CompetitionsPage";
import ClassementPage from "./pages/ClassementPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/clubs" element={<ClubsPage />} />
        <Route path="/competitions" element={<CompetitionsPage />} />
        <Route path="/classement" element={<ClassementPage />} />
      </Routes>
    </Router>
  );
}

export default App;
