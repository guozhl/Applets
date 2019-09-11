// components/preview/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    classic: {
      type: Object
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap: function (event) {
      this.triggerEvent('tapping', {
        cid: this.properties.classic.id,
      }, {})
    }
  }
})