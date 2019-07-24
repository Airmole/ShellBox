const openIdUrl = require('./config').openIdUrl

App({
  globalData: {
    apiURL: "https://api.airmole.cn/ShellBox",
    doubanApi: "https://airmole.cn/doubanapi/v2",
    hasLogin: false,
    openid: null,
    building: '',
    roomNo: '',
    uid: '',
    pwd: '',
    newpwd: ''
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
  },
  appUpdate: function() {
    const updateManager = wx.getUpdateManager()

    updateManager.onCheckForUpdate(function(res) {
      // 请求完新版本信息的回调
      console.log(res.hasUpdate)
    })

    updateManager.onUpdateReady(function() {
      wx.showModal({
        title: '小盒子求更新',
        content: "小盒子有版本功能更新啦，建议各位小可爱重启应用体验新版本(●'◡'●)",
        success: function(res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })
    })

    updateManager.onUpdateFailed(function() {
      // 新版本下载失败
      wx.showToast({
        title: '嘤嘤嘤更新失败了。可能网络不好',
        duration: 1000
      });
    })
  }
})