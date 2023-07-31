import { ADD_TO_CART,REMOVE_CART_ITEM, SAVE_SHIPPING_INFO } from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [] ,shippingInfo:{}}, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const item = action.payload
      console.log(item)
      
      const isItemExist = state.cartItems.find(

        i => i.name === item.name
      
      );
      console.log(isItemExist)
      if (isItemExist) {
        return {
          ...state,
          cartItems: state.cartItems.map((i) =>
            i.name === isItemExist.name ? item : i
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
      case REMOVE_CART_ITEM:
        return{
          ...state,
          cartItems:state.cartItems.filter((i)=>i.id !== action.payload)
        }
        case SAVE_SHIPPING_INFO:
          return {
            ...state,
            shippingInfo: action.payload,
          }
          
    default:
     return state;
  }
};
