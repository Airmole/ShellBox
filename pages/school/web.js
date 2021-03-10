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
        background: 'https://upload-images.jianshu.io/upload_images/4697920-ca97074d1243fffe.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/300',
        url: ['http://tj.ustb.edu.cn']
      },
      {
        title: '教务系统',
        background: 'https://upload-images.jianshu.io/upload_images/4697920-787e052d3e7665ef.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/300',
        url: ['http://61.181.145.1:89/jsxsd', 'http://117.131.241.67:89/jsxsd']
      }],
      [{
        title: '财务(学费查询)',
        background: 'https://upload-images.jianshu.io/upload_images/4697920-d2ab5e318846aa1e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/300',
        url: ['http://221.238.213.131:8809']
      },
      {
        title: '网上大厅',
        background: 'https://upload-images.jianshu.io/upload_images/4697920-fba4d591bc4e12db.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/300',
        url: ['http://ehall.bkty.top']
      }]
    ],
    lan: [
      [{
        title: '学院官网',
        background: 'https://upload-images.jianshu.io/upload_images/4697920-ca97074d1243fffe.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/300',
        url: ['http://10.1.254.70']
      },
      {
        title: '冰炫导航',
        background: 'https://upload-images.jianshu.io/upload_images/4697920-37a3fb610b009bae.png',
        url: ['http://10.1.254.10']
      }],
      [{
        title: '冰炫音乐',
        background: 'https://upload-images.jianshu.io/upload_images/4697920-16b92386ba723bca.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/300',
        url: ['http://10.1.254.9/music']
      },
      {
        title: '冰炫下载',
        background: 'https://upload-images.jianshu.io/upload_images/4697920-ea0bdb72837f4913.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/300',
        url: ['http://10.1.254.9']
      }],
      [{
        title: '冰炫(贝壳)云盘',
        background: 'https://upload-images.jianshu.io/upload_images/4697920-fa718891fdd2fc7f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/300',
        url: ['http://10.1.254.11']
      },
      {
        title: '网费查询',
        background: 'https://upload-images.jianshu.io/upload_images/4697920-47af03f6ef28f6cb.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/300',
        url: ['http://10.1.254.112/Self']
      }],
      [{
        title: '教务系统',
        background: 'https://upload-images.jianshu.io/upload_images/4697920-787e052d3e7665ef.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/300',
        url: ['http://10.1.254.87/jsxsd']
      },
      {
        title: '图书检索',
        background: 'https://upload-images.jianshu.io/upload_images/4697920-765b32fff4c66960.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/300',
        url: ['http://10.1.254.101:82']
      }],
      [{
        title: '图书馆数字资源',
        background: 'https://upload-images.jianshu.io/upload_images/4697920-232adc10bb7d5e25.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/300',
        url: ['http://10.1.254.107']
      },
      {
        title: '图书馆',
        background: 'https://upload-images.jianshu.io/upload_images/4697920-0670bb0194353ffa.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/300',
        url: ['http://10.1.254.101']
      }],
      [{
        title: 'Git.USTB',
        background: 'https://upload-images.jianshu.io/upload_images/4697920-b81d3c7a00aa23e4.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/300',
        url: ['http://10.1.254.6']
      },
      {
        title: '财务(学费查询)',
        background: 'https://upload-images.jianshu.io/upload_images/4697920-d2ab5e318846aa1e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/300',
        url: ['http://10.2.254.80:8809']
      }],
      [{
        title: '财管系统',
        background: 'https://upload-images.jianshu.io/upload_images/4697920-20a71970611df775.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/300',
        url: ['http://10.2.254.80']
      },
      {
        title: '资产与实验室管理',
        background: 'https://upload-images.jianshu.io/upload_images/4697920-ff12f7c7774172c2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/300',
        url: ['http://10.1.254.170']
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
      path: '/pages/article/websites',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})