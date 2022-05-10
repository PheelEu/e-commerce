
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import CartPage from './pages/CartPage';
import {Navbar, Container, Badge, Nav}from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap'
import { useContext } from 'react';
import { Store } from './Store';


function App() {
  const { state } = useContext(Store);
  const { cart } = state;

  return (
    <Router>
      <div className="d-flex flex-column site-container">
        <header>
          <Navbar bg="dark" variant="dark">
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand>E-COMMERCE</Navbar.Brand>
              </LinkContainer>
              <Nav className="me-auto">
                 <Link to="/cart" className="nav-link">
                   Cart
                   {cart.cartItems.length > 0 && (
                     <Badge pill bg="danger">
                         {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                     </Badge>
                   )}
                 </Link>
               </Nav>
            </Container>
          </Navbar>
        </header>
        <main>
          <Container className="mt-3">
            <Routes>
              <Route path="/product/:slug" element={<ProductPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/" element={<HomePage />} />
            </Routes>
          </Container>
        </main>
        <footer>
          <div className="text-center">All rights reserved</div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
