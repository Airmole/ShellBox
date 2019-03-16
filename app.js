const openIdUrl = require('./config').openIdUrl

App({
  globalData: {
    apiURL:"https://api.airmole.cn/ShellBox",
    doubanApi:"https://airmole.cn/doubanapi/v2",
    hasLogin: false,
    openid: null,
    building: '',
    roomNo: '',
    uid: '',
    pwd: ''
  },
  util: require('./utils/util'),
  onLaunch: function() {
    // console.log('App Launch')
    this.getUserOpenId();
  },
  onShow: function() {
    // console.log('App Show')
  },
  onHide: function() {
    // console.log('App Hide')
  },
  // lazy loading openid
  getUserOpenId: function(callback) {
    var self = this
    if (self.globalData.openid) {
      callback(null, self.globalData.openid)
    } else {
      wx.login({
        success: function(data) {
          wx.request({
            url: 'https://api.airmole.cn/code2id.php?',
            data: {
              code: data.code
            },
            success: function(res) {
              console.log('拉取openid成功', res.data.openid)
              self.globalData.openid = res.data.openid
            },
            fail: function(res) {
              console.log('拉取用户openid失败，将无法正常使用开放接口等服务', res)
            }
          })
        },
        fail: function(err) {
          console.log('wx.login 接口调用失败，将无法正常使用开放接口等服务', err)
        }
      })
    }
  }
})