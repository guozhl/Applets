import {
  AlbumModel
} from '../../models/album.js'

const albumModel = new AlbumModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    albums: [], // 专辑数组
    searching: false, // 是否正在搜索
    hasMore: true, // 是否还有更多
    keyword: '', // 搜索关键词
    searchBoxW: 640,  // 搜索框宽度
    scaleX: '',  // 搜索框缩放
    p: 1, // 当前页数
    n: 6 // 每页数量
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getAlbums(this.data.p, this.data.n) // 获取专辑列表
  },

  // 搜索输入框获焦
  onFocus(e) {
    this.setData({
      searching: true,
      searchBoxW: 530,
      scaleX: 'scaleX()'
    })
  },

  // 点击取消搜索
  onCancel(e) {
    this.setData({
      searching: false,
      searchBoxW: 640,
      scaleX: 'scaleX()',
      keyword: ''
    })
    if(this.data.albums.length == 1) {
      this.setData({
        albums: [],
        p: 1,
        n: 6
      })
      this.getAlbums(this.data.p, this.data.n)
    }
  },

  // 点击叉号
  onDelete(e) {
    this.setData({
      keyword: ''
    })
  },

  // 上拉加载更多
  onReachBottom() {
    if (this.data.hasMore) {
      this.setData({
        p: this.data.p + 1,
        n: this.data.n + 6
      })
      this.getAlbums(this.data.p, this.data.n)
    }
  },

  // 获取专辑列表
  getAlbums(p, n) {
    const data = {
      "ct": 24,
      "qqmusic_ver": 1298,
      "remoteplace": "txt.yqq.album",
      "searchid": "77472714629303419",
      "aggr": 0,
      "catZhida": 1,
      "lossless": 0,
      "sem": 10,
      "t": 8,
      "p": p,
      "n": n,
      "w": "周笔畅",
      "g_tk": 5381,
      "loginUin": 0,
      "hostUin": 0,
      "format": "json",
      "inCharset": "utf8",
      "outCharset": "utf - 8",
      "notice": 0,
      "platform": "yqq.json",
      "needNewCode": 0
    }
    albumModel.getAlbumList(data)
      .then(res => {
        if (res.data.album.list.length !== 0) {
          let resAlbums = this.data.albums.concat(res.data.album.list)
          this.setData({
            hasMore: true,
            albums: resAlbums
          })
        } else {
          this.setData({
            hasMore: false
          })
        }
      })
  },

  // 搜索
  onConfirm(event) {
    let q = event.detail.value
    if (q == '') {
      this.setData({
        p: 1,
        n: 6,
        albums: []
      })
      this.getAlbums(this.data.p, this.data.n)
    } else {
      this.setData({
        keyword: q
      })
      const data = {
        "is_xml": 0,
        "key": q,
        "g_tk": "2093112517",
        "loginUin": 0,
        "hostUin": 0,
        "format": "json",
        "inCharset": "utf8",
        "outCharset": "utf - 8",
        "notice": 0,
        "platform": "yqq.json",
        "needNewCode": 0
      }
      albumModel.getAlbumByKey(data).then(res => {
        let resAlbums = res.data.album.itemlist
        for (let i = 0; i < resAlbums.length; i++) {
          if (resAlbums[i].singer == '周笔畅') {
            resAlbums[i].albumPic = resAlbums[i].pic
            resAlbums[i].albumName = resAlbums[i].name
            resAlbums[i].singerName = resAlbums[i].singer
            resAlbums[i].publicTime = '1985-07-26'
            resAlbums[i].albumID = resAlbums[i].id
            resAlbums[i].albumMID = resAlbums[i].mid
            this.setData({
              hasMore: false,
              albums: resAlbums.splice(i, 1)
            })
            return true
          }
        }
        wx.showToast({
          title: '暂无所搜索专辑',
          icon: 'none'
        })
        return false
      })
    }
  },
})