// pages/school/web.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isLoading: true,
    wan: [
      [{
        title: '学院官网',
        background: 'https://cdn.airmole.cn/website/school_homepage.png',
        url: ['http://tj.ustb.edu.cn']
      },
      {
        title: '教务系统',
        background: 'https://cdn.airmole.cn/website/school_edusys.png',
        url: ['http://61.181.145.1:89/jsxsd', 'http://117.131.241.67:89/jsxsd']
      }],
      [{
        title: '财务(学费查询)',
        background: 'https://cdn.airmole.cn/website/school_finansys.png',
        url: ['http://221.238.213.131:8809']
      },
      {
        title: '网上大厅',
        background: 'https://cdn.airmole.cn/website/school_ehall.png',
        url: ['http://ehall.bkty.top']
      }]
    ],
    lan: [
      [{
        title: '学院官网',
        background: 'https://cdn.airmole.cn/website/school_homepage.png',
        url: ['http://10.1.254.70']
      },
      {
        title: '网费查询',
        background: 'https://cdn.airmole.cn/website/school_netfare.png',
        url: ['http://10.1.254.112/Self']
      }],
      [{
        title: '入党学习',
        background: 'https://cdn.airmole.cn/website/school_joinparty.png',
        url: ['http://10.1.254.27']
      }, {
        title: '校园网计费登录',
        background: 'https://cdn.airmole.cn/website/school_schoolnet.png',
        url: ['http://172.16.1.3']
      }],
      [{
        title: '教务系统',
        background: 'https://cdn.airmole.cn/website/school_edusys.png',
        url: ['http://10.1.254.87/jsxsd']
      },
      {
        title: '图书检索',
        background: 'https://cdn.airmole.cn/website/school_opac.png',
        url: ['http://10.1.254.101:82']
      }],
      [{
        title: '图书馆数字资源',
        background: 'https://cdn.airmole.cn/website/school_ebook.png',
        url: ['http://10.1.254.107']
      },
      {
        title: '图书馆',
        background: 'https://cdn.airmole.cn/website/school_library.png',
        url: ['http://10.1.254.101']
      }],
      [{
        title: '财务(学费查询)',
        background: 'https://cdn.airmole.cn/website/school_finansys.png',
        url: ['http://10.2.254.80:8809']
      },{
        title: '财管系统',
        background: 'https://cdn.airmole.cn/website/school_finansys.png',
        url: ['http://10.2.254.80']
      }],
      [{
        title: '资产与实验室管理',
        background: 'https://cdn.airmole.cn/website/school_laboratory.png',
        url: ['http://10.1.254.170']
      }, {
        title: '心理咨询中心',
        background: 'https://cdn.airmole.cn/static/green_girl_background.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/300',
        url: ['http://10.1.254.51']
      }]
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.inital();
  },
  inital: function () {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
  },
  copyUrl(e) {
    const url = e.currentTarget.dataset.url

    wx.setClipboardData({
      data: url,
      success(res) {
        wx.getClipboardData({
          success(res) {
            console.log(res.data) // data
            wx.showToast({
              title: '复制成功,粘贴到浏览器访问',
              icon: 'none'
            })
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    setTimeout(function () {
      that.setData({
        isLoading: false
      });
    }, 400);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '“贝壳小盒子” - 校园站点',
      path: 'pages/school/web'
    }
  }
})