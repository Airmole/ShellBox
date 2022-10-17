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
        background: 'https://upload-images.jianshu.io/upload_images/4697920-cb8ee15220e00023.png',
        url: ['http://tj.ustb.edu.cn']
      },
      {
        title: '教务系统',
        background: 'https://upload-images.jianshu.io/upload_images/4697920-31abfba9d10d4f20.png',
        url: ['http://61.181.145.1:89/jsxsd', 'http://117.131.241.67:89/jsxsd']
      }],
      [{
        title: '财务(学费查询)',
        background: 'https://upload-images.jianshu.io/upload_images/4697920-487ee29d884cc028.png',
        url: ['http://221.238.213.131:8809']
      },
      {
        title: '网上大厅',
        background: 'https://upload-images.jianshu.io/upload_images/4697920-dba3529e96f74efb.png',
        url: ['http://ehall.bkty.top']
      }]
    ],
    lan: [
      [{
        title: '学院官网',
        background: 'https://upload-images.jianshu.io/upload_images/4697920-cb8ee15220e00023.png',
        url: ['http://10.1.254.70']
      },
      {
        title: '网费查询',
        background: 'https://upload-images.jianshu.io/upload_images/4697920-45814d1b2fa8da6c.png',
        url: ['http://10.1.254.112/Self']
      }],
      [{
        title: '入党学习',
        background: 'https://upload-images.jianshu.io/upload_images/4697920-cb05959c5e47abfc.png',
        url: ['http://10.1.254.27']
      }, {
        title: '校园网计费登录',
        background: 'https://upload-images.jianshu.io/upload_images/4697920-61231fefddf211ac.png',
        url: ['http://172.16.1.3']
      }],
      [{
        title: '教务系统',
        background: 'https://upload-images.jianshu.io/upload_images/4697920-31abfba9d10d4f20.png',
        url: ['http://10.1.254.87/jsxsd']
      },
      {
        title: '图书检索',
        background: 'https://upload-images.jianshu.io/upload_images/4697920-0b70730a135ad56d.png',
        url: ['http://10.1.254.101:82']
      }],
      [{
        title: '图书馆数字资源',
        background: 'https://upload-images.jianshu.io/upload_images/4697920-627c8c3607690f6d.png',
        url: ['http://10.1.254.107']
      },
      {
        title: '图书馆',
        background: 'https://upload-images.jianshu.io/upload_images/4697920-47370bd93784207a.png',
        url: ['http://10.1.254.101']
      }],
      [{
        title: '财务(学费查询)',
        background: 'https://upload-images.jianshu.io/upload_images/4697920-487ee29d884cc028.png',
        url: ['http://10.2.254.80:8809']
      },{
        title: '财管系统',
        background: 'https://upload-images.jianshu.io/upload_images/4697920-487ee29d884cc028.png',
        url: ['http://10.2.254.80']
      }],
      [{
        title: '资产与实验室管理',
        background: 'https://upload-images.jianshu.io/upload_images/4697920-c86e5b66a7e513ec.png',
        url: ['http://10.1.254.170']
      }, {
        title: '心理咨询中心',
        background: 'https://upload-images.jianshu.io/upload_images/4697920-48dab9eddafb6ce3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/300',
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