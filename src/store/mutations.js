export default {
  // 数量加一
  addCounter(state, payload) {
    payload.count++
  },
  // 新增商品
  addToCart(state, payload) {
    payload.checked = true
    state.cartList.push(payload)
  },
  // 商品数量减一
  shopReduce(state,payload){
    state.cartList.find(item => {
      if(item.iid == payload.iid){
        item.count--
      }
    })
  },
  // 商品数量加一
  shopAdd(state,payload){
    state.cartList.find(item => {
      if(item.iid == payload.iid){
        item.count++
      }
    })
  }
}