// pages/school/cert.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLoading: true,
    hasWeappMethod: ['http://cet.neea.edu.cn/cet/'],
    cardColor: ['red', 'orange', 'yellow', 'olive', 'green', 'blue', 'purple', 'mauve', 'pink'],
    certList: [
      {
        title: '英语四六级(CET-4/6)',
        hookId: 'cet',
        content: [{
          subtitle: '官网',
          url: 'http://cet.neea.edu.cn/'
        }, {
          subtitle: '报名',
          url: 'http://cet-bm.neea.edu.cn/'
        }, {
          subtitle: '成绩查询',
          url: 'http://cet.neea.edu.cn/cet/'
        }]
      }, {
        title: '计算机等级考试(计算机二级)(NCRE)',
        hookId: 'ncre',
        content: [{
          subtitle: '官网',
          url: 'http://ncre.neea.edu.cn/'
        }, {
          subtitle: '报名',
          url: 'https://ncre-bm.neea.cn/'
        }, {
          subtitle: '成绩查询',
          url: 'http://cjcx.neea.edu.cn/html1/folder/1508/206-1.htm?sid=300'
        }]
      },
      {
        title: '中小学教师资格考试(NTCE)',
        hookId: 'ntce',
        content: [{
          subtitle: '官网',
          url: 'http://ntce.neea.edu.cn/'
        }, {
          subtitle: '报名',
          url: 'http://ntce.neea.edu.cn/html1/folder/16013/15-1.htm'
        }, {
          subtitle: '成绩查询',
          url: 'http://cjcx.neea.edu.cn/html1/folder/1508/206-1.htm?sid=2nasVMoohJ6cFnsQEIjGYmh'
        }, {
          subtitle: '合格证查询',
          url: 'http://ntce.neea.edu.cn/html1/folder/1508/211-1.htm?sid=660'
        }]
      },
      {
        title: '英语专四专八考试(TEM-4/8)',
        hookId: 'tem',
        content: [{
          subtitle: '官网',
          url: 'http://tem.fltonline.cn/'
        }, {
          subtitle: 'TEM-4',
          url: 'http://tem.fltonline.cn/?p=75109'
        }, {
          subtitle: 'TEM-8',
          url: 'http://tem.fltonline.cn/?p=75109'
        }, {
          subtitle: '报名',
          url: '仅支持学校英语专业统一组织报名'
        }]
      },
      {
        title: '会计资格证',
        hookId: 'kzp',
        content: [{
          subtitle: '官网',
          url: 'http://kzp.mof.gov.cn/index.jsp'
        }, {
          subtitle: '成绩查询',
          url: 'http://kzp.mof.gov.cn/cjcx/cjcx.jsp'
        }]
      },
      {
        title: '普通话水平测试',
        hookId: 'cltt',
        content: [{
          subtitle: '报名',
          url: 'http://bm.cltt.org/'
        }]
      },
      {
        title: '软考(软件工程师考试)',
        hookId: 'ruankao',
        content: [{
          subtitle: '官网',
          url: 'https://www.ruankao.org.cn/'
        }, {
          subtitle: '报名',
          url: 'https://bm.ruankao.org.cn/sign/welcome'
        }]
      },
      {
        title: '证券从业资质考试',
        hookId: 'zhengquan',
        content: [{
          subtitle: '官网',
          url: 'https://www.sac.net.cn/cyry/kspt/kstz/'
        }]
      },
      {
        title: '基金从业资格考试',
        hookId: 'jijin',
        content: [{
          subtitle: '报名',
          url: 'https://www.amac.org.cn/'
        }]
      },
      {
        title: '银行从业资格考试',
        hookId: 'bank',
        content: [{
          subtitle: '官网',
          url: 'https://www.china-cba.net/Index/lists/catid/31.html'
        },{
          subtitle: '报名',
          url: 'http://cj.ccbp.org.cn/apply/'
        }]
      },
      {
        title: '期货从业资格考试',
        hookId: 'qihuo',
        content: [{
          subtitle: '报名',
          url: 'http://cfa.ata.net.cn/site/#/default/login'
        }]
      },
      {
        title: '注册会计师考试',
        hookId: 'cpa',
        content: [{
          subtitle: '官网',
          url: 'https://www.cicpa.org.cn/'
        }, {
          subtitle: '报名',
          url: 'https://www.cicpa.org.cn/ztzl1/exam/'
        }]
      },
      {
        title: '法律职业资格考试',
        hookId: 'laywer',
        content: [{
          subtitle: '官网',
          url: 'http://www.moj.gov.cn/jgsz/jgszzsdw/zsdwgjsfkszx/'
        }]
      },
      {
        title: '剑桥商务英语(BEC)',
        hookId: 'bec',
        content: [{
          subtitle: '官网',
          url: 'http://bec.neea.cn/'
        }]
      },
      {
        title: '雅思(IELTS)',
        hookId: 'ielts',
        content: [{
          subtitle: '官网',
          url: 'http://ielts-main.neea.cn/'
        }, {
          subtitle: '报名',
          url: 'https://ielts.neea.cn/'
        }]
      },
      {
        title: '托福(TOEFL)',
        hookId: 'toefl',
        content: [{
          subtitle: '官网',
          url: 'https://toefl.neea.cn/'
        }, {
          subtitle: '报名',
          url: 'https://toefl.neea.cn/examination_reg_cn.html'
        }]
      }
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
  goToHook(e) {
    const hookId = e.currentTarget.dataset.target
    wx.pageScrollTo({
      duration: 2500,
      selector: '#' + hookId
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
      title: '“贝壳小盒子” - 考证助手',
      path: 'pages/school/cert'
    }
  },
  goToOtherWeapp(e) {
    if (e.currentTarget.dataset.url == 'http://cet.neea.edu.cn/cet/') {
      wx.navigateToMiniProgram({
        appId: 'wx2eec5fb00157a603',
        path: 'jiaoyubu/pages/business/cet/fillInfo/fillInfo',
      })
    }
  }
})