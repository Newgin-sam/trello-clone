import logo from './logo.svg';
import { Routes, Route, Link } from "react-router-dom";
import './App.scss';

import Board from './pages/board/board.pages';
import Dashboard from './pages/dashboard/dashboard.pages';
import Header from './component/header/header.component';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/board/:id" element={<Board />} />
      </Routes>

    </div>
  );
}

export default App;
