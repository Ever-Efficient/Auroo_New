import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './page/homePage';
import Womens from './page/womems';
import Kids from './page/kids';
import Cart from './page/cart';
import Contact from './page/contact';
import Sale from './page/sale';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path='/womens' element={<Womens />} />
        <Route path='/kids' element={<Kids />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/sale' element={<Sale />} />
      </Routes>
    </Router>
  );
}