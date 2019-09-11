import {
  config
} from '../config.js'

class ClassicModel {
  // 获取期刊音乐
  getSongList(index, callback) {
    const res = config.songList[index]
    callback(res)
    this._setLatestIndex(res.index) // 最新一期写到缓存中
    let key = this._getKey(res.index)
    wx.setStorageSync(key, res) // key-value写到缓存中
  }

  // 左右切换每日推送
  getClassic(index, nextOrPrevious, callback) {
    // 获取要切换的key
    let key = nextOrPrevious == 'next' ? this._getKey(index - 1) : this._getKey(index + 1)
    // 从缓存中找key
    let classic = wx.getStorageSync(key)
    if (!classic) { // 缓存中没有，请求
      let res = {}
      if (nextOrPrevious == 'next') {
        res = config.songList[index - 2]
      } else {
        res = config.songList[index]
      }
      callback(res)
    } else { // 缓存中有，取缓存中的
      callback(classic)
    }
  }

  // 是否是第一期
  isFirst(index) {
    return index == 10 ? true : false
  }

  // 是否是最新一期
  isLatest(index) {
    return index == 1 ? true : false
  }

  _setLatestIndex(index) {
    wx.setStorageSync('latest', index)
  }

  _getLatestIndex() {
    let index = wx.getStorageSync('latest')
    return index
  }

  _getKey(index) {
    let key = 'classic-' + index
    return key
  }
}

export {
  ClassicModel
}