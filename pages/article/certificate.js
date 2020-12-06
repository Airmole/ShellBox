// pages/article/certificate.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLoading:true,
    hasWeappMethod: ['http://cet.neea.edu.cn/cet/'],
    certList:[
      {
        title:'英语四六级(CET-4/6)',
        hookId:'cet',
        bgColor:'linear-gradient(to top, #8360c3, #2ebf91)',
        content:[{
          subtitle:'官网',
          url:'http://cet.neea.edu.cn/'
        },{
          subtitle:'报名',
          url:'http://cet-bm.neea.edu.cn/'
        },{
          subtitle:'成绩查询',
          url:'http://cet.neea.edu.cn/cet/'
        },{
          subtitle:'准考证',
          url:'http://cet-bm.neea.cn/Home/QueryTestTicket'
        }]
      },{
        title:'计算机等级考试(计算机二级)(NCRE)',
        hookId:'ncre',
        bgColor:'linear-gradient(to top, #544a7d, #ffd452)',
        content: [{
          subtitle:'官网',
          url:'http://ncre.neea.edu.cn/'
        },{
          subtitle:'报名',
          url:'https://ncre-bm.neea.cn/'
        },{
          subtitle:'成绩查询',
          url:'http://cjcx.neea.edu.cn/html1/folder/1508/206-1.htm?sid=300'
        }]
      },
      {
        title:'中小学教师资格考试(NTCE)',
        hookId:'ntce',
        bgColor:'linear-gradient(to top, #009fff, #ec2f4b)',
        content: [{
          subtitle:'官网',
          url:'http://ntce.neea.edu.cn/'
        },{
          subtitle:'报名',
          url:'http://ntce.neea.edu.cn/html1/folder/16013/15-1.htm'
        },{
          subtitle:'成绩查询',
          url:'http://cjcx.neea.edu.cn/html1/folder/1508/206-1.htm?sid=2nasVMoohJ6cFnsQEIjGYmh'
        },{
          subtitle:'合格证查询',
          url:'http://ntce.neea.edu.cn/html1/folder/1508/211-1.htm?sid=660'
        }]
      },
      {
        title:'英语专四专八考试(TEM-4/8)',
        hookId:'tem',
        bgColor:'linear-gradient(to top, #654ea3, #eaafc8)',
        content: [{
          subtitle:'官网',
          url:'http://tem.fltonline.cn/'
        },{
          subtitle:'TEM-4',
          url:'http://tem.fltonline.cn/?p=75109'
        },{
          subtitle:'TEM-8',
          url:'http://tem.fltonline.cn/?p=75109'
        },{
          subtitle:'报名',
          url:'仅支持学校英语专业统一组织报名'
        }]
      },
      {
        title:'会计资格证',
        hookId:'kzp',
        bgColor:'linear-gradient(to top, #ff416c, #ff4b2b)',
        content: [{
          subtitle:'官网',
          url:'http://kzp.mof.gov.cn/index.jsp'
        },{
          subtitle:'报名',
          url:'http://60.29.204.105:8080/index.jsp'
        },{
          subtitle:'成绩查询',
          url:'http://kzp.mof.gov.cn/cjcx/cjcx.jsp'
        }]
      },
      {
        title:'普通话水平测试(天津)',
        hookId:'cltt',
        bgColor:'linear-gradient(to top, #8a2387, #e94057, #f27121)',
        content: [{
          subtitle:'报名',
          url:'http://tj.cltt.org/Web/SignUpOnLine/Default.aspx'
        }]
      },
      {
        title:'软考(软件工程师考试)',
        hookId:'ruankao',
        bgColor:'linear-gradient(to top, #0f0c29, #302b63, #24243e)',
        content: [{
          subtitle:'官网',
          url:'https://www.ruankao.org.cn/'
        },{
          subtitle:'报名',
          url:'https://bm.ruankao.org.cn/sign/welcome'
        },{
          subtitle:'准考证',
          url:'https://bm.ruankao.org.cn/shortCut/searchCard'
        },{
          subtitle:'成绩查询',
          url:'https://query.ruankao.org.cn/score'
        }]
      },
      {
        title:'导游资格考试',
        hookId:'daoyou',
        bgColor:'linear-gradient(to top, #00b4db, #0083b0)',
        content: [{
          subtitle:'官网',
          url:'https://c-dy.exam-sp.com/'
        },{
          subtitle:'报名',
          url:'https://c-dy.exam-sp.com/#/default/examReg/chooseBatch'
        },{
          subtitle:'准考证',
          url:'https://c-dy.exam-sp.com/#/default/print'
        }]
      },
      {
        title:'证券从业资质考试',
        hookId:'zhengquan',
        bgColor:'linear-gradient(to top, #59c173, #a17fe0, #5d26c1)',
        content: [{
          subtitle:'官网',
          url:'https://www.sac.net.cn/cyry/kspt/kstz/'
        },{
          subtitle:'报名',
          url:'https://www.sac.net.cn/cyry/kspt/ksbm/'
        },{
          subtitle:'准考证',
          url:'https://www.sac.net.cn/cyry/kspt/zkzdy/'
        },{
          subtitle:'成绩',
          url:'https://www.sac.net.cn/cyry/kspt/kscjcx/'
        }]
      },
      {
        title:'基金从业资格考试',
        hookId:'jijin',
        bgColor:'linear-gradient(to top, #005aa7, #fffde4)',
        content: [{
          subtitle:'报名',
          url:'http://baoming.amac.org.cn:10080/JJKSreg/page.htm'
        }]
      },
      {
        title:'银行从业资格考试',
        hookId:'bank',
        bgColor:'linear-gradient(to top, #da4453, #89216b)',
        content: [{
          subtitle:'报名',
          url:'http://cj.ccbp.org.cn/apply/'
        }]
      },
      {
        title:'期货从业资格考试',
        hookId:'qihuo',
        bgColor:'linear-gradient(to top, #ad5389, #3c1053)',
        content: [{
          subtitle:'官网',
          url:'http://cfa.ata.net.cn/Portal/'
        },{
          subtitle:'报名',
          url:'http://cfa.ata.net.cn/site/#/default/login'
        }]
      },
      {
        title:'注册会计师考试',
        hookId:'cpa',
        bgColor:'linear-gradient(to top, #a8c0ff, #3f2b96)',
        content: [{
          subtitle:'官网',
          url:'http://cpaexam.cicpa.org.cn/default.shtml'
        },{
          subtitle:'报名',
          url:'http://cpaexam.cicpa.org.cn/login'
        },{
          subtitle:'成绩查询',
          url:'http://cpaexam.cicpa.org.cn/scorequeryhis'
        }]
      },
      {
        title:'法律职业资格考试',
        hookId:'laywer',
        bgColor:'linear-gradient(to top, #4e54c8, #8f94fb)',
        content: [{
          subtitle:'官网',
          url:'http://sfks.bjsf.gov.cn/jeplatform/websitebj/index.jsp'
        }]
      },
      {
        title:'剑桥商务英语(BEC)',
        hookId:'bec',
        bgColor:'linear-gradient(to top, #bc4e9c, #f80759)',
        content: [{
          subtitle:'官网',
          url:'http://bec.neea.cn/'
        }]
      },
      {
        title:'雅思(IELTS)',
        hookId:'ielts',
        bgColor:'linear-gradient(to top, #11998e, #38ef7d)',
        content: [{
          subtitle:'官网',
          url:'http://ielts-main.neea.cn/'
        },{
          subtitle:'报名',
          url:'https://ielts.neea.cn/'
        }]
      },
      {
        title:'托福(TOEFL)',
        hookId:'toefl',
        bgColor:'linear-gradient(to top, #fc5c7d, #6a82fb)',
        content: [{
          subtitle:'官网',
          url:'https://toefl.neea.cn/'
        },{
          subtitle:'报名',
          url:'https://toefl.neea.cn/examination_reg_cn.html'
        }]
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  copyUrl (e){
    const url = e.currentTarget.dataset.url

    wx.setClipboardData({
      data: url,
      success (res) {
        wx.getClipboardData({
          success (res) {
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
  goToHook (e){
    const hookId = e.currentTarget.dataset.target
    wx.pageScrollTo({
      duration: 2500,
      selector: '#'+hookId
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    setTimeout(function() {
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
      path: '/pages/article/certificate',
      success: function(res) {
        // 转发成功
      },
      fail: function(res) {
        // 转发失败
      }
    }
  },
  goToOtherWeapp (e) {
    if(e.currentTarget.dataset.url == 'http://cet.neea.edu.cn/cet/') {
      wx.navigateToMiniProgram({
        appId: 'wx2eec5fb00157a603',
        path: 'jiaoyubu/pages/business/cet/fillInfo/fillInfo',
      })
    }
  }
})