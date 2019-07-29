//获取应用实例
var app = getApp();
Page({
  data: {
    uid: '',
    pwd: '',
    nickName: '',
    remind: '加载中',
    isLoading: true,
    _days: ['一', '二', '三', '四', '五', '六', '日'],
    activeClass: '',
    activeClassItem: 0,
    whichDayOfWeek: '',
    scroll: {
      left: 0 //判断今天是不周末，是的话滚一下
    },
    classJson: '',
    targetLessons: [],
    targetX: 0, //target x轴top距离
    targetY: 0, //target y轴left距离
    targetDay: 0, //target day
    targetWid: 0, //target wid
    targetI: 0, //target 第几个active
    targetLen: 0, //target 课程长度
    blur: false,
    is_vacation: false, // 是否为假期
  },
  onLoad: function(options) {
    var that = this;
    that.setInfo();
    if (options.isShareFrom != 'null') {
      if (options.uid != '' || options.pwd != '') {
        that.getTable(options.uid, options.pwd, false);
      }
    } else {
      var uid = wx.getStorageSync('uid');
      var pwd = wx.getStorageSync('newpwd');
      console.log(pwd)
      that.setData({
        uid: uid,
        pwd: pwd,
      })
      that.getTable(that.data.uid, that.data.pwd, true);
    }
    // 获取用户昵称，查看是否授权
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success(res) {
              console.log(res.userInfo)
              that.setData({
                nickName: res.userInfo.nickName
              })
            }
          })
        }
      }
    })
  },
  bindGetUserInfo(e) {
    console.log(e.detail.userInfo)
  },
  setInfo: function() {
    var that = this;
    const whichDayOfWeek = new Date().getDay();
    const arr = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'staturday'];
    that.setData({
      whichDayOfWeek: arr[whichDayOfWeek],
    })
  },
  getTable: function(uid, pwd, showCookieClass) {
    var that = this;
    wx.request({
      url: app.globalData.apiURL + '/classTable/personalTable.php?uid=' + uid + '&pwd=' + pwd,
      success: function(res) {
        that.setData({
          classJson: res.data,
          isLoading: false
        })
        console.log(res.data);
        if (res.data.status == 200) {
          wx.setStorageSync('personalClass', res.data);
        }
        if (res.data.status == 403) {
          wx.navigateTo({
            url: '/pages/error/queryerror?ErrorTips=' + "学号密码不对，请重新登录",
          })
        }
        if (res.data.status == 500) {
          var personalClass = wx.getStorageSync('personalClass');
          if (personalClass != "" && showCookieClass == true) {
            that.setData({
              classJson: personalClass,
              isLoading: false
            })
            wx.showToast({
              title: '教务无法访问，当前展示离线缓存课表',
              icon: 'none',
              duration: 2000
            })
          } else {
            wx.navigateTo({
              url: '/pages/error/queryerror?ErrorTips=' + "换了新教务系统，暂无课表",
            })
          }
        }
      }
    })
  },
  changeActiveItem: function(e) {
    var that = this;
    // console.log(e);
    that.setData({
      activeClassItem: e.currentTarget.dataset.num,
    })
  },
  onShow: function() {
    var _this = this;

  },
  onReady: function() {
    var that = this;
  },
  showDetail: function(e) {
    console.log(e)
    // 点击课程卡片后执行
    var that = this;
    that.setData({
      targetX: e.detail.x,
      targetY: e.detail.y,
      targetDay: 1,
      targetWid: 2,
      targetI: 1,
      blur: true,
      activeClass: e.currentTarget.dataset
    });
  },
  goClassPlace: function(ep) {
    console.log(ep.target.dataset.place);
    var placeArr = ["1教学楼", "2教学楼", "3教学楼", "4教学楼", "5教学楼", "6教学楼", "7教学楼", "8教学楼", "9教学楼", "10教学楼", "11教学楼", "12教学楼", "理工馆", "社科馆"];
    var markerIdArr = [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 5, 4];
    var result = placeArr.indexOf(ep.target.dataset.place.slice(0, -3));
    // console.log(result);
    wx.navigateTo({
      url: '/pages/schoolNav/schoolNav?markerId=' + markerIdArr[result],
    })
  },
  hideDetail: function() {
    var that = this;
    // 点击遮罩层时触发，取消主体部分的模糊，清空target
    that.setData({
      blur: false,
      targetLessons: [],
      targetX: 0,
      targetY: 0,
      targetDay: 0,
      targetWid: 0,
      targetI: 0,
      targetLen: 0,
      activeClassItem: 0,
    });
  },
  catchMoveDetail: function() { /*阻止滑动穿透*/ },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function(res) {
    var that = this;
    // console.log(res);
    return {
      title: that.data.nickName + '的个人课表',
      path: 'pages/classQuery/index?isShareFrom=true&uid=' + that.data.uid + '&pwd=' + that.data.pwd,
    }
  },
});