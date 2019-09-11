import {
  classicBeh
} from '../classic-beh.js'
const mMgr = wx.getBackgroundAudioManager()

Component({
  /**
   * 音乐播放器组件
   */
  /**
   * 组件的属性列表
   */
  behaviors: [classicBeh],
  properties: {
    src: String,
    title: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    playing: false,
    pauseSrc: '../../images/player@pause.png',
    playSrc: '../../images/player@play.png'
  },

  observers: {
    "src": function(newSrc) {
      if (mMgr.src != undefined) {
        mMgr.src = this.properties.src
        mMgr.title = this.properties.title
        this.setData({
          playing: true
        })
      }
    }
  },

  detached: function() {
    mMgr.stop()
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onPlay: function(e) {
      if (!this.data.playing) {
        this.setData({
          playing: true,
        })
        if (mMgr.src == this.properties.src) {
          mMgr.play()
        } else {
          mMgr.src = this.properties.src
        }
        mMgr.title = this.properties.title
      } else {
        this.setData({
          playing: false,
        })
        mMgr.pause()
      }
    }
  }
})