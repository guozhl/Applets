import {
  ClassicModel
} from '../../models/classic.js'

const classicModel = new ClassicModel()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    classicData: null, // 歌曲信息
    latest: true, // 是否是最前
    first: false, // 是否是最后
    likeStatus: false, // 喜欢的状态
    likeCount: 0 // 喜欢的数量
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 获取第一首歌曲
    classicModel.getSongList(0, res => {
      this.setData({
        classicData: res,
        latest: classicModel.isLatest(res.index),
        first: classicModel.isFirst(res.index)
      })
    })
  },

  // 点击喜欢
  onLike: function(event) {
    // console.log(this.data.classicData.fav_nums)
  },

  // 点击左切换
  onNext: function(e) {
    this._updateClassic('next')
  },

  // 点击右切换
  onPrevious: function(e) {
    this._updateClassic('previous')
  },

  // 切换
  _updateClassic: function(nextOrPrevious) {
    const index = this.data.classicData.index
    classicModel.getClassic(index, nextOrPrevious, (res) => {
      this.setData({
        classicData: res,
        latest: classicModel.isLatest(res.index),
        first: classicModel.isFirst(res.index)
      })
    })
  },
})