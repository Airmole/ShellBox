const app = getApp();
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    hasEdusysStorage: false,
    edusysUserInfo: {},
    isTeacher: false,
    QGroupModal: false,
    quanyiModal: false,
    clickAvatarCount: 1,
    backgroundImage: 'https://upload-images.jianshu.io/upload_images/4697920-65af0059363fb4b0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240',
    canShake: false,
    iconList: [{
      id: 'myCourse',
      icon: 'wodekebiao',
      teacher: true,
      student: true,
      name: '我的课表',
      url: '../course/my',
      login: true,
    }, {
      id: 'stulist',
      icon: 'gongrenhuamingce',
      teacher: true,
      student: false,
      name: '花名册',
      url: '../course/stulist/index',
      login: true,
    }, {
      id: 'teacherCourse',
      icon: 'jiaoshikebiao',
      teacher: true,
      student: true,
      name: '教师课表',
      url: '../course/search?type=teacher',
      login: true,
    }, {
      id: 'classCourse',
      icon: 'banjikebiao',
      teacher: true,
      student: true,
      name: '班级课表',
      url: '../course/search?type=class',
      login: true,
    }, {
      id: 'netfare',
      icon: 'wangluo',
      teacher: true,
      student: true,
      name: '网费查询',
      url: '../netsys/bind',
      login: true,
    }, {
      id: 'calendar',
      icon: 'xiaoli',
      teacher: true,
      student: true,
      name: '校历',
      url: '../school/calendar',
      login: false,
    }, {
      id: 'mybooks',
      icon: 'tushuguan',
      teacher: true,
      student: true,
      name: '我的借阅',
      url: './../books/bind',
      login: true,
    }, {
      id: 'scanBookCode',
      icon: 'dushuma',
      teacher: true,
      student: true,
      name: '扫码查书',
      url: '',
      login: false,
    }, {
      id: 'score',
      icon: 'chengji',
      teacher: false,
      student: true,
      name: '成绩查询',
      url: '../score/score',
      login: true,
    }, {
      id: 'elesys',
      icon: 'dianfei',
      teacher: true,
      student: true,
      name: '寝室用电',
      url: '../elesys/bind',
      login: false,
    }, {
      id: 'schoolTrans',
      icon: 'daba',
      teacher: true,
      student: true,
      name: '校园出行',
      url: '../traffic/bus',
      login: false,
    }, {
      id: 'teacherBus',
      icon: 'daba',
      teacher: true,
      student: false,
      name: '班车订票',
      url: '',
      login: true,
    }, {
      id: 'cet',
      icon: 'CET',
      teacher: true,
      student: true,
      name: '查四六级',
      url: 'jiaoyubu/pages/business/cet/fillInfo/fillInfo',
      login: false,
    }, {
      id: 'map',
      icon: 'tubiao_ditu',
      teacher: true,
      student: true,
      name: '校园导航',
      url: '../traffic/navi',
      login: false,
    }, {
      id: 'hotBook',
      icon: 'bangdan',
      teacher: true,
      student: true,
      name: '热门图书',
      url: '../books/hot/index',
      login: false,
    }, {
    //   id: 'recommendBook',
    //   icon: 'tuijian',
    //   teacher: true,
    //   student: true,
    //   name: '图书荐购',
    //   url: '../books/recommend/index',
    //   login: false,
    // }, {
      id: 'overdue',
      icon: 'qiankuanjiesuan',
      teacher: true,
      student: true,
      name: '图书超期',
      url: '../books/overdue/index',
      login: false,
    }, {
      id: 'lost',
      icon: 'lost',
      teacher: true,
      student: true,
      name: '失物招领',
      url: '../school/lost/index',
      login: false,
    }, {
      id: 'tel',
      icon: 'tel',
      teacher: true,
      student: true,
      name: '常用电话',
      url: '../school/tel',
      login: false,
    }, {
      id: 'certificate',
      icon: 'zhengjian',
      teacher: true,
      student: true,
      name: '考证助手',
      url: '../school/cert',
      login: false,
    }, {
      id: 'websites',
      icon: 'diqiu',
      teacher: true,
      student: true,
      name: '校园站点',
      url: '../school/web',
      login: false,
    }, {
      id: 'xiaoai',
      icon: 'xiaoai',
      teacher: true,
      student: true,
      name: '小爱课表',
      url: '../school/xiaoai',
      login: false,
    }, {
    //   id: 'portrait',
    //   icon: 'biye',
    //   teacher: false,
    //   student: true,
    //   name: '毕业画像',
    //   url: '../books/portrait',
    //   login: false,
    // }, {
      id: 'bbbug',
      icon: 'yu',
      teacher: true,
      student: true,
      name: '树洞闲聊',
      url: '',
      login: false,
    }, {
      id: 'about',
      icon: 'plane',
      teacher: true,
      student: true,
      name: '关于盒子',
      url: '../school/aboutus',
      login: false,
    }]
  },
  onLoad: function () {
    this.inital()
    this.getBackgroundImage()
  },
  onShow: function () {
    this.inital()
    var _this = this
    // 手机摇一摇随机更换背景壁纸
    this.setData({ canShake: true })
    wx.onAccelerometerChange(function (e) {
      if (!_this.data.canShake) {
        return
      }
      // console.log(e)
      if (e.x * e.y > 0.58 ) {
        wx.vibrateShort({ type: 'heavy' })
        _this.getBackgroundImage()
      }
    })
  },
  inital: function () {
    var edusysUserInfo = wx.getStorageSync('edusysUserInfo');
    try {
      if(edusysUserInfo.uid.length > 0 && edusysUserInfo.password.length > 0){
        var isTeacher = false;
        if(edusysUserInfo.uid.length<8){
          isTeacher = true
        }
        this.setData({
          hasEdusysStorage: true,
          isTeacher: isTeacher,
          edusysUserInfo: edusysUserInfo
        })
      }
    } catch (error) {
      // console.log(error)
      this.setData({
        hasEdusysStorage: false,
        edusysUserInfo: {}
      })
    }
    // 允许分享到朋友圈
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
  },
  getBackgroundImage: function() {
    var _this = this
    wx.request({
      url: `${app.globalData.domain}/background`,
      timeout: app.globalData.requestTimeout,
      method: 'GET',
      success: function(res){
        try {
          if (res.statusCode == 200) {
            _this.setData({ backgroundImage: res.data.background })
          }
        } catch (error) {
          console.log('获取背景图出错', error)
        }
      }
    })
  },
  goToPage: function (e) {
    const id = e.currentTarget.id;
    const url = e.currentTarget.dataset.url;
    const needLogin = e.currentTarget.dataset.login;
    const hasEdusysStorage = this.data.hasEdusysStorage;
    // console.log('target：', hasEdusysStorage);

    if(id == 'cet'){
      wx.navigateToMiniProgram({ appId: 'wx2eec5fb00157a603', path: url });
      return
    }

    if(id == 'scanBookCode'){
      this.scanBookCode();
      return
    }

    if(id == 'teacherBus'){
      wx.navigateToMiniProgram({ appId: 'wx183616af30e5723d' });
      return
    }

    if(id == 'bbbug'){
      wx.navigateToMiniProgram({ appId: 'wx0a68e695b54ffb4c', path: 'pages/index/index?room_id=11038' });
      return
    }

    if(needLogin && !hasEdusysStorage){
      wx.showToast({ title: '不登录，这个功能没法用哟~', icon: 'none' })
      return
    }
    
    wx.navigateTo({ url: url });
  },
  goLogin: function (e) {
    wx.navigateTo({
      url: './login',
    })
  },
  scanBookCode: function () {
    wx.scanCode({
      success: (res) => {
        if (res.errMsg !== 'scanCode:ok') {
          wx.showToast({ title: res.errMsg, icon: 'none'})
          return;
        }
        if (res.scanType !== 'EAN_13') {
          wx.showToast({ title: '这不是图书ISBN码', icon: 'none'})
          return;
        }
        wx.navigateTo({ url: `../books/detail?code=${res.result}&codeType=isbn` })
      }
    })
  },
  showQQGroupCode: function () {
    this.setData({ QGroupModal: true })
  },
  showQuanyiModal: function () {
    this.setData({ quanyiModal: true })
  },
  showBgImage:function () {
    const background = this.data.backgroundImage
    wx.previewImage({
      urls: [background],
    })
  },
  logout: function (e) {
    var anmiaton = e.currentTarget.dataset.class
    var _this = this
    _this.setData({ animation: anmiaton })
    setTimeout(function() {
      wx.clearStorage({
        success: (res) => {
          _this.setData({ animation: ''});
          app.globalData.edusysUserInfo = {}
          app.globalData.hasEdusysStorage = false
          wx.vibrateShort({ type: 'medium' })
          wx.navigateTo({
            url: './login',
          });
        },
      })
    }, 1000);
  },
  onShareAppMessage: function (res) {
    return {
      title: '贝壳小盒子',
      path: 'pages/index/feature',
    }
  },
   /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({ canShake: false })
  },
})