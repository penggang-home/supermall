export default {
  cartLength(state) {
    return state.cartList.length
  },
  cartList(state) {
    console.log(state);
    return state.cartList
  },
}