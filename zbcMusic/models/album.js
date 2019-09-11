import {
  HTTP
} from '../util/http.js'

class AlbumModel extends HTTP {
  data = null

  // 获取专辑列表
  getAlbumList(data) {
    return this.request({
      url: 'https://c.y.qq.com/soso/fcgi-bin/client_search_cp',
      data
    })
  }

  // 获取专辑歌曲详情
  getDetail(data) {
    return this.request({
      url: 'https://u.y.qq.com/cgi-bin/musicu.fcg',
      data
    })
  }

  // 根据关键字搜索专辑
  getAlbumByKey(data) {
    return this.request({
      url: 'https://c.y.qq.com/splcloud/fcgi-bin/smartbox_new.fcg',
      data
    })
  }

  // 获取评论列表
  getComments(data) {
    return this.request({
      url: 'https://c.y.qq.com/base/fcgi-bin/fcg_global_comment_h5.fcg',
      data
    })
  }

  postComments(data) {
    return this.request({
      url: 'https://c.y.qq.com/base/fcgi-bin/fcg_global_comment_h5.fcg',
      data
    })
  }
}

export {
  AlbumModel
}