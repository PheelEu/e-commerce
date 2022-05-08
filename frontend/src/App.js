
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home_page";
import ProductPage from "./pages/product_page";

function App() {
  return (
    <Router>
      <div>
        <header>
          <Link to="/">E-COMMERCE</Link>
        </header>
        <main>
          <Routes>
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/" element={<HomePage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
