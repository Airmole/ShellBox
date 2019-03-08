//获取应用实例
var app = getApp();
Page({
  data: {
    uid: '',
    pwd: '',
    remind: '加载中',
    _days: ['一', '二', '三', '四', '五', '六', '日'],
    activeClass: '',
    whichDayOfWeek: '',
    mondayClass: '',
    tuesdayClass: '',
    wednesdayClass: '',
    thursdayClass: '',
    fridayClass: '',
    staturdayClass: '',
    sundayClass: '',
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
    var uid = wx.getStorageSync('uid');
    var pwd = wx.getStorageSync('pwd');
    const whichDayOfWeek = new Date().getDay();
    const arr = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'staturday', 'sunday'];
    that.setData({
      whichDayOfWeek: arr[whichDayOfWeek - 1],
      uid: uid,
      pwd: pwd,
    })

    wx.request({
      url: 'https://airmole.cn/test/classTable.php?uid=' + uid + '&pwd=' + pwd,
      success: function(res) {
        that.setData({
          classJson: res.data,
        })
        console.log(res.data);
      }
    })
  },
  onShow: function() {
    var _this = this;

  },
  onReady: function() {

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
      targetLen: 0
    });
  },
  catchMoveDetail: function() { /*阻止滑动穿透*/ },
});