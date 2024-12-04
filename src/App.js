import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CreateProfile from "./pages/CreateProfile";
import HomePage from "./pages/HomePage";
import Explore from "./pages/Explore";
import Login from "./pages/Login";
import './App.css';
import SettingsPage from './pages/Settings';
import ChangePasswordPage from './pages/PasswordChange';

function App() {
  // use react states to check if user is logged in
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem('uid');
    setLoggedIn(!!userId);
  }, []);

  return (
    <Router>
      <div>
        {/* Navbar links change depending on if user is signed in or not */}
        <nav className="navbar">
          <Link to="/">Home</Link> | 
          <Link to="/explore">Explore</Link> | 
          {loggedIn ? (
            <>
              <Link to="/createProfile">Create Profile</Link> | 
              <Link to="/settings">Settings</Link> | 
              
            </>
          ) : (
            <>
              <Link to="/Login">Login</Link> | 
              <Link to="/register">Registration</Link>
            </>
          )}
        </nav>
        {/* Define your routes */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/createProfile" element={< CreateProfile />} />
          <Route path="/explore" element={< Explore />} />
          <Route path="/settings" element={< SettingsPage />} />
          <Route path="/settings/passwordChange" element={< ChangePasswordPage />} />
          <Route path="/Login" element={< Login />}></Route>

        </Routes>
      </div>
    </Router>
  );
}

export default App;
