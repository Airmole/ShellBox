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
    contractName: '《用户隐私保护指引》'
  },
  lifetimes: {
    attached: function () {
      if (wx.getPrivacySetting) {
        wx.getPrivacySetting({
          success: res => {
            console.log("是否需要授权：", res.needAuthorization, "隐私协议的名称为：", res.privacyContractName)
            this.setData({ contractName: res.privacyContractName })
            if (res.needAuthorization) {
              this.popUp()
            } else {
              this.triggerEvent("agree")
            }
          },
          fail: () => { },
          complete: () => { },
        })
      } else {
        // 低版本基础库不支持 wx.getPrivacySetting 接口，隐私接口可以直接调用
        this.triggerEvent("agree")
      }
    },
  },
  /**
   * 组件的方法列表
   */
  methods: {
    handleDisagree(e) {
      this.triggerEvent("disagree")
      this.disPopUp()
    },
    handleAgree(e) {
      this.triggerEvent("agree")
      this.disPopUp()
    },
    popUp() {
      this.setData({ innerShow: true })
    },
    disPopUp() {
      this.setData({ innerShow: false })
    },
    openPrivacyContract() {
      wx.openPrivacyContract()
    }
  }
})
