import React, { useState } from "react";
import AccountList from "./AccountList";
import AccountPage from "./AccountPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header>
        <h1>Gestion des comptes et transactions</h1>
      </header>
      <main>
        <Router>
          <div>
            <Routes>
              <Route path="/" element={<AccountList />} />
              <Route path="/account/:accountId" element={<AccountPage />} />
            </Routes>
          </div>
        </Router>
      </main>
    </div>
  );
}

export default App;
