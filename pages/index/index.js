//index.js
//获取应用实例
var app = getApp()
var timeJs = require('../../utils/util.js');
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    weekArray: ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"],
    isLoading: true,
    hasLogin: false,
    isTeacher: false,
    edusysUserInfo: {},
    hasCourseCache: false,
    todayCourseCard: false,
    lessons: [],
    nextCourseArray: []
  },
  onLoad: function () {
    this.inital();
  },
  onShow: function() {
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
    var myCourse = wx.getStorageSync('myCourse');
    if (myCourse != '' && myCourse.length != 0) {
      hasCourseCache = true;
    }

    if (app.globalData.hasEdusysStorage === true) {
      hasLogin = true;
    } else {
      var edusysUserInfoCache = wx.getStorageSync('edusysUserInfo')
      try {
        if(edusysUserInfo.uid.length>0){
          app.globalData.hasEdusysStorage = true;
          hasLogin = true;
        }
      } catch (error) {
        hasLogin = false;
      }
    }

    try {
      if (edusysUserInfo.uid.length > 0 && edusysUserInfo.uid.length < 8) {
        isTeacher = true;
      }
    } catch (error) {
      isTeacher = false;
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
      // var nowTime = '13:00';
      for (let i = 0; i < todayCourses.length; i++) {
        if (todayCourses[i]['courseName'] != '') {
          if (timeJs.CompareDate(nowTime, todayCourses[i]['startTime'])) {
            nextCourseArray = todayCourses[i];
            break;
          }
        }
      }
      if(nextCourseArray.length == 0){
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
  },
  showTodayCourseCard: function () {
    this.setData({ todayCourseCard: true });
  },
  hideTodayCourseCard: function () {
    this.setData({ todayCourseCard: false });
  },
  goLogin: function() {
    wx.navigateTo({
      url: '../index/login',
    })
  },
  learnMore: function () {
    wx.navigateTo({ url: '../school/aboutus' });
  }
})
