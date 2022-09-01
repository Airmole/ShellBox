// pages/index/component/feecard.js
Component({
  options: {
    styleIsolation: 'shared'
  },
  /**
   * 组件的属性列表
   */
  properties: {
    isShow: {
      type: Boolean,
      value: false
    },
    title: {
      type: String,
      value: ''
    },
    titleRight: {
      type: String,
      value: ''
    },
    bindedUrl: {
      type: String,
      value: ''
    },
    unbindUrl: {
      type: String,
      value: ''
    },
    bindedShow: {
      type: Boolean,
      value: false
    },
    unbindShow: {
      type: Boolean,
      value: false
    },
    bindedAccount: {
      type: String,
      value: ''
    },
    timeText: {
      type: String,
      value: ''
    },
    contentTextLeft: {
      type: String,
      value: ''
    },
    contentTextRight: {
      type: String,
      value: ''
    },
    contentValue: {
      type: String,
      value: ''
    },
    unbindTips: {
      type: String,
      value: ''
    },
    unbindButton: {
      type: String,
      value: ''
    },
    unbindTipsShowImage: {
      type: Boolean,
      value: true
    },
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

  }
})
