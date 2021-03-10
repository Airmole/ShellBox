//app.js
App({
  globalData: {
    domain: 'https://shellbox.airmole.cn/api',
    // domain: 'http://shellbox.cn/api',
    _amap_key: '66a87160f8db2a9a76431c954b4f52a5',
    openid: '',
    userInfo: {},
    edusysUserInfo: {},
    hasEdusysStorage: false
  },
  onLaunch: function () {
    let launchInfo = wx.getLaunchOptionsSync();
    if(launchInfo.scene != 1145){
      this.getUserOpenId();
      this.appUpdate();
    }
      this.clearOldVersionStorage();
      this.checkHasEdusysStorage();
      this.getStorageEdusysUserInfo();
      this.getUserInfoFromStorage()
      this.getSystemStatusBarInfo();
  },
  clearOldVersionStorage: function () {
    var newBetaInital = wx.getStorageSync('newBetaInital');
    if (newBetaInital === 'true') {
      // console.log('之前老版本的已经删干净了')
      return true;
    } else {
      // console.log('老版本用户，第一次进入新版')
      wx.clearStorage({
        success: (res) => {
          wx.setStorageSync('newBetaInital', 'true');
          // console.log('老版本数据全部清空成功')
        },
      })
    }
  },
  checkHasEdusysStorage: function () {
    const edusysStorage = wx.getStorageSync('edusysUserInfo');
    var self = this;
    try {
      if (edusysStorage.uid.length > 0) {
        self.globalData.hasEdusysStorage = true
      } else {
        self.globalData.hasEdusysStorage = false
      }
    } catch (error) {
      // console.log(error)
      self.globalData.hasEdusysStorage = false
    }
  },
  getUserInfoFromStorage: function () {
    var self = this;
    self.globalData.userInfo = wx.getStorageSync('userInfo');
  },
  getStorageEdusysUserInfo: function () {
    var self = this;
    self.globalData.edusysUserInfo = wx.getStorageSync('edusysUserInfo');
  },
  getSystemStatusBarInfo: function () {
    // 获取系统状态栏信息
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let capsule = wx.getMenuButtonBoundingClientRect();
        if (capsule) {
          this.globalData.Custom = capsule;
          this.globalData.CustomBar = capsule.bottom + capsule.top - e.statusBarHeight;
        } else {
          this.globalData.CustomBar = e.statusBarHeight + 50;
        }
      }
    })
  },
  getUserOpenId: function (callback) {
    var self = this
    var storageOpenid = wx.getStorageSync('openid')
    if (storageOpenid.openid) {
      self.globalData.openid = storageOpenid.openid
      return
    }
    if (self.globalData.openid) {
      callback(null, self.globalData.openid)
    } else {
      wx.login({
        success: function (data) {
          wx.request({
            url: self.globalData.domain + `/wechat/openid?jscode=${data.code}`,
            success: function (res) {
              // console.log('拉取openid成功', res.data)
              wx.setStorage({
                data: res.data,
                key: 'openid',
              })
              self.globalData.openid = res.data.openid
            },
            fail: function (res) {
              console.log('拉取用户openid失败，将无法正常使用开放接口等服务', res)
            }
          })
        },
        fail: function (err) {
          console.log('wx.login 接口调用失败，将无法正常使用开放接口等服务', err)
        }
      })
    }
  },
  appUpdate: function (where) {
    const updateManager = wx.getUpdateManager()
    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      // console.log(res)
      if (where == 'userclick') {
        wx.showToast({
          title: '已是最新版',
          icon: 'none'
        })
      }
    })

    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '小盒子求更新',
        content: "小盒子有版本功能更新啦，建议各位小可爱重启应用体验新版本(●'◡'●)",
        success: function (res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })
    })

    updateManager.onUpdateFailed(function () {
      // 新版本下载失败
      wx.showToast({
        title: '嘤嘤嘤更新失败了。可能网络不好',
        duration: 1000
      });
    })
  }
})