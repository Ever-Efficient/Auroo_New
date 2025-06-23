import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TopBar from './component/topbar';
import HomePage from './page/homePage';
import Footer from './component/footer';

export default function App() {
  return (
    <Router>
      <TopBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
      <Footer />
    </Router>
  );
}