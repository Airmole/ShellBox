//index.js
//获取应用实例
var app = getApp()
var timeUtil = require('../../utils/util.js')
Page({
  data: {
    weekArray: ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"],
    searchType: '02',
    radioItems: [
      { name: '书名', value: '02', checked: true },
      { name: '作者', value: '03' },
      { name: '主题', value: '04' },
      { name: '出版社', value: '09' }
    ],
    keyword: '',
    isLoading: true,
    hasLogin: false,
    isTeacher: false,
    edusysUserInfo: {},
    hasCourseCache: false,
    todayCourseCard: false,
    lessons: [],
    nextCourseArray: [],
    calendar: '',
    elesysData: false,
    hasBindElesys: false,
    netsysData: false,
    hasBindNetsys: false
  },
  onLoad: function () {
    this.inital();
    this.getCalendar();
  },
  onShow: function () {
    this.inital();
  },
  inital: function () {
    // console.log(app.globalData)
    var hasLogin = false;
    var isTeacher = false;
    var todayCourseCard = false;
    var edusysUserInfo = app.globalData.edusysUserInfo;
    var hasCourseCache = false;
    var todayCourses = [];
    var nextCourseArray = [];
    var myCourse = wx.getStorageSync('myCourse')
    if (myCourse != '' && Object.keys(myCourse).length > 0) {
      hasCourseCache = true
    }

    if (app.globalData.hasEdusysStorage === true) {
      hasLogin = true;
    } else {
      var edusysUserInfoCache = wx.getStorageSync('edusysUserInfo')
      try {
        if (edusysUserInfo.uid.length > 0) {
          app.globalData.hasEdusysStorage = true;
          hasLogin = true;
        }
      } catch (error) {
        hasLogin = false;
      }
    }

    try {
      isTeacher = edusysUserInfo.uid.length < 8 ? true : false
    } catch (error) {
      isTeacher = false
    }

    if (hasCourseCache) {
      var date = new Date();
      var dayOfWeek = date.getDay();
      const weekArray = this.data.weekArray;
      var todayCourse = myCourse[weekArray[dayOfWeek]];

      for (let i in todayCourse) {
        if (todayCourse[i].length > 1) {
          for (let j in todayCourse[i]) {
            todayCourses.push(todayCourse[i][j]);
          }
        } else {
          todayCourses.push(todayCourse[i]);
        }
      }
      let nowMintues = date.getMinutes();
      if (nowMintues < 10) {
        nowMintues = "0" + nowMintues;
      }
      var nowTime = date.getHours() + ':' + nowMintues;
      for (let i = 0; i < todayCourses.length; i++) {
        if (todayCourses[i]['courseName'] != '') {
          if (timeUtil.CompareDate(nowTime, todayCourses[i]['startTime'])) {
            nextCourseArray = todayCourses[i];
            break;
          }
        }
      }
      if (nextCourseArray.length == 0) {
        todayCourseCard = true;
      }
    }

    this.setData({
      isTeacher: isTeacher,
      edusysUserInfo: edusysUserInfo,
      hasLogin: hasLogin,
      hasCourseCache: hasCourseCache,
      lessons: hasCourseCache ? myCourse : [],
      nextCourseArray: nextCourseArray,
      todayCourses: todayCourses,
      todayCourseCard: todayCourseCard,
      isLoading: false
    })

    // 是否有绑定电费信息？查询电费
    this.getElesysInfo()
    // 是否有绑定校园网信息？查询网费余额
    this.getNetsysInfo()

    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
  },
  getElesysInfo: function () {
    try {
      const elesysUserInfo = wx.getStorageSync('elesysUserInfo')
      app.globalData.elesysUserInfo = elesysUserInfo.building.length > 0 ? elesysUserInfo : ''
      this.getEleData(elesysUserInfo.building, elesysUserInfo.room)
    } catch (error) {
      this.setData({ elesysData: false, hasBindElesys: false })
    }
  },
  getNetsysInfo: function () {
    try {
      const netsysUserInfo = wx.getStorageSync('netsysUserInfo')
      app.globalData.netsysUserInfo = netsysUserInfo.netid.length > 0 ? netsysUserInfo : ''
      this.getNetData(netsysUserInfo.netid, netsysUserInfo.password, 'account')
    } catch (error) {
      this.setData({ netsysData: false, hasBindNetsys: false })
    }
  },
  getNetData: function (netid = '', password = '', getDataBy = 'account') {
    var _this = this
    const postdata = { uid: app.globalData.edusysUserInfo.uid, userid: netid, password: password }

    wx.request({
      url: `${app.globalData.domain}/netsys/profile`,
      data: postdata,
      timeout: app.globalData.requestTimeout,
      method: 'POST',
      success: function(res){
        try {
          if (res.data.welcome.length > 1) {
            res.data.timeText = timeUtil.formatDateTime(new Date(), true)
            res.data.netid = netid
            _this.setData({ netsysData: res.data ,hasBindNetsys: true })
            app.globalData.netsysUserInfo = res.data
          }
        } catch (error) {
          _this.setData({ hasBindNetsys: true, netsysData: false })
        }
      }
    })
  },
  // 获取电费数据
  getEleData: function(building, room) {
    var _this = this
    wx.request({
      url: `${app.globalData.domain}/elesys/`,
      data:{ building: building, room: room },
      timeout: app.globalData.requestTimeout,
      method: 'GET',
      success: function(res){
        try {
          if (res.data.balance.length > 0) {
            res.data.building = building
            res.data.room = room
            res.data.time = timeUtil.formatDateTime(new Date(), true)
            _this.setData({ hasBindElesys: true, elesysData: res.data })
          }
        } catch (error) {
          _this.setData({ hasBindElesys: true, elesysData: false })
        }
      }
    })
  },
  showTodayCourseCard: function () {
    this.setData({ todayCourseCard: true })
  },
  hideTodayCourseCard: function () {
    this.setData({ todayCourseCard: false })
  },
  goLogin: function () {
    wx.navigateTo({ url: '../index/login' })
  },
  radioChange: function (e) {
    this.setData({ searchType: e.detail.value })
    var radioItems = this.data.radioItems;
    for (var i = 0, len = radioItems.length; i < len; ++i) {
      radioItems[i].checked = radioItems[i].value == e.detail.value;
    }
    this.setData({
      radioItems: radioItems,
    });
  },
  keywordInput: function (e) {
    this.setData({
      keyword: e.detail.value
    });
  },
  searchBook: function () {
    const searchType = this.data.searchType;
    const keyword = this.data.keyword;
    // console.log(searchType, keyword);
    if(keyword.length == 0){
      wx.showToast({ title: '请输入检索关键字', icon: 'none' });
      return;
    }
    wx.showLoading({ title: '在找了在找了...' });
    wx.request({
      url: `${app.globalData.domain}/book/search`,
      data: {type: searchType, keyword: keyword},
      method: 'GET',
      success: function (res) {
        wx.hideLoading()
        if (res.data.total == '图书馆系统无响应') {
          wx.showToast({ title: '图书馆OPAC系统无响应', icon: 'none' })
        } else if (res.data.total == 0) {
          wx.showToast({ title: '图书馆暂无此书', icon: 'none' })
        } else {
          wx.navigateTo({ url: `../books/index?type=${searchType}&keyword=${keyword}` })
        }
      }
    })
  },
  getCalendar: function () {
    var _this = this
    wx.request({
      url: `${app.globalData.domain}/edu/calendar`,
      timeout: app.globalData.requestTimeout,
      success: function (res) {
        _this.setData({ calendar: res.data })
        wx.vibrateShort({ type: 'medium' })
      }
    })
  },
  onShareAppMessage: function (res) {
    return {
      title: '贝壳小盒子',
      path: 'pages/index/index',
    }
  },
  goToBookSearchPage: function () {
    wx.navigateTo({ url: '../books/search' })
  }
})
