Component({
  /**
   * 喜欢组件
   * 组件的属性列表
   */
  properties: {
    like: {
      type: Boolean
    },
    count: {
      type: Number
    }
  },

  observers: {
    'count': function(e) {
      this.setData({
        countShow: e > 999 ? '999+' : e
      })
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    yesSrc: '../images/like.png',
    noSrc: '../images/like@dis.png',
    countShow: ''
  },

  ready: function() {
    this.setData({
      countShow: this.properties.count
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLike: function(e) {
      let like = this.properties.like
      let count = this.properties.count
      count = like ? count - 1 : count + 1
      this.setData({
        count: count,
        countShow: count > 999 ? '999+' : count,
        like: !like
      })

      let behavior = this.properties.like ? 'like' : 'cancel'
      this.triggerEvent('like', {
        behavior: behavior
      }, {})
    }
  },
})