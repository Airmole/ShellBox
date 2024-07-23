// pages/index/component/privacyPopup/privacyPopup.js
Component({
  options: {
    styleIsolation: 'shared'
  },
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    innerShow: false,
    offline: false,
    innerContent: '...',
    innerButton: '前往 YooHob',
    appId: 'wx3bd461dc5101d8c7',
    path: 'page/index/welcome'
  },
  lifetimes: {
    attached: function () {
      const launchOps = wx.getLaunchOptionsSync()
      const sceneCode = launchOps.scene
      this.setData({ sceneCode: sceneCode })
      this.getInnerContent()
    },
  },
  /**
   * 组件的方法列表
   */
  methods: {
    needShow () {
      const notNeedShowModalScenes = [1010, 1011, 1012, 1013, 1014, 1017, 1019, 1023, 1024, 1025, 1031, 1035, 1037, 1038, 1043, 1058, 1067, 1074, 1082, 1091, 1102]
      if (notNeedShowModalScenes.includes(this.data.sceneCode)) {
        console.log('notNeedShowModalScenes.includes(this.data.sceneCode)', notNeedShowModalScenes.includes(this.data.sceneCode))
        this.setData({ innerShow: false })
      }
      if (!notNeedShowModalScenes.includes(this.data.sceneCode) && this.data.offline) {
        wx.hideTabBar()
        this.setData({ innerShow: true })
      }
    },
    getInnerContent () {
      var _this = this
      wx.request({
        url: 'https://airmole.cn/shellbox.json',
        success (res) {
          _this.setData({
            offline: res.data.offline,
            innerContent: res.data.content,
            button: res.data.button,
            appId: res.data.appId,
            path: res.data.path
          })
          _this.needShow()
        }
      })
    },
    goYooHob () {
      wx.navigateToMiniProgram({
        appId: this.data.appId,
        path: this.data.path
      })
    }
  }
})
