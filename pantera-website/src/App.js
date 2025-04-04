import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainWindow from './main-window'
import NewsPage from './NewsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainWindow />} />
        <Route path="/news" element={<NewsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
