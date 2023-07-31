import React, { Fragment, useEffect } from "react";
// import {CgMouse} from "react-icons/all"
import "./Home.css";
import Product from "./ProductCard.js"
import MetaData from "../layout/MetaData";
import { cleaerErrors, getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import {useAlert} from "react-alert"

function Home() {
  const alert =useAlert()
  const dispatch = useDispatch();
  const { loading, error, products, productsCount } = useSelector(
    (state) =>(

      
      state.products
      // console.log(state)
      )
    
  );
  useEffect(() => {
    if(error){
      alert.error(error)
      dispatch(cleaerErrors())
    }
    dispatch(getProduct());
  }, [dispatch,error,alert]);
  return (
    <Fragment>
      {
        loading ?<Loader/>:(
        <Fragment>
        <MetaData title="Ecommerce " />
        <div className="banner">
          <p>Welcomer to Ecommerce</p>
          <h1>FIND AMAZING PRODUCTS BELOW </h1>
          <a href="#container">
            <button>
              Scroll
              {/* <CgMouse/> */}
            </button>
          </a>
        </div>
        <h2 className="homeHeading">Featured Products</h2>
        <div className="container" id="container">
  {
      products &&products.map(product=>(
          <Product product={product}/>
      ))
  }
        </div>
      </Fragment>)
      }
    </Fragment>

  );
}

export default Home;

