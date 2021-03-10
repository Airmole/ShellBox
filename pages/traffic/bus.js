var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

Page({
  data: {
    tabs: ["北京", "天津", "宝坻"],
    activeIndex: 1,
    sliderOffset: 0,
    sliderLeft: 0,
    isLoading: true,
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
    busBao13:[
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
  onLoad: function(r) {
    var that = this;
    that.inital();
    if (r.activeIndex) {
      that.setData({
        sliderOffset: r.activeIndex * that.data.sliderOffset,
        activeIndex: r.activeIndex,
      })
    }
  },
  inital:function () {
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
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
  onReady: function() {
    var that = this;
    setTimeout(function() {
      that.setData({
        isLoading: false
      });
    }, 400);
  },
  tabClick: function(e) {
    this.setData({
      activeIndex: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id-1)*60
    })
  },
  goJJXCStation: function() {
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
  goBJGMStation: function() {
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
  showBjBusQrcode: function (){
    wx.previewImage({
      urls: ['https://upload-images.jianshu.io/upload_images/4697920-b963b368eec6df87.png'],
    })
  },
  chelaile160:function () {
    wx.navigateToMiniProgram({
      appId: 'wx71d589ea01ce3321',
      path: '/pages/linedetail2/linedetail?referer=home_favorite&targetStop={"couponFlag":0,"distanceToSp":-1,"lat":39.550400628154215,"lng":117.39601432727834,"order":1,"sId":"022-10010","sn":"北京科技大学天津学院西门"}&nextStop={}&city={"cityId":"006","cityLogoUrl":"https://image3.chelaile.net.cn/2c988cf5f09f4d19be781288ac8a49bb","cityName":"天津","cityVersion":0,"isGpsCity":0,"isHot":1,"isNewCity":0,"isSupport":1,"pinyin":"TianJin","supportSubway":1,"wechatFavoriteGray":0,"icoName":"tianjin","localCityId":"036"}&line={"lineId":"0022136478519","lineName":"160","direction":0,"lineNo":"160"}'
    })
  },
  chelaileBao13: function () {
    wx.navigateToMiniProgram({
      appId: 'wx71d589ea01ce3321',
      path: '/pages/linedetail2/linedetail?referer=home_favorite&targetStop={"couponFlag":0,"distanceToSp":-1,"lat":39.550400628154215,"lng":117.39601432727834,"order":2,"sId":"022-10010","sn":"北京科技大学天津学院西门"}&nextStop={}&city={"cityId":"006","cityLogoUrl":"https://image3.chelaile.net.cn/2c988cf5f09f4d19be781288ac8a49bb","cityName":"天津","cityVersion":0,"isGpsCity":0,"isHot":1,"isNewCity":0,"isSupport":1,"pinyin":"TianJin","supportSubway":1,"wechatFavoriteGray":0,"icoName":"tianjin","localCityId":"036"}&line={"lineId":"002290094530","lineName":"宝13","direction":0,"lineNo":"宝13"}'
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function(res) {
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