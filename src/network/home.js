import { request } from './request'
// 二次封装
export function getHomeMutidata(){
  return request({
    url:"/home/multidata"
  })
}