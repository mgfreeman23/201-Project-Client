import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateProfile from "./pages/CreateProfile";
import HomePage from "./pages/HomePage";
import './App.css';

function App() {
  return (
    <Router>
      <div>
        {/* Add a navigation bar for convenience */}
        <nav className="navbar">
          <a href="/">Home</a> | <a href="/createProfile">Create Profile</a>
        </nav>
        
        {/* Define your routes */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/createProfile" element={< CreateProfile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
