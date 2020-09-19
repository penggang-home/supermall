import { request } from './request'
// 二次封装
export function getHomeMutidata(){
  return request({
    url:"/home/multidata"
  })
}


export function getHomeGoods(type,page){
  return request({
    url:"/home/data",
    params:{
      type,
      page
    }
  })
}