export default {
  // 数量加一
  addCounter(state, payload) {
    payload.count++
  },
  // 新增商品
  addToCart(state, payload) {
    payload.checked = true
    state.cartList.push(payload)
  }
}