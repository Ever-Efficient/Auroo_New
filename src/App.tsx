import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TopBar from './component/topbar';
import HomePage from './page/homePage';
import Footer from './component/footer';
import Womens from './page/womems';
import Kids from './page/kids';

export default function App() {
  return (
    <Router>
      <TopBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path='/womens' element={<Womens />} />
        <Route path='/kids' element={<Kids />} />
      </Routes>
      <Footer />
    </Router>
  );
}