import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import ExplorePage from "./pages/ExplorePage";

const App: React.FC = () => {
  return (
    <Router>
      <nav className="py-4 px-8">
        <ul className="flex items-center space-x-4">
          <li>
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive
                  ? "text-gray-900 font-bold"
                  : "text-gray-600 hover:text-gray-900 transition duration-200"
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/explore"
              className={({ isActive }) =>
                isActive
                  ? "text-gray-900 font-bold"
                  : "text-gray-600 hover:text-gray-900 transition duration-200"
              }
            >
              Explore
            </NavLink>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/explore" element={<ExplorePage />} />
      </Routes>
    </Router>
  );
};

export default App;
