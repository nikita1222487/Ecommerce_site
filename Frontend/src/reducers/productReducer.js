import {
  ALL_PRODUCT_FAIL,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_REQUEST,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_SUCCESS,
  CLEAR_ERRORS,
} from "../constants/productConstants";

export const productReducer =
  (state = { product: [] }, action) => {
    switch (action.type) {
      case ALL_PRODUCT_REQUEST:
        return {
          loading: true,
          products: [],
        };
        break;
      case ALL_PRODUCT_SUCCESS:
        return {
          loading: false,
          products: action.payload.products,
          productsCount: action.payload.productsCount,
          resultPerPage:action.payload.resultPerPage,
          filteredProductsCount:action.payload.filteredProductsCount
        };
        break;
      case ALL_PRODUCT_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
        break;
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
        break;

      default:
        return state;
    }
  };



  export const productDetailsReducer =
  (state = { product: {} }, action) => {
    switch (action.type) {
      case PRODUCT_DETAILS_REQUEST:
        return {
          loading: true,
          ...state,
        };
        break;
      case  PRODUCT_DETAILS_SUCCESS:
        return {
          loading: false,
          product: action.payload,

        };
        break;
      case  PRODUCT_DETAILS_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
        break;
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
        break;

      default:
        return state;
    }
  };


  //6:52:45