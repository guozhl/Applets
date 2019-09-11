import {
  AlbumModel
} from '../../models/album.js'

const albumModel = new AlbumModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    comments: [], // 评论数组
    songs: [], // 专辑歌曲列表
    posting: false, // 是否评论
    aid: '', // 专辑id相关
    amid: '', // 专辑id相关
    albumTitle: '', // 专辑名称
    albumSinger: '', // 专辑歌手
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading()
    // 获取参数
    this.setData({
      aid: options.aid,
      amid: options.amid,
      imgUrl: options.imgUrl
    })
    // 请求数据
    const detailData = {
      "-": "albumSonglist9492807910369534",
      "g_tk": 5381,
      "loginUin": 0,
      "hostUin": 0,
      "format": "json",
      "inCharset": "utf8",
      "outCharset": "utf - 8",
      "notice": 0,
      "platform": "yqq.json",
      "needNewCode": 0,
      "data": {
        "comm": {
          "ct": 24,
          "cv": 10000
        },
        "albumSonglist": {
          "method": "GetAlbumSongList",
          "param": {
            "albumMid": this.data.amid,
            "albumID": 0,
            "begin": 0,
            "num": 10,
            "order": 2
          },
          "module": "music.musichallAlbum.AlbumSongList"
        }
      }
    }
    const detail = albumModel.getDetail(detailData) // 获取专辑歌曲列表
    const commentData = {
      "g_tk": 5381,
      "loginUin": 0,
      "hostUin": 0,
      "format": "json",
      "inCharset": "utf8",
      "outCharset": "GB2312",
      "notice": 0,
      "platform": "yqq.json",
      "needNewCode": 0,
      "cid": 205360772,
      "reqtype": 2,
      "biztype": 2,
      "topid": this.data.aid,
      "cmd": 8,
      "needmusiccrit": 0,
      "pagenum": 0,
      "pagesize": 25,
      "lasthotcommentid": "",
      "domain": "qq.com",
      "ct": 24,
      "cv": "10101010"
    }
    const comments = albumModel.getComments(commentData) // 获取评论列表

    Promise.all([detail, comments])
      .then(res => {
        if (res.length !== 0) {
          this.setData({
            songs: res[0].albumSonglist.data.songList,
            comments: res[1].comment.commentlist,
            albumTitle: res[1].topic_name,
            albumSinger: "周笔畅"
          })
        }
        wx.hideLoading()
      })
  },

  // 点击评论，弹出评论框
  onFakePost(event) {
    this.setData({
      posting: true
    })
  },

  // 取消评论
  onCancel(event) {
    this.setData({
      posting: false
    })
  },

  // 提交评论
  onPost(event) {
    let comment = event.detail.value
    if (!comment) {
      return
    }

    if (comment.length > 300) {
      wx.showToast({
        title: '评论最多50个字',
        icon: 'none'
      })
      return
    }

    // let data = {
    //   "g_tk": 5381,
    //   "loginUin": "1152921504955310858",
    //   "hostUin": 0,
    //   "format": "json",
    //   "inCharset": "utf8",
    //   "outCharset": "GB2312",
    //   "notice": 0,
    //   "platform": "yqq.json",
    //   "needNewCode": 0,
    //   "cid": 205360772,
    //   "cmd": 1,
    //   "reqtype": 2,
    //   "biztype": 2,
    //   "topid": this.data.aid,
    //   "domain": "qq.com",
    //   "content": comment,
    //   "score": 0,
    //   "ct": 24,
    //   "cv": "10101010"
    // }

    // albumModel.postComments(data).then(res => {
    //   console.log(res)
    // })


    wx.showToast({
      title: comment,
      icon: 'none'
    })
    event.detail.value = ''
    this.setData({
      posting: false
    })
  }
})