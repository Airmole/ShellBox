// pages/classQuery/showJskb.js
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
    timeRow: [{
        l1: '第一小节',
        l2: '第二小节',
        t1: '8:00-8:45',
        t2: '8:50-9:35'
      },
      {
        l1: '第三小节',
        l2: '第四小节',
        t1: '9:55-10:40',
        t2: '10:45-11:30'
      },
      {
        l1: '第五小节',
        l2: '第六小节',
        t1: '13:10-13:55',
        t2: '14:00-14:45'
      },
      {
        l1: '第七小节',
        l2: '第八小节',
        t1: '15:00-15:45',
        t2: '15:50-16:35'
      },
      {
        l1: '第九小节',
        l2: '第十小节',
        t1: '16:50-17:35',
        t2: '17:40-18:25'
      },
    ],
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

    var uid = wx.getStorageSync('uid');
    var pwd = wx.getStorageSync('newpwd');
    var keyword = options.teacherName;
    var that = this;
    console.log(options)
    that.setData({
      uid: uid,
      pwd: pwd,
    })
    that.getTable(uid, pwd, keyword);
  },
  bindGetUserInfo(e) {
    console.log(e.detail.userInfo)
  },
  getTable: function(uid, pwd, keyword) {
    var that = this;
    var classJsonArr = [];
    wx.request({
      url: app.globalData.apiURL + '/v4/teacherTable/teacherTable.php',
      // url: 'http://localhost/teacherTable.php',
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      data: {
        username: uid,
        password: pwd,
        keyword: keyword
      },
      success: function(res) {
        console.log(res.data)
        wx.setNavigationBarTitle({
          title: res.data[0].teacherName + '老师的课表'
        })
        that.setData({
          classJson: res.data[0],
          isLoading: false,
          classJsonArr: classJsonArr
        })
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
    var placeArr = ["1教", "2教", "3教", "4教", "5教", "6教", "7教", "8教", "9教", "10教", "11教", "12教", "理工馆", "社科馆"];
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
  // onShareAppMessage: function(res) {
  //   var that = this;
  //   // console.log(res);
  //   return {
  //     title: that.data.nickName + '老师的教师课表',
  //     path: 'pages/classQuery/index?isShareFrom=true&uid=' + that.data.uid + '&pwd=' + that.data.pwd,
  //   }
  // },

});