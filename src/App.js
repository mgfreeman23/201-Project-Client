import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateProfile from "./pages/CreateProfile";
import HomePage from "./pages/HomePage";

import Explore from "./pages/Explore";

import Login from "./pages/Login";

import './App.css';
import SettingsPage from './pages/Settings';
import ChangePasswordPage from './pages/PasswordChange';

function App() {
  return (
    <Router>
      <div>
        {/* Add a navigation bar for convenience */}
        <nav className="navbar">
          <a href="/">Home</a> | <a href="/createProfile">Create Profile</a> | <a href="/explore">Explore</a> | <a href="/explore">Login</a>

          
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
