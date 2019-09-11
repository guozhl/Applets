import {
  MyModel
} from '../../models/my.js'

import {
  promisic
} from '../../util/common.js'

const myModel = new MyModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    authorized: false, // 是否授权
    userInfo: null, // 用户信息
    mvCount: 0, // mv数量
    mvArr: [], // mv数组
    begin: 0,
    num: 12
  },

  onShow(options) {
    this.userAuthorized()
    this.getMvList(this.data.begin, this.data.num)
  },

  // 获取mv列表
  getMvList(begin, num) {
    let data = {
      "g_tk": "2093112517",
      "loginUin": 0,
      "hostUin": 0,
      "format": "json",
      "inCharset": "utf8",
      "outCharset": "utf - 8",
      "notice": 0,
      "platform": "yqq.json",
      "needNewCode": 0,
      "singermid": "004HlS192u9J5g",
      "order": "listen",
      "begin": begin,
      "num": num,
      "cid": "205360581"
    }
    myModel.getMyBookCount(data)
      .then(res => {
        this.setData({
          mvArr: res.data.list,
          mvCount: res.data.total
        })
      })
  },

  // 授权过以后再进来直接显示头像
  userAuthorized() {
    promisic(wx.getSetting)()
      .then(data => {
        if (data.authSetting['scope.userInfo']) {
          return promisic(wx.getUserInfo)()
        }
        return false
      })
      .then(data => {
        if (!data) return
        this.setData({
          authorized: true,
          userInfo: data.userInfo
        })
      })
  },

  // 微信授权
  onGetUserInfo(event) {
    const userInfo = event.detail.userInfo
    if (userInfo) {
      this.setData({
        userInfo,
        authorized: true
      })
    }
  },

  // 跳到关于我们
  onJumpToAbout(event) {
    wx.navigateTo({
      url: '/pages/about/about',
    })
  },

  // 跳到点击学习
  onStudy(event) {
    // wx.navigateTo({
    //   url: '/pages/course/course',
    // })
  },

  // 跳查看详情
  onJumpToDetail(event) {
    const cid = event.detail.cid

    // wx.navigateTo({
    //   url: `/pages/classic-detail/classic-detail?cid=${cid}&type=${type}`
    // })
  }
})