import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './pages/ScrollToTop';
import Home from './pages/Home';
import TermsOfService from './pages/TermsOfService';

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
      </Routes>
    </Router>
  );
}
