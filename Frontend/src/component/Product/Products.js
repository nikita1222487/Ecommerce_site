import React, { Fragment, useEffect, useState } from "react";
import "./Products.css";
import { useSelector, useDispatch } from "react-redux";
import { cleaerErrors, getProduct } from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import ProductCard from "../Home/ProductCard.js";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import { Slider } from "@mui/material";
import { Typography } from "@mui/material";
import {useAlert} from "react-alert"
import MetaData from "../layout/MetaData";

const categories = [
  "Laptop",
  "Footware",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "SmartPhone",
];

function Products() {
  const { keyword } = useParams();
  console.log(keyword);
  const dispatch = useDispatch();

  const alert=useAlert()

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setprice] = useState([0, 25000]);
  const [category, setcategory] = useState("");
  const [rating, setrating] = useState(0);

  const {
    products,
    loading,
    error,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };
  const priceHandler = (event, newPrice) => {
    event.preventDefault();
    setprice(newPrice);
  };
  useEffect(() => {
    if(error)
    {
      alert.error(error)
      dispatch(cleaerErrors())
    }
    dispatch(getProduct(keyword, currentPage, price, category,rating));
    // console.log(loading);
  }, [dispatch, keyword, currentPage, price, category,rating,alert ,error]);
  let count = filteredProductsCount;
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`ECOMMERCE`}/>

          <h2 className="productsHeading">Products</h2>
          <div className="products">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
          <div className="filterBox">
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              // aria-labelledby="continous-slider"
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={25000}
            ></Slider>
            <Typography>Categories</Typography>
            <ul className="categoryBox">
              {categories.map((category) => (
                <li
                  className="category-link"
                  key={category}
                  onClick={() => setcategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>
            <fieldset>
              <Typography component="legend">Rating Above</Typography>
              <Slider
                value={rating}
                onChange={(e, newRating) => {
                  setrating(newRating);
                }}
                aria-labelledby="continous-slider"
                min={0}
                max={5}
                valueLabelDisplay="auto"
              ></Slider>
            </fieldset>
          </div>

          {resultPerPage < productsCount && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkCLass="prageLinkActive"
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
}

export default Products;

//7:10:21
//Rating filer not working properly need to improve