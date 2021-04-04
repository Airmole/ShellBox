var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

Page({
  data: {
    tabs: ["北京", "天津", "宝坻"],
    activeIndex: 1,
    sliderOffset: 0,
    sliderLeft: 0,
    isLoading: true,
    chelaileWeappid: 'wx71d589ea01ce3321',
    bus160: [
      '北京科技大学天津学院西门',
      '天津财经大学珠江学院',
      '军事交通学院分院东',
      '军事交通学院分院西',
      '玉佛宫',
      '玉良庄村',
      '大觉禅寺',
      '京津新城管委会',
      '京津新城公交站',
      '凯悦大酒店',
      '合生创展',
      '上京顺园',
      '上京康园',
      '上京雍园',
      '消防队',
      '朱家窝',
      '田家桥',
      '大白庄镇第二小学',
      '鸿坤原乡小镇',
      '范家庄',
      '锦绣香江医院',
      '华北集团地铁站',
      '白庙客运站'
    ],
    busBao13: [
      '京津新城',
      '北京科技大学天津学院西门',
      '天津财经大学珠江学院北门',
      '周良庄',
      '凯旋家园',
      '怡购清华园',
      '怡人购商业广场',
      '天宝新苑小区',
      '宝坻中医院',
      '劝宝超市东门',
      '宝坻客运站'
    ]
  },
  onLoad: function (r) {
    var that = this;
    that.inital();
    if (r.activeIndex) {
      that.setData({
        sliderOffset: r.activeIndex * that.data.sliderOffset,
        activeIndex: r.activeIndex,
      })
    }
  },
  inital: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });

    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
  },
  onReady: function () {
    var that = this;
    setTimeout(function () {
      that.setData({
        isLoading: false
      });
    }, 400);
  },
  tabClick: function (e) {
    this.setData({
      activeIndex: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  },
  goJJXCStation: function () {
    wx.getLocation({
      type: 'gcj02',
      success(res) {
        wx.openLocation({
          latitude: 39.548662,
          longitude: 117.363274,
          scale: 17,
          name: '京津新城公交站',
          address: '京津新城北京国贸商务班车'
        })
      }
    })
  },
  goBJGMStation: function () {
    wx.getLocation({
      type: 'gcj02', // 返回可以用于wx.openLocation的经纬度
      success(res) {
        wx.openLocation({
          latitude: 39.905531,
          longitude: 116.461934,
          scale: 17,
          name: '北京国贸乘车点',
          address: '北京国贸桥南艾维克酒店西门三环辅路'
        })
      }
    })
  },
  showBjBusQrcode: function () {
    wx.previewImage({
      urls: ['https://upload-images.jianshu.io/upload_images/4697920-b963b368eec6df87.png'],
    })
  },
  chelaile160: function () {
    const chelaileWeappid = this.data.chelaileWeappid;
    wx.navigateToMiniProgram({
      appId: chelaileWeappid,
      path: '/pages/linedetail2/linedetail?referer=home_favorite&targetStop={"couponFlag":0,"distanceToSp":-1,"lat":39.550400628154215,"lng":117.39601432727834,"order":1,"sId":"022-10010","sn":"北京科技大学天津学院西门"}&nextStop={}&city={"cityId":"006","cityLogoUrl":"https://image3.chelaile.net.cn/2c988cf5f09f4d19be781288ac8a49bb","cityName":"天津","cityVersion":0,"isGpsCity":0,"isHot":1,"isNewCity":0,"isSupport":1,"pinyin":"TianJin","supportSubway":1,"wechatFavoriteGray":0,"icoName":"tianjin","localCityId":"036"}&line={"lineId":"0022136478519","lineName":"160","direction":0,"lineNo":"160"}'
    })
  },
  chelaileBao13: function () {
    const chelaileWeappid = this.data.chelaileWeappid;
    wx.navigateToMiniProgram({
      appId: chelaileWeappid,
      path: '/pages/linedetail2/linedetail?referer=home_favorite&targetStop={"couponFlag":0,"distanceToSp":-1,"lat":39.550400628154215,"lng":117.39601432727834,"order":2,"sId":"022-10010","sn":"北京科技大学天津学院西门"}&nextStop={}&city={"cityId":"006","cityLogoUrl":"https://image3.chelaile.net.cn/2c988cf5f09f4d19be781288ac8a49bb","cityName":"天津","cityVersion":0,"isGpsCity":0,"isHot":1,"isNewCity":0,"isSupport":1,"pinyin":"TianJin","supportSubway":1,"wechatFavoriteGray":0,"icoName":"tianjin","localCityId":"036"}&line={"lineId":"002290094530","lineName":"宝13","direction":0,"lineNo":"宝13"}'
    })
  },
  busSchedule: function (e) {
    // console.log(e.currentTarget.dataset);
    const busline = e.currentTarget.dataset.busline;
    let pathPara = '';
    let path = `pages/timetable/timetable`;
    switch (busline) {
      case 'school2city':
        pathPara = 'city={"cityId":"006","cityLogoUrl":"https://image3.chelaile.net.cn/2c988cf5f09f4d19be781288ac8a49bb","cityName":"天津","cityVersion":0,"isGpsCity":0,"isHot":1,"isNewCity":0,"isSupport":1,"pinyin":"TianJin","supportSubway":1,"wechatFavoriteGray":0,"icoName":"tianjin","localCityId":"036","grey":false}&line=%7B%22assistDesc%22%3A%22%E5%BB%BA%E8%AE%AE%E6%82%A8%E8%80%83%E8%99%91%E5%85%B6%E4%BB%96%E5%87%BA%E8%A1%8C%E6%96%B9%E6%A1%88%22%2C%22desc%22%3A%22%E6%9C%AC%E7%BA%BF%E8%B7%AF%E5%B7%B2%E8%BF%87%E6%9C%AB%E7%8F%AD%22%2C%22direction%22%3A0%2C%22endSn%22%3A%22%E7%99%BD%E5%BA%99%E5%85%AC%E4%BA%A4%E7%AB%99%22%2C%22firstTime%22%3A%2205%3A10%22%2C%22h5NewStyle%22%3A0%2C%22hasBusInfo%22%3Afalse%2C%22isSubway%22%3A0%2C%22ksDesc%22%3A%22%E7%AD%89%E5%BE%85%E5%8F%91%E8%BD%A6%22%2C%22lastTime%22%3A%2217%3A00%22%2C%22lineId%22%3A%220022136478519%22%2C%22lineNo%22%3A%22160%22%2C%22maxJoinOrder%22%3A0%2C%22name%22%3A%22160%22%2C%22notNeedRealData%22%3Afalse%2C%22price%22%3A%225~15%E5%85%83%22%2C%22priceExpansion%22%3A%22%5B%E5%85%B6%E4%BB%96%5D%EF%BC%9A%E5%BC%80%E5%BE%80%E5%AE%9D%E5%9D%BB%E6%96%B9%E5%90%91%EF%BC%8C19%3A00%E6%9C%AB%E7%8F%AD%E8%BD%A6%E4%B8%BA%E5%8D%8E%E5%8C%97%E9%9B%86%E5%9B%A2%E5%A7%8B%E5%8F%91%22%2C%22realCityId%22%3A%22006%22%2C%22segTimes%22%3A%5B%5B%2205%3A10%22%2C%2217%3A00%22%5D%5D%2C%22shortDesc%22%3A%22%E6%9C%AB%E7%8F%AD%E5%B7%B2%E8%BF%87%22%2C%22sortPolicy%22%3A%22flpolicy%3D0%22%2C%22startSn%22%3A%22%E5%8C%97%E4%BA%AC%E7%A7%91%E6%8A%80%E5%A4%A7%E5%AD%A6%E5%A4%A9%E6%B4%A5%E5%AD%A6%E9%99%A2%E8%A5%BF%E9%97%A8%22%2C%22state%22%3A-3%2C%22stationsNum%22%3A43%2C%22temOperation%22%3Afalse%2C%22thirdDir%22%3A0%2C%22type%22%3A0%2C%22version%22%3A%22%22%7D';
        break;
      case 'city2school':
        pathPara = 'city={"cityId":"006","cityLogoUrl":"https://image3.chelaile.net.cn/2c988cf5f09f4d19be781288ac8a49bb","cityName":"天津","cityVersion":0,"isGpsCity":0,"isHot":1,"isNewCity":0,"isSupport":1,"pinyin":"TianJin","supportSubway":1,"wechatFavoriteGray":0,"icoName":"tianjin","localCityId":"036","grey":false}&line=%7B%22assistDesc%22%3A%22%22%2C%22desc%22%3A%22%22%2C%22direction%22%3A1%2C%22endSn%22%3A%22%E5%8C%97%E4%BA%AC%E7%A7%91%E6%8A%80%E5%A4%A7%E5%AD%A6%E5%A4%A9%E6%B4%A5%E5%AD%A6%E9%99%A2%E8%A5%BF%E9%97%A8%22%2C%22firstTime%22%3A%2207%3A30%22%2C%22h5NewStyle%22%3A0%2C%22hasBusInfo%22%3Afalse%2C%22isSubway%22%3A0%2C%22lastTime%22%3A%2219%3A00%22%2C%22lineId%22%3A%220022136545543%22%2C%22lineNo%22%3A%22160%22%2C%22maxJoinOrder%22%3A0%2C%22name%22%3A%22160%22%2C%22notNeedRealData%22%3Afalse%2C%22price%22%3A%225~15%E5%85%83%22%2C%22priceExpansion%22%3A%22%5B%E5%85%B6%E4%BB%96%5D%EF%BC%9A%E5%BC%80%E5%BE%80%E5%AE%9D%E5%9D%BB%E6%96%B9%E5%90%91%EF%BC%8C19%3A00%E6%9C%AB%E7%8F%AD%E8%BD%A6%E4%B8%BA%E5%8D%8E%E5%8C%97%E9%9B%86%E5%9B%A2%E5%A7%8B%E5%8F%91%22%2C%22realCityId%22%3A%22006%22%2C%22segTimes%22%3A%5B%5B%2207%3A30%22%2C%2219%3A00%22%5D%5D%2C%22shortDesc%22%3A%22%22%2C%22sortPolicy%22%3A%22flpolicy%3D0%22%2C%22startSn%22%3A%22%E7%99%BD%E5%BA%99%E5%85%AC%E4%BA%A4%E7%AB%99%22%2C%22state%22%3A0%2C%22stationsNum%22%3A39%2C%22temOperation%22%3Afalse%2C%22thirdDir%22%3A0%2C%22type%22%3A0%2C%22version%22%3A%22%22%7D';
        break;
      case 'baodi2school':
        pathPara = 'city={"cityId":"006","cityLogoUrl":"https://image3.chelaile.net.cn/2c988cf5f09f4d19be781288ac8a49bb","cityName":"天津","cityVersion":0,"isGpsCity":0,"isHot":1,"isNewCity":0,"isSupport":1,"pinyin":"TianJin","supportSubway":1,"wechatFavoriteGray":0,"icoName":"tianjin","localCityId":"036","grey":false}&line=%7B%22assistDesc%22%3A%22%E5%BB%BA%E8%AE%AE%E6%82%A8%E8%80%83%E8%99%91%E5%85%B6%E4%BB%96%E5%87%BA%E8%A1%8C%E6%96%B9%E6%A1%88%22%2C%22desc%22%3A%22%E6%9C%AC%E7%BA%BF%E8%B7%AF%E5%B7%B2%E8%BF%87%E6%9C%AB%E7%8F%AD%22%2C%22direction%22%3A0%2C%22endSn%22%3A%22%E4%BA%AC%E6%B4%A5%E6%96%B0%E5%9F%8E%22%2C%22firstTime%22%3A%2206%3A30%22%2C%22h5NewStyle%22%3A0%2C%22hasBusInfo%22%3Afalse%2C%22isSubway%22%3A0%2C%22ksAssistDesc%22%3A%22%E5%BB%BA%E8%AE%AE%E8%80%83%E8%99%91%5Cn%E5%85%B6%E4%BB%96%E5%87%BA%E8%A1%8C%E6%96%B9%E6%A1%88%22%2C%22ksDesc%22%3A%22%E6%9C%AB%E7%8F%AD%E5%B7%B2%E8%BF%87%22%2C%22lastTime%22%3A%2217%3A30%22%2C%22lineId%22%3A%22002290094525%22%2C%22lineNo%22%3A%22%E5%AE%9D13%22%2C%22maxJoinOrder%22%3A0%2C%22name%22%3A%22%E5%AE%9D13%22%2C%22notNeedRealData%22%3Afalse%2C%22price%22%3A%222~6%E5%85%83%22%2C%22priceExpansion%22%3A%22%22%2C%22realCityId%22%3A%22006%22%2C%22segTimes%22%3A%5B%5B%2206%3A30%22%2C%2217%3A30%22%5D%5D%2C%22shortDesc%22%3A%22%E6%9C%AB%E7%8F%AD%E5%B7%B2%E8%BF%87%22%2C%22sortPolicy%22%3A%22flpolicy%3D0%22%2C%22startSn%22%3A%22%E5%AE%9D%E5%9D%BB%E5%AE%A2%E8%BF%90%E7%AB%99%EF%BC%88%E5%85%AC%E4%BA%A4%E5%9C%BA%E7%AB%99%EF%BC%89%22%2C%22state%22%3A-3%2C%22stationsNum%22%3A21%2C%22temOperation%22%3Afalse%2C%22thirdDir%22%3A0%2C%22type%22%3A0%2C%22version%22%3A%22%22%7D';
        break;
      case 'school2baodi':
        pathPara = 'city={"cityId":"006","cityLogoUrl":"https://image3.chelaile.net.cn/2c988cf5f09f4d19be781288ac8a49bb","cityName":"天津","cityVersion":0,"isGpsCity":0,"isHot":1,"isNewCity":0,"isSupport":1,"pinyin":"TianJin","supportSubway":1,"wechatFavoriteGray":0,"icoName":"tianjin","localCityId":"036","grey":false}&line=%7B%22assistDesc%22%3A%22%E5%BB%BA%E8%AE%AE%E6%82%A8%E8%80%83%E8%99%91%E5%85%B6%E4%BB%96%E5%87%BA%E8%A1%8C%E6%96%B9%E6%A1%88%22%2C%22desc%22%3A%22%E6%9C%AC%E7%BA%BF%E8%B7%AF%E5%B7%B2%E8%BF%87%E6%9C%AB%E7%8F%AD%22%2C%22direction%22%3A1%2C%22endSn%22%3A%22%E5%AE%9D%E5%9D%BB%E5%AE%A2%E8%BF%90%E7%AB%99%EF%BC%88%E5%85%AC%E4%BA%A4%E5%9C%BA%E7%AB%99%EF%BC%89%22%2C%22firstTime%22%3A%2206%3A30%22%2C%22h5NewStyle%22%3A0%2C%22hasBusInfo%22%3Afalse%2C%22isSubway%22%3A0%2C%22ksAssistDesc%22%3A%22%E5%BB%BA%E8%AE%AE%E8%80%83%E8%99%91%5Cn%E5%85%B6%E4%BB%96%E5%87%BA%E8%A1%8C%E6%96%B9%E6%A1%88%22%2C%22ksDesc%22%3A%22%E6%9C%AB%E7%8F%AD%E5%B7%B2%E8%BF%87%22%2C%22lastTime%22%3A%2217%3A30%22%2C%22lineId%22%3A%22002290094530%22%2C%22lineNo%22%3A%22%E5%AE%9D13%22%2C%22maxJoinOrder%22%3A0%2C%22name%22%3A%22%E5%AE%9D13%22%2C%22notNeedRealData%22%3Afalse%2C%22price%22%3A%222~6%E5%85%83%22%2C%22priceExpansion%22%3A%22%22%2C%22realCityId%22%3A%22006%22%2C%22segTimes%22%3A%5B%5B%2206%3A30%22%2C%2217%3A30%22%5D%5D%2C%22shortDesc%22%3A%22%E6%9C%AB%E7%8F%AD%E5%B7%B2%E8%BF%87%22%2C%22sortPolicy%22%3A%22flpolicy%3D0%22%2C%22startSn%22%3A%22%E4%BA%AC%E6%B4%A5%E6%96%B0%E5%9F%8E%22%2C%22state%22%3A-3%2C%22stationsNum%22%3A21%2C%22temOperation%22%3Afalse%2C%22thirdDir%22%3A0%2C%22type%22%3A0%2C%22version%22%3A%22%22%7D';
        break;
      default:
        pathPara = '';
    }
    path = `${path}?${pathPara}`;
    const chelaileWeappid = this.data.chelaileWeappid;
    wx.navigateToMiniProgram({
      appId: chelaileWeappid,
      path: path
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    var that = this;
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target.id)
    }
    return {
      title: '贝壳田园到' + that.data.tabs[that.data.activeIndex] + '出行方案',
      path: 'pages/traffic/bus?activeIndex=' + that.data.activeIndex,
    }
  }
});