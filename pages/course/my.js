// pages/course/my.js
const util = require("../../utils/util");
//获取应用实例
var app = getApp();
const domain = app.globalData.domain;
Page({
  data: {
    remind: '加载中',
    _days: ['一','二','三','四','五','六','日'],
    weekArray: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
    _weeks : ['第一周','第二周','第三周','第四周','第五周','第六周','第七周','第八周','第九周','第十周','十一周','十二周','十三周','十四周','十五周','十六周','十七周','十八周','十九周','二十周'],    
    _time: [ //课程时间与指针位置的映射，{begin:课程开始,end:结束时间,top:指针距开始top格数}
      { begin: '0:00', end: '7:59', beginTop: -4, endTop: -4 },
      { begin: '8:00', end: '9:35', beginTop: 0, endTop: 200 },
      { begin: '9:36', end: '9:54', beginTop: 204, endTop: 204 },
      { begin: '9:55', end: '11:30', beginTop: 208, endTop: 408 },
      { begin: '11:31', end: '13:09', beginTop: 414, endTop: 414 },
      { begin: '13:10', end: '14:45', beginTop: 420, endTop: 620 },
      { begin: '14:46', end: '14:59', beginTop: 624, endTop: 624 },
      { begin: '15:00', end: '16:35', beginTop: 628, endTop: 828 },
      { begin: '16:36', end: '16:49', beginTop: 834, endTop: 834 },
      { begin: '16:50', end: '18:25', beginTop: 840, endTop: 1040 },
      { begin: '18:26', end: '19:09', beginTop: 1044, endTop: 1044 },
      { begin: '19:10', end: '21:35', beginTop: 1048, endTop: 1248 },
      { begin: '21:36', end: '23:59', beginTop: 1254, endTop: 1254 },
    ],
    timeRow: [
      { l1: '第一小节', l2: '第二小节', t1: '8:00-8:45', t2: '8:50-9:35' },
      { l1: '第三小节', l2: '第四小节', t1: '9:55-10:40', t2: '10:45-11:30' },
      { l1: '第五小节', l2: '第六小节', t1: '13:10-13:55', t2: '14:00-14:45' },
      { l1: '第七小节', l2: '第八小节', t1: '15:00-15:45', t2: '15:50-16:35' },
      { l1: '第九小节', l2: '第十小节', t1: '16:50-17:35', t2: '17:40-18:25' },
  ],
    timelineTop: 0,
    scroll: {
      left: 0
    },
    targetLessons: [],
    targetColor: 'green',
    targetX: 0, //target x轴top距离
    targetY: 0, //target y轴left距离
    targetDay: 0, //target day
    targetDayIndex: 0,
    targetWid: 0, //target wid
    targetI: 0,   //target 第几个active
    targetLen: 0, //target 课程长度
    blur: false,
    today: '',  //当前星期数
    toweek: 1,  //当前周数
    week: '*',    //视图周数（'*'表示学期视图）
    lessons : [],  //课程data
    dates: [],     //本周日期
    teacher: false,   //是否为教师课表
    is_vacation: false,// 是否为假期
    myCourseJson: {},
    classColors: ['red', 'green', 'purple', 'yellow','orange','olive','cyan','blue','mauve'],
    painting: {},
    shareImage: '',
    isAndroid: false
  },
  //分享
  // onShareAppMessage: function(){
  //   var name = this.data.name || app._user.we.info.name,
  //       id = this.data.id || app._user.we.info.id;
  //   return {
  //     title: name + '的课表',
  //     desc: '贝壳小盒子 - 课表查询',
  //     path: '/pages/core/kb/kb?id='+id+'&name='+name
  //   };
  // },
  onLoad: function(options){
    var _this = this;
    var inital = _this.inital();
    if(inital){
      return
    }
    if (!inital && _this.hasEdysysUserInfo()) {
      _this.get_kb();
    } else {
      _this.setData({remind: '请重新登录'})
    }
    // Android 系统显示桌面组件按钮
    wx,wx.getSystemInfo({
      success: (result) => {
        if (result.platform == 'android') { _this.setData({ isAndroid: true }) }
      }
    })
  },
  inital: function () {
    const d = new Date();
    var today = d.getDay();
    today = this.data.weekArray[today];
    let courseCache = wx.getStorageSync('myCourse') || {}
    let hasCourseCache = Object.keys(courseCache).length == 7 ? true : false;
    let _this = this;
    this.setData({
      today: today,
      lessons: hasCourseCache ? courseCache : [],
      remind: hasCourseCache ? '' : _this.data.remind
    })
    return false;
  },
  hasEdysysUserInfo: function () {
    try {
      var isTeacher = false;
      let edusysUserInfo = wx.getStorageSync('edusysUserInfo') || {}
      if(edusysUserInfo.name.length > 0){
        if(edusysUserInfo.uid.length<8){
          isTeacher = true;
        }
        app.globalData.edusysUserInfo = edusysUserInfo;
        this.setData({edusysUserInfo: edusysUserInfo, teacher: isTeacher});
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  },
  onShow: function(){
    var _this = this;
    // 计算timeline时针位置
    function parseMinute(dateStr){ return dateStr.split(':')[0]*60 + parseInt(dateStr.split(':')[1]); }
    function compareDate(dateStr1,dateStr2){
      return parseMinute(dateStr1) <= parseMinute(dateStr2);
    }
    var nowTime = util.wecquFormatTime(new Date(),'h:m');
    _this.data._time.forEach(function(e,i){
      if(compareDate(e.begin,nowTime) && compareDate(nowTime,e.end)){
        _this.setData({
          timelineTop: Math.round(e.beginTop + (e.endTop-e.beginTop)*(parseMinute(nowTime) - parseMinute(e.begin))/100)
        });
      };
    });
    //设置滚动至当前时间附近，如果周末为设置left为其最大值102
    var nowWeek = new Date().getDay();
    _this.setData({
      'scroll.left': ((nowWeek===6||nowWeek===0) && !this.data.is_vacation) ? 102 : 0
    });
  },
  onReady: function(){
    var _this = this;
  },
  scrollXHandle: function(e){
    // this.setData({
    //   'scroll.left': e.detail.scrollLeft
    // });
  },
  showDetail: function(e){
    // 点击课程卡片后执行
    var _this = this;
    var dataset = e.currentTarget.dataset;
    var lessons = _this.data.lessons[dataset.day][dataset.wid];
    var targetI = 0;
    // console.log(e)
    if(!Array.isArray(lessons)){lessons = [lessons]}
    if(Array.isArray(lessons)){
      lessons.map(function(e,i){
        if(lessons.length === 1){
          e.left = 0;
        }else{
          //笼罩层卡片防止超出课表区域
          //周一~周四0~3:n lessons.length>=2*n+1时，设置left0为-n*128，否则设置为-60*(lessons.length-1)；
          //周日~周五6~4:n lessons.length>=2*(6-n)+1时，设置left0为-(7-n-lessons.length)*128，否则设置为-60*(lessons.length-1)；
          var left0 = -60*(lessons.length-1);
          if(dataset.day <= 3 && lessons.length >= 2*dataset.day+1){
            left0 = -dataset.day*128;
          }else if(dataset.day >= 4 && lessons.length >= 2*(6-dataset.day)+1){
            left0 = -(7-dataset.day-lessons.length)*128;
          }
          e.left = left0+128*i;
        }
        return e;
      });
    } else {
      lessons.left = 0;
    }
    targetI = 0;
    lessons.target = false;
    if(!lessons.length){ return false; }
    var targetDayIndex = this.data.weekArray.indexOf(dataset.day) - 1;
    var targetX = e.detail.x >= 80 ? e.detail.x : e.detail.x + 120;
    _this.setData({
      targetX: targetX,
      targetY: e.detail.y,
      targetDay: dataset.day,
      targetDayIndex: targetDayIndex,
      targetWid: dataset.wid,
      targetColor: dataset.color,
      targetI: targetI,
      targetLessons: lessons,
      targetLen: lessons.length,
      blur: true
    });
  },
  hideDetail: function(){
    // 点击遮罩层时触发，取消主体部分的模糊，清空target
    this.setData({
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
  infoCardTap: function(e){
    var dataset = e.currentTarget.dataset;
    if(this.data.targetI == dataset.index){ return false; }
    this.setData({
      targetI: dataset.index
    });
  },
  infoCardChange: function(e){
    var current = e.detail.current;
    if(this.data.targetI == current){ return false; }
    this.setData({
      targetI: current
    });
  },
  catchMoveDetail: function(){ /*阻止滑动穿透*/ },
  bindStartDetail: function(e){
    this.setData({
      startPoint: [e.touches[0].pageX, e.touches[0].pageY]
    });
  },
  //滑动切换课程详情
  bindMoveDetail: function(e){
    var _this = this;
    var curPoint = [e.changedTouches[0].pageX, e.changedTouches[0].pageY],
        startPoint = _this.data.startPoint, i = 0;
    if(curPoint[0] <= startPoint[0]){
      if(Math.abs(curPoint[0]-startPoint[0]) >= Math.abs(curPoint[1]-startPoint[1])){   
        if(_this.data.targetI != _this.data.targetLen - 1) {
          i = 1;//左滑
        }
      }
    }else{
      if(Math.abs(curPoint[0]-startPoint[0]) >= Math.abs(curPoint[1]-startPoint[1])){    
        if(_this.data.targetI != 0) {
          i = -1;//右滑
        }
      }
    }
    if(!i){ return false; }
    _this.setData({
      targetI: parseInt(_this.data.targetI) + i
    });
  },
  //点击左右按钮切换swiper
  swiperChangeBtn: function(e){
    var _this = this;
    var dataset = e.currentTarget.dataset, i, data={};
    if(dataset.direction == 'left'){ i = -1; }
    else if(dataset.direction == 'right'){ i = 1; }
    data[dataset.target] = parseInt(_this.data[dataset.target]) + i;
    _this.setData(data);
  },
  get_kb: function () {
    var uid = app.globalData.edusysUserInfo.uid
    var password = app.globalData.edusysUserInfo.password
    var _this = this
    wx.request({
      url: `${domain}/edu/course`,
      data: { uid: uid, pwd: password, cookie: app.globalData.edusysUserInfo.cookie },
      method: 'POST',
      timeout: app.globalData.requestTimeout,
      success: function(res){
        if(res.statusCode == 200){
          // console.log(res.data)
          wx.setStorage({ data: res.data.course, key: 'myCourse' })
          _this.setData({myCourseJson: res.data, lessons: res.data.course, remind: ''})
          wx.showToast({ title: '已自动更新最新课表', icon: 'none' })
          wx.vibrateShort({ type: 'medium' })
        } else {
          _this.setData({remind: res.data.message})
          if (res.statusCode == 403) {
            wx.clearStorageSync()
            app.globalData.edusysUserInfo = {}
            wx.navigateTo({ url: '../index/login' })
          }
        }
      }
    })
  },
  goClassPlace: function(ep) {
    // console.log(ep.target.dataset.place);
    var placeArr = ["1教", "2教", "3教", "4教", "5教", "6教", "7教", "8教", "9教", "10教", "11教", "12教", "理工馆", "社科馆"];
    var markerIdArr = [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 5, 4];
    var result = placeArr.indexOf(ep.currentTarget.dataset.place.slice(0, -3));
    if( result >= 0 ) { wx.navigateTo({ url: '../traffic/navi?markerId=' + markerIdArr[result]}) }
  },
  eventGetImage: function (event) {
    var that = this;
    // console.log(event)
    wx.hideLoading()
    const { tempFilePath, errMsg } = event.detail
    if (errMsg === 'canvasdrawer:ok') {
      this.setData({ shareImage: tempFilePath })
      wx.previewImage({ urls: [tempFilePath] })
      that.eventSave();
    }
  },
  eventSave:function () {
    wx.saveImageToPhotosAlbum({
      filePath: this.data.shareImage,
      success(res) {
        wx.vibrateShort({ type: 'medium' })
        wx.showToast({
          title: '图片已存至相册，可发给好友或设为壁纸',
          icon: 'none',
          duration: 3000
        })
      }
    })
  },
  drawToPic:function () {
    var that = this;
    if (that.data.shareImage != '') {
      wx.previewImage({
        urls: [that.data.shareImage],
      })
      wx.showToast({
        title: '图片已存至相册，可发给好友或设为壁纸',
        icon: 'none',
        duration: 3000
      })
      return
    }
    wx.showLoading({
      title: '绘制分享图片中',
      mask: true
    })
    const deviceInfo = wx.getSystemInfoSync();
    const screenWidth = deviceInfo.screenWidth;
    const screenHeight = deviceInfo.screenHeight;
    let topMargin = 10;
    if (screenHeight / screenWidth >= 1.8) {
      //检测是否为全面屏
      topMargin = 30;
    }
    var viewsArr = [{
      type: 'rect',
      background: '#fff',
      top: 0,
      left: 0,
      width: screenWidth,
      height: screenHeight
    }];
    //绘制星期
    const weekArr = ['周一', '周二', '周三', '周四', '周五'];
    for (let i = 0; i < weekArr.length; i++) {
      let rowTempArr = {
        type: 'text',
        content: weekArr[i],
        fontSize: 16,
        color: '#402D16',
        textAlign: 'left',
        top: topMargin,
        left: 30 + (i * ((screenWidth - 30) / weekArr.length)),
        bolder: true
      };
      viewsArr.push(rowTempArr);
    }
    //绘制节数
    for (let i = 1; i <= 12; i++) {
      let columnTempArr = {
        type: 'text',
        content: i,
        fontSize: 16,
        color: '#402D16',
        textAlign: 'center',
        top: (topMargin - 30) + (i * ((screenHeight - 30) / 12)),
        left: 10,
        bolder: true
      };
      viewsArr.push(columnTempArr);
    }

    const allCourseArr = that.data.lessons;
    let j = 0;
    for (let w in allCourseArr) {
      if (j < 5) {
        for (let i in allCourseArr[w]) {
          try {
            if (allCourseArr[w][i].courseName.length > 0) {
              let classTempBgArr = {
                type: 'rect',
                background: '#7acfa6',
                top: (topMargin + 30) + (2 * (i - 1) * ((screenHeight - 30) / 12)),
                left: Number(30 + (j * ((screenWidth - 30) / weekArr.length))),
                width: ((screenWidth - 30) / weekArr.length) - 1,
                height: (1 * ((screenHeight - 30) / 6)) - 1
              };
              viewsArr.push(classTempBgArr);
              let classTextTempArr = {
                type: 'text',
                content: allCourseArr[w][i].place + ' ' + allCourseArr[w][i].courseName,
                fontSize: 16,
                color: '#fff',
                textAlign: 'left',
                top: (topMargin + 30) + (2 * (i - 1) * ((screenHeight - 30) / 12) + 5),
                left: Number(30 + (j * ((screenWidth - 30) / weekArr.length)) + 5),
                breakWord: true,
                MaxLineNumber: 7,
                width: ((screenWidth - 30) / weekArr.length) - 20
              };
              viewsArr.push(classTextTempArr);
            }
          } catch (error) {
            let classTempBgArr = {
              type: 'rect',
              background: '#7acfa6',
              top: (topMargin + 30) + (2 * (i - 1) * ((screenHeight - 30) / 12)),
              left: Number(30 + (j * ((screenWidth - 30) / weekArr.length))),
              width: ((screenWidth - 30) / weekArr.length) - 1,
              height: (1 * ((screenHeight - 30) / 6)) - 1
            };
            viewsArr.push(classTempBgArr);
            let longContent = '';
            for (let index = 0; index < allCourseArr[w][i].length; index++) {
              const element = allCourseArr[w][i][index];
              let courseName = element.courseName.length > 7 ? element.courseName.substr(0,5)+'...':element.courseName;
              longContent = longContent + element.place + courseName;
            }
            let classTextTempArr = {
              type: 'text',
              content: longContent,
              fontSize: 16,
              color: '#fff',
              textAlign: 'left',
              top: (topMargin + 30) + (2 * (i - 1) * ((screenHeight - 30) / 12) + 5),
              left: Number(30 + (j * ((screenWidth - 30) / weekArr.length)) + 5),
              breakWord: true,
              MaxLineNumber: 7,
              width: ((screenWidth - 30) / weekArr.length) - 20
            };
            viewsArr.push(classTextTempArr);
          }
        }
        j++;
      }
    }
    var canvasJson = {
      width: screenWidth,
      height: screenHeight,
      views: viewsArr
    };
    that.setData({
      painting: canvasJson
    })
  },
  addCalendarNotice: function (e) {
    var d = new Date();
    var nowHours = d.getHours();
    nowHours = nowHours > 9 ? nowHours : '0' + nowHours;
    var nowMinutes = d.getMinutes();
    nowMinutes = nowMinutes > 9 ? nowMinutes : '0' + nowMinutes;
    const nowTimestamp = util.getCourseNoticeTimestamp(this.data.today, `${nowHours}:${nowMinutes}`);
    
    const targetI = this.data.targetI;
    const subacribeCourse = this.data.targetLessons[targetI];
    const courseName = subacribeCourse.courseName;
    const startTimeStr = subacribeCourse.startTime;
    const endTimeStr = subacribeCourse.endTime == '你猜?' ? startTimeStr : subacribeCourse.endTime;
    const place = subacribeCourse.place;
    let teacher = subacribeCourse.teacher;
    const teachWeek = subacribeCourse.teachWeek;

    var setNoticeStart = util.getCourseNoticeTimestamp(this.data.targetDay, startTimeStr);
    var setNoticeEnd = util.getCourseNoticeTimestamp(this.data.targetDay, endTimeStr);

    setNoticeStart = setNoticeStart <= nowTimestamp ? parseInt(setNoticeStart) + 60*60*24*7 : setNoticeStart;

    teacher = this.data.teacher ? subacribeCourse.className : teacher;
    let type = this.data.teacher ? '人' : '老师';

    const description = `【贝壳小盒子】提醒你${teachWeek}您有一节${teacher}${type}的${courseName}课程，${startTimeStr}开始上课，到${endTimeStr}下课，记得按时去上课哦(#^.^#)`;
    wx.addPhoneCalendar({
      title: courseName,
      startTime: setNoticeStart,
      description: description,
      location: place,
      endTime: setNoticeEnd,
      alarmOffset: 60*10
    });
  },
  subscribleMessage: function (e) {
    var tmplIds = this.data.teacher ? 'SgteUpl9O6g5Re6TY3FvaHQeZ0RA67cznhOEZ72B11E' : 'SgteUpl9O6g5Re6TY3FvaBQZgsJwU55WuTk0YisjHm8';
    var d = new Date();
    var nowHours = d.getHours();
    nowHours = nowHours > 9 ? nowHours : '0' + nowHours;
    var nowMinutes = d.getMinutes();
    nowMinutes = nowMinutes > 9 ? nowMinutes : '0' + nowMinutes;
    const nowTimestamp = util.getCourseNoticeTimestamp(this.data.today, `${nowHours}:${nowMinutes}`);

    const targetI = this.data.targetI;
    const subacribeCourse = this.data.targetLessons[targetI];
    const courseName = subacribeCourse.courseName;
    var startTimeStr = subacribeCourse.startTime;
    const endTimeStr = subacribeCourse.endTime == '你猜?' ? startTimeStr : subacribeCourse.endTime;
    const place = subacribeCourse.place;
    let teacher = subacribeCourse.teacher;
    const teachWeek = subacribeCourse.teachWeek;
    teacher = this.data.teacher ? subacribeCourse.className : teacher;
    let type = this.data.teacher ? '人' : '老师';
    var setNoticeStart = util.getCourseNoticeTimestamp(this.data.targetDay, startTimeStr);
    setNoticeStart = setNoticeStart <= nowTimestamp ? parseInt(setNoticeStart) + 60*60*24*7 : setNoticeStart;
    const description = `${teachWeek}按时上课`;
    const openid = app.globalData.openid;
    const isTeacher = this.data.teacher;
    startTimeStr = util.formatDate(d) + ` ${startTimeStr}`;

    var _this = this;
    wx.showModal({
      title: '注意',
      content: '受微信小程序官方限制，每次订阅消息仅能下发一条消息提醒，因此只能每次订阅每节课程提醒',
      showCancel: false,
      success (res) {
        wx.requestSubscribeMessage({
          tmplIds: [tmplIds],
          success (res) {
            if(res[tmplIds]=='accept'){
              _this.sendSubMessage(courseName, place,teacher,startTimeStr, description,setNoticeStart,openid,tmplIds,isTeacher,isTeacher);
            }
          }
        })
      }
    })
  },
  sendSubMessage: function (courseName, place,teacher,startTimeStr, description,setNoticeStart,openid,template_id,isTeacher) {
    wx.request({
      url: `${app.globalData.domain}/wechat/course/subscrible`,
      method: 'POST',
      data: {
        courseName: courseName,
        place: place,
        teacher: teacher,
        startTime: startTimeStr,
        description: description,
        setNoticeStart: setNoticeStart,
        openid: openid,
        template_id: template_id,
        isTeacher: isTeacher
      },
      success: function(res){
        wx.showToast({ title: res.data.message, icon: 'success' });
      }
    })
  },
  shellboxSchedule: function () {
    wx.showModal({
      title: '贝壳课程表',
      content: '贝壳小盒子现提供安卓桌面插件APP，安装贝壳课程表APP导入课表后可添加到手机桌面小部件',
      showCancel: true,
      cancelText: '没兴趣',
      confirmText: '我试试',
      success (res) {
        if (res.confirm) {
          wx.setClipboardData({
            data: 'https://gitee.com/airmole/shellbox-schedule-kotlin/attach_files/987384/download/shellbox_schedule_1_0_1.apk'
          })
          wx.showToast({
            title: '已复制到粘贴版,请粘贴到浏览器下载',
            icon: 'none',
            duration: 2000
          });
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
});