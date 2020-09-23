export default {
  // payload新传入的商品
  addCart(context, payload) {
    return new Promise((resolve) => {
      // 返回符合测试条件的第一个数组元素值，如果没有符合条件的则返回 undefined。
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

      if (oldProduct) {
        // oldProduct.count += 1
        context.commit('addCounter', oldProduct)
        resolve('当前商品数量+1')
      } else {
        // context.state.cartList.push(oldProduct)
        context.commit('addToCart', payload)
        resolve('加入购物车成功')
      }
    })
  },
}