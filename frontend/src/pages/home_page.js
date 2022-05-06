import { Link } from 'react-router-dom';
import data from '../data';

function HomePage() {
  return (
    <div>
      <h1>Featured Products</h1>
      <div className="Products">
        {data.products.map((product) => (
          <div className="Product" key={product.slug}>
            <Link to={`/product/${product.slug}`}>
              <img src={product.image} alt={product.name} />
            </Link>
            <div className="Product-info">
              <Link to={`/product/${product.slug}`}>
                <p>{product.name}</p>
              </Link>
              <p>
                <strong>${product.price}</strong>
              </p>
              <button>Add to cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default HomePage;