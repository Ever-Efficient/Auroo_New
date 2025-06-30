import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './page/homePage';
import Womens from './page/womems';
import Kids from './page/kids';
import Cart from './page/cart';
import Contact from './page/contact';
import Sale from './page/sale';
import Product from './page/productDetails';
import Info from './page/info';
import Terms from './page/terms';
import Policy from './page/policy';
import Careers from './page/careers';
import AboutUs from './page/aboutus';
import Error404 from './component/404error';

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
        <Route path="/product/:id" element={<Product />} />
        <Route path="/info" element={<Info />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/404" element={<Error404 />} />
      </Routes>
    </Router>
  );
}