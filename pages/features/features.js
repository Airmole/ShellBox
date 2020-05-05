// pages/features/features.js
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    uid: '',
    pwd: '',
    cores: [
      [{
          id: 'grkb',
          name: '个人课表',
          url: '/pages/index/vcode?to=grkb&update=0',
          needLogin: true
        }, {
          id: 'jskb',
          name: '教师课表',
          url: '/pages/classQuery/jskb?type=teacher',
          needLogin: true
        }, {
          id: 'bjkb',
          name: '班级课表',
          url: '/pages/classQuery/jskb?type=class',
          needLogin: true
        },
        {
          id: 'wfcx',
          name: '网费查询',
          url: '/pages/net/netBind',
          needLogin: true
        },
        {
          id: 'xl',
          name: '校历',
          url: '/pages/calendar/calendar',
          needLogin: false
        },
        {
          id: 'jyxx',
          name: '我的借阅',
          url: '/pages/opac/bind',
          needLogin: false
        },
        {
          id: 'smcs',
          name: '扫码查书',
          url: '/pages/bookSearch/isbn/iputIsbn',
          needLogin: false
        },
        {
          id: 'cjcx',
          name: '成绩查询',
          url: '/pages/index/vcode?to=score&update=0',
          needLogin: true
        },
        {
          id: 'dfcx',
          name: '电费查询',
          url: '/pages/electricity/electricityBind',
          needLogin: true
        }, {
          id: 'byzp',
          name: '毕业照',
          url: '/pages/graduatePhoto/sample',
          needLogin: false
        }
      ],
      [{
        id: 'xycx',
        name: '校园出行',
        url: '/pages/Transport/Transport',
        needLogin: false
      },{
        id: 'xydh',
        name: '校园导航',
        url: '/pages/schoolNav/schoolNav',
        needLogin: false
      }, {
        id: 'tel',
        name: '常用电话',
        url: '/pages/tel/tel',
        needLogin: false
      }, {
        id: 'gyhz',
        name: '关于盒子',
        url: '/pages/features/about',
        needLogin: false
      }]
    ],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    var uid = wx.getStorageSync('uid');
    var pwd = wx.getStorageSync('newpwd');
    wx.showToast({
      title: "loading",
      icon: "loading",
      duration: 5000
    })
    if (uid != '' && pwd != '') {
      that.setData({
        uid: uid,
        pwd: pwd,
      });
      // console.log(that.data.uid + '-' + that.data.pwd)
    }
    wx.hideToast()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    var that = this;
    that.onLoad();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function(res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
    }
    return {
      title: '还没用过 “贝壳小盒子”😱还不快来试试？',
      path: '/pages/features/features',
      success: function(res) {
        // 转发成功
      },
      fail: function(res) {
        // 转发失败
      }
    }
  },
  //账户注销登录
  logout: function() {
    try {
      wx.clearStorageSync()
    } catch (e) {
      // Do something when catch error
    }
    app.globalData.uid = "";
    app.globalData.pwd = "";
    app.globalData.newpwd = "";
    wx.setStorageSync('uid', '');
    wx.setStorageSync('pwd', '');
    wx.setStorageSync('newpwd', '');
    wx.setStorageSync('netPassword', '');
    wx.setStorageSync('building', '');
    wx.setStorageSync('roomNo', '');
    wx.redirectTo({
      url: '/pages/index/index'
    })
  },
  //未登录点击功能
  disabled_item: function(ds) {
    var that = this;
    var uid = wx.getStorageSync('uid');
    var pwd = wx.getStorageSync('newpwd');
    console.log(ds.currentTarget.dataset);
    let index = ds.currentTarget.dataset.id;
    let sindex = ds.currentTarget.dataset.sindex;

    if (this.data.cores[0][sindex].needLogin == true && (uid == "" || pwd == "")) {
      wx.showToast({
        icon: 'none',
        title: '本功能需要登录',
      })
    } else {
      // console.log(this.data.cores)
      wx.navigateTo({
        url: this.data.cores[index][sindex].url,
      })
    }

  }

})