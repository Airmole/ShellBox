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
    praise: '',
    canShake: false,
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
    hasBindElesys: true,
    netsysData: false,
    hasBindNetsys: false,
    ecardData: false,
    hasBindEcard: true
  },
  onLoad: function () {
    this.inital();
    this.getCalendar()
    this.getPraise()
  },
  onShow: function () {
    this.inital()
    var _this = this
    // 手机摇一摇随机更换夸夸语录
    this.setData({ canShake: true })
    wx.onAccelerometerChange(function (e) {
      if (!_this.data.canShake) {
        return
      }
      // console.log(e)
      if (e.x * e.y > 0.58 ) {
        wx.vibrateShort({ type: 'heavy' })
        _this.getPraise()
      }
    })
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
    var myCourse = wx.getStorageSync('myCourse') || {}
    var isGraduateStu = false
    if (myCourse != '' && Object.keys(myCourse).length > 0) {
      hasCourseCache = true
    }

    if (app.globalData.hasEdusysStorage === true) {
      hasLogin = true;
    } else {
      try {
        if (edusysUserInfo.uid.length > 0) {
          app.globalData.hasEdusysStorage = true
          hasLogin = true
          if (edusysUserInfo.uid.indexOf('17') >= 0) {
            isGraduateStu = true
          }
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
      isLoading: false,
      isGraduateStu: isGraduateStu
    })

    // 是否有绑定电费信息？查询电费
    this.getElesysInfo()
    // 是否有绑定一卡通信息？查询一卡通余额
    this.getEcardInfo()
    // 是否有绑定校园网信息？查询网费余额
    this.getNetsysInfo()

    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
  },
  getPraise: function() {
    var _this = this
    wx.request({
      url: `${app.globalData.domain}/praise`,
      timeout: app.globalData.requestTimeout,
      method: 'GET',
      success: function(res){
        try {
          if (res.statusCode == 200) {
            _this.setData({ praise: res.data.praise })
          }
        } catch (error) {
          console.log('获取夸夸语录', error)
        }
      }
    })
  },
  getElesysInfo: function () {
    try {
      let elesysUserInfo = wx.getStorageSync('elesysUserInfo') || {}
      app.globalData.elesysUserInfo = elesysUserInfo.building.length > 0 ? elesysUserInfo : ''
      this.getEleData(elesysUserInfo.building, elesysUserInfo.room)
    } catch (error) {
      this.setData({ elesysData: false, hasBindElesys: false })
    }
  },
  getEcardInfo: function () {
    try {
      let ehallAccount = wx.getStorageSync('ehallAccount') || {}
      if (Object.keys(ehallAccount).length === 0) {
        const uid = app.globalData.edusysUserInfo.uid
        let password = ''
        const idcard = app.globalData.edusysUserInfo.idcard || ''
        const pointGrade = 20
        const grade = uid.substr(0, 2)
        // 20级之前默认密码身份证号码后六位
        if (grade < pointGrade &&  uid.indexOf(grade) === 0) password = idcard.substring(idcard.length - 6)
        // 20级之后默认密码身份证号码后八位
        if (grade >= pointGrade &&  uid.indexOf(grade) === 0) password = idcard.substring(idcard.length - 8)
        Object.assign(ehallAccount, { uid: uid, password: password })
      }
      this.getEcardData(ehallAccount)
    } catch (error) {
      console.log('getEcardInfo', error)
      this.setData({ ecardData: false, hasBindEcard: false })
    }
  },
  getNetsysInfo: function () {
    try {
      let netsysUserInfo = wx.getStorageSync('netsysUserInfo') || {}
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
  // 获取一卡通余额数据
  getEcardData: function(ecardAccount) {
    var _this = this
    wx.request({
      url: `${app.globalData.domain}/ehall/card`,
      data: ecardAccount,
      timeout: app.globalData.requestTimeout,
      method: 'GET',
      success: function(res){
        try {
          if (res.data && res.data.cardno) {
            _this.setData({ hasBindEcard: true, ecardData: res.data })
            wx.setStorageSync('ehallAccount', ecardAccount)
          } else {
            _this.setData({ hasBindEcard: false, ecardData: false })
          }
        } catch (error) {
          _this.setData({ hasBindEcard: true, ecardData: false })
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
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({ canShake: false })
  },
})
