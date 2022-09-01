
// pages/index/component/tips.js
Component({
  options: {
    styleIsolation: 'shared'
  },
  /**
   * 组件的属性列表
   */
  properties: {
    hideBtnText: {
      type: String,
      value: '好的'
    },
    image: {
      type: String,
      value: ''
    },
    height: {
      type: Number,
      value: 550
    },
    width: {
      type: Number,
      value: 375
    },
    showModal: {
      type: Boolean,
      value: false
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
    _hideModal: function() {
      this.setData({ showModal: false })
    },
    _previewImage:function (e) {
      wx.previewImage({ urls: e.currentTarget.dataset.allurl, current: e.currentTarget.dataset.url })
    },
  }
})
