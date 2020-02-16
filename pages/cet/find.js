// pages/cet/find.js
var app = getApp()
Page({
  data: {
    needCookie: '',
    needPcookie: '',
    PreInfo: {},
    defaultUid: ''
  },
  onLoad: function() {

    var nowTimestamp = new Date().getTime();
    var stopCanQueryTime = '1582300800000';


    if (nowTimestamp > stopCanQueryTime) {
      wx.showToast({
        title: '已超过准考证查询时间,可能查询不到',
        icon: 'none',
        duration: 10000
      })
      return;
    }

    var that = this;
    var uid = wx.getStorageSync('uid');
    that.setData({
      defaultUid: uid
    })
    this.getVcode();
  },
  submitInfo: function(e) {
    wx.showToast({
      title: "查询中...",
      icon: "loading",
      duration: 10000
    })
    var that = this;
    var uid = e.detail.value.username;
    var idcard = e.detail.value.idcard;
    var name = e.detail.value.name;
    var vcode = e.detail.value.vcode;
    if ((uid.length == 0 || idcard.length != 18) || (vcode.length != 4 || name.length == 0)) {
      wx.showToast({
        title: '输入有误',
        image: '/images/info.png',
        icon: 'none',
        duration: 1000
      });
    } else {
      wx.request({
        url: app.globalData.apiURL + '/CET/findCETNO.php',
        method: "POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        data: {
          uid: uid,
          idcard: idcard,
          name: name,
          cookie: that.data.PreInfo.cookie,
          vcode: vcode,
          pcookie: that.data.PreInfo.pcookie,
        },
        success: function(res) {
          console.log(res.data)
          wx.hideToast()
          // console.log(res.data);
          try {
            if (res.data[0].TestTicket.length == 15) {
              var modalText = res.data[0].SubjectName + '：' + res.data[0].TestTicket;
              if (res.data.length > 1) {
                modalText = res.data[0].SubjectName + '：' + res.data[0].TestTicket + '\r\n' + res.data[1].SubjectName + '：' + res.data[1].TestTicket
              }
              wx.showModal({
                title: '查询成功',
                content: modalText,
                showCancel: false,
                confirmText: '复制',
                success(ress) {
                  if (ress.confirm) {
                    wx.setClipboardData({
                      data: modalText,
                      success(ress) {
                        wx.showToast({
                          icon: 'success',
                          title: '已复制到粘贴板',
                        })
                      }
                    })
                  }
                }
              })
            }
          } catch (error) {
            wx.showToast({
              icon: 'none',
              title: res.data.desc,
            })
          }
        },
        complete: function() {
          that.getVcode();
        }
      })
    }
  },
  getVcode: function() {
    var that = this;
    wx.request({
      url: app.globalData.apiURL + '/CET/getVcode.php',
      success: function(res) {
        // console.log(res.data);
        that.setData({
          PreInfo: res.data,
        })
      }
    });
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function(res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
    }
    return {
      title: '忘记四六级准考证号？来小盒子查查看',
      path: 'pages/cet/find',
      imageUrl: 'https://z4a.net/images/2020/02/13/cetfind.jpg',
      success: function(res) {
        // 转发成功
      },
      fail: function(res) {
        // 转发失败
      }
    }
  },
})