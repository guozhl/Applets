import {
  HTTP
} from '../util/http.js'

class MyModel extends HTTP {
  getMyBookCount(data) {
    return this.request({
      url: 'https://c.y.qq.com/mv/fcgi-bin/fcg_singer_mv.fcg',
      data: data
    })
  }
}

export {
  MyModel
}