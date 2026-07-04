import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
