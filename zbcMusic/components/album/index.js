Component({
  /**
   * 专辑组件
   */
  /**
   * 组件的属性列表
   */
  properties: {
    album: Object  // 专辑对象
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    // 跳转专辑详情
    onTap(event) {
      const aid = this.properties.album.albumID
      const amid = this.properties.album.albumMID
      const imgUrl = this.properties.album.albumPic
      wx.navigateTo({
        url: `/pages/album-detail/album-detail?aid=${aid}&amid=${amid}&imgUrl=${imgUrl}`
      })
    }
  }
})
