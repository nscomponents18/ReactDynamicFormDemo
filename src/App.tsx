import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import BootstrapDemo from './modules/bootstrapDemo/bootstrapDemo';
import TailwindDemo from './modules/tailwindDemo/tailwindDemo';
import './App.css';



const App: React.FC = () => {
  return (
    <Router>
      <div>
      <nav className="navbar py-2">
        <ul>
          <li>
            <Link to="/bootstrap">Bootstrap Demo</Link>
          </li>
          <li>
            <Link to="/tailwind">Tailwind Demo</Link>
          </li>
        </ul>
      </nav>

        <Routes>
          <Route path="/" element={<BootstrapDemo />} />
          <Route path="/bootstrap" element={<BootstrapDemo />} />
          <Route path="/tailwind" element={<TailwindDemo />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
