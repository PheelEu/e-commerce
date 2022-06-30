import React, { useEffect, useReducer, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { getError } from "../utils";
import { Helmet } from "react-helmet-async";
import {
  Row,
  Col,
  Button,
  Collapse,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import Rating from "../components/Rating";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Product from "../components/Product";
import LinkContainer from "react-router-bootstrap/LinkContainer";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return {
        ...state,
        products: action.payload.products,
        page: action.payload.page,
        pages: action.payload.pages,
        countProducts: action.payload.countProducts,
        loading: false,
      };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

const prices = [
  {
    name: "€1 to €50",
    value: "1-50",
  },
  {
    name: "€51 to €200",
    value: "51-200",
  },
  {
    name: "€201 to €1000",
    value: "201-1000",
  },
];

export const ratings = [
  {
    name: "4stars & up",
    rating: 4,
  },

  {
    name: "3stars & up",
    rating: 3,
  },

  {
    name: "2stars & up",
    rating: 2,
  },

  {
    name: "1stars & up",
    rating: 1,
  },
];

export default function SearchPage() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const sp = new URLSearchParams(search); // /search?category=Shirts for specific category, all for all the categories, same all the other filters
  const category = sp.get("category") || "all";
  const query = sp.get("query") || "all";
  const price = sp.get("price") || "all";
  const rating = sp.get("rating") || "all";
  const order = sp.get("order") || "newest";
  const page = sp.get("page") || 1;

  const [openCategories, setOpenCategories] = useState(false);
  const [openPrices, setOpenPrices] = useState(false);
  const [openReviews, setOpenReviews] = useState(false);

  const [{ loading, error, products, pages, countProducts }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: "",
    });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `/api/products/search?page=${page}&query=${query}&category=${category}&price=${price}&rating=${rating}&order=${order}`
        );
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({
          type: "FETCH_FAIL",
          payload: getError(error),
        });
      }
    };
    fetchData();
  }, [category, error, order, page, price, query, rating]);

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`/api/products/categories`);
        setCategories(data);
      } catch (err) {
        toast.error(getError(err));
      }
    };
    fetchCategories();
  }, [dispatch]);

  const getFilterUrl = (filter) => {
    const filterPage = filter.page || page;
    const filterCategory = filter.category || category;
    const filterQuery = filter.query || query;
    const filterRating = filter.rating || rating;
    const filterPrice = filter.price || price;
    const sortOrder = filter.order || order;
    return `/search?category=${filterCategory}&query=${filterQuery}&price=${filterPrice}&rating=${filterRating}&order=${sortOrder}&page=${filterPage}`;
  };
  return (
    <div>
      <Helmet>
        <title>Search Products</title>
      </Helmet>
      <Row>
        <Col md={2}>
          <Row>
            <Button
              variant="custom"
              onClick={() => setOpenCategories(!openCategories)}
              aria-controls="collapse-categories"
              aria-expanded={openCategories}
            >
              Categories
            </Button>
            <Collapse in={openCategories}>
              <div id="collapse-categories" className="mb-1">
                <ListGroup>
                  <ListGroup.Item>
                    <Link
                      className={
                        "all" === category
                          ? "text-bold Link-custom"
                          : "Link-custom"
                      }
                      to={getFilterUrl({ category: "all" })}
                    >
                      ANY
                    </Link>
                  </ListGroup.Item>
                  {categories.map((c) => (
                    <ListGroup.Item key={c}>
                      <Link
                        className={
                          c === category
                            ? "text-bold Link-custom"
                            : "Link-custom"
                        }
                        to={getFilterUrl({ category: c })}
                      >
                        {c}
                      </Link>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </div>
            </Collapse>
          </Row>
          <Row>
            <Button
              variant="custom"
              onClick={() => setOpenPrices(!openPrices)}
              aria-controls="collapse-prices"
              aria-expanded={openPrices}
            >
              Price
            </Button>
            <Collapse in={openPrices}>
              <div id="collapse-prices" className="mb-1">
                <ListGroup>
                  <ListGroup.Item>
                    <Link
                      className={
                        "all" === price
                          ? "text-bold Link-custom"
                          : "Link-custom"
                      }
                      to={getFilterUrl({ price: "all" })}
                    >
                      ANY
                    </Link>
                  </ListGroup.Item>
                  {prices.map((p) => (
                    <ListGroup.Item key={p.value}>
                      <Link
                        to={getFilterUrl({ price: p.value })}
                        className={
                          p.value === price
                            ? "text-bold Link-custom"
                            : "Link-custom"
                        }
                      >
                        {p.name}
                      </Link>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </div>
            </Collapse>
          </Row>
          <Row>
            <Button
              variant="custom"
              onClick={() => setOpenReviews(!openReviews)}
              aria-controls="collapse-reviews"
              aria-expanded={openReviews}
            >
              Avg. Customer Review
            </Button>
            <Collapse in={openReviews}>
              <div id="collapse-reviews" className="mb-1">
                <ListGroup>
                  {ratings.map((r) => (
                    <ListGroup.Item key={r.name}>
                      <Link
                        to={getFilterUrl({ rating: r.rating })}
                        className={
                          `${r.rating}` === `${rating}`
                            ? "text-bold Link-custom"
                            : "Link-custom"
                        }
                      >
                        <Rating caption={" "} rating={r.rating}></Rating>
                      </Link>
                    </ListGroup.Item>
                  ))}
                  <ListGroupItem>
                    <Link
                      to={getFilterUrl({ rating: "all" })}
                      className={
                        rating === "all"
                          ? "text-bold Link-custom"
                          : "Link-custom"
                      }
                    >
                      <Rating caption={" "} rating={0}></Rating>
                    </Link>
                  </ListGroupItem>
                </ListGroup>
              </div>
            </Collapse>
          </Row>
        </Col>
        <Col md={10}>
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <>
              <Row className="justify-content-between mb-3">
                <Col md={6}>
                  <div>
                    {countProducts === 0 ? "No" : countProducts} Results
                    {query !== "all" && " : " + query}
                    {category !== "all" && " : " + category}
                    {price !== "all" && " : Price " + price}
                    {rating !== "all" && " : Rating " + rating + "+"}
                    {query !== "all" ||
                    category !== "all" ||
                    rating !== "all" ||
                    price !== "all" ? (
                      <Button
                        variant="light"
                        onClick={() => navigate("/search")}
                      >
                        <i className="fas fa-times-circle"></i>
                      </Button>
                    ) : null}
                  </div>
                </Col>
                <Col className="text-end">
                  Sort by{" "}
                  <select
                    value={order}
                    onChange={(e) => {
                      navigate(getFilterUrl({ order: e.target.value }));
                    }}
                  >
                    <option value="newest">Newest Arrivals</option>
                    <option value="lowest">Price: Low to High</option>
                    <option value="highest">Price: High to Low</option>
                    <option value="toprated">Avg. Customer Reviews</option>
                  </select>
                </Col>
              </Row>
              {products.length === 0 && (
                <MessageBox>No Product Found</MessageBox>
              )}

              <Row>
                {products.map((product) => (
                  <Col sm={6} lg={4} className="mb-3" key={product._id}>
                    <Product product={product}></Product>
                  </Col>
                ))}
              </Row>

              <div>
                {[...Array(pages).keys()].map((x) => (
                  <LinkContainer
                    key={x + 1}
                    className="mx-1"
                    to={getFilterUrl({ page: x + 1 })}
                  >
                    <Button
                      className={Number(page) === x + 1 ? "text-bold" : ""}
                      variant="light"
                    >
                      {x + 1}
                    </Button>
                  </LinkContainer>
                ))}
              </div>
            </>
          )}
        </Col>
      </Row>
    </div>
  );
}
