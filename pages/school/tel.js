const app = getApp();
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    hidden: true,
    keyword: '',
    backLists: {},
    telLists: {
      'A': [],
      'B':[
        { name: '保卫处', tel: '22411900'}
      ],
      'C': [
        { name: '材料系', tel: '22410516'},
        { name: '财务处', tel: '22410769'},
        { name: '财务处', tel: '22410897'},
        { name: '城市建设学院', tel: '22410703'}
      ],
      'D': [
        { name: '档案室', tel: '22410779'}
      ],
      'E': [],
      'F': [
        { name: '法律系', tel: '22410391'}
      ],
      'G': [
        { name: '管理学院', tel: '22410705'},
        { name: '国际合作交流部', tel: '22410389'}
      ],
      'H': [
        { name: '后勤处', tel: '22410722'},
        { name: '护理系', tel: '22423905'}
      ],
      'I': [],
      'J': [
        { name: '机械系', tel: '22410508'},
        { name: '基础部', tel: '22410502'},
        { name: '基建产业处', tel: '22410976'},
        { name: '教务处', tel: '22410731'},
        { name: '教务处', tel: '22410555'},
        { name: '经济学院', tel: '22410728'}
      ],
      'K': [
        { name: '科研处', tel: '22410737'}
      ],
      'L': [],
      'M': [],
      'N': [],
      'O': [],
      'P': [],
      'Q': [],
      'R': [
        { name: '人事处', tel: '22410768'},
        { name: '人事处', tel: '22410077'},
      ],
      'S': [
        { name: '思政部', tel: '22410736'}
      ],
      'T': [
        { name: '体育部', tel: '22410422'},
        { name: '图书馆', tel: '22410526'},
        { name: '团委', tel: '22410730'}
      ],
      'U': [],
      'V': [],
      'W': [
        { name: '外语系', tel: '22410523'},
        { name: '网络中心', tel: '22410719'},
      ],
      'X': [
        { name: '心理咨询中心', tel: '22410981'},
        { name: '信息学院', tel: '22410704'},
        { name: '宣传部', tel: '22410352'},
        { name: '学生工作办公室', tel: '22410298'},
        { name: '学院报警电话', tel: '22411110'},
        { name: '学院办公室', tel: '22410800'},
      ],
      'Y': [
        { name: '艺术系', tel: '22410348'},
      ],
      'Z': [
        { name: '招办就业处(招生)', tel: '22410960'},
        { name: '招办就业处(招生)', tel: '22410969'},
        { name: '招办就业处(就业)', tel: '22412672'},
        { name: '招办就业处(就业)', tel: '22412901'},
        { name: '资产管理中心', tel: '22410919'}
      ]
    }
  },
  onLoad() {
    let list = [];
    for (let i = 0; i < 26; i++) {
      list[i] = String.fromCharCode(65 + i)
    }

    var _this = this;
    this.setData({
      list: list,
      listCur: 'B',
      backLists: _this.data.telLists
    })
    this.inital();
  },
  inital: function () {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
  },
  onReady() {
    let that = this;
    wx.createSelectorQuery().select('.indexBar-box').boundingClientRect(function(res) {
      that.setData({
        boxTop: res.top
      })
    }).exec();
    wx.createSelectorQuery().select('.indexes').boundingClientRect(function(res) {
      that.setData({
        barTop: res.top
      })
    }).exec()
  },
  //获取文字信息
  getCur(e) {
    var _this = this;
    this.setData({
      hidden: false,
      listCur: _this.data.list[e.target.id],
    })
  },

  setCur(e) {
    this.setData({
      hidden: true,
      listCur: this.data.listCur
    })
  },
  //滑动选择Item
  tMove(e) {
    let y = e.touches[0].clientY,
      offsettop = this.data.boxTop,
      that = this;
    //判断选择区域,只有在选择区才会生效
    if (y > offsettop) {
      let num = parseInt((y - offsettop) / 20);
      this.setData({
        listCur: that.data.list[num]
      })
    };
  },

  //触发全部开始选择
  tStart() {
    this.setData({
      hidden: false
    })
  },
  //触发结束选择
  tEnd() {
    this.setData({
      hidden: true,
      listCurID: this.data.listCur
    })
  },
  indexSelect(e) {
    let that = this;
    let barHeight = this.data.barHeight;
    let list = this.data.list;
    let scrollY = Math.ceil(list.length * e.detail.y / barHeight);
    for (let i = 0; i < list.length; i++) {
      if (scrollY < i + 1) {
        that.setData({
          listCur: list[i],
          movableY: i * 20
        })
        return false
      }
    }
  },
  searchInput: function (e) {
    var keyword = e.detail.value;
    var telLists = this.data.backLists;
    var resultLists = {};
    var hasResult = false;
    var _this = this;
  
    if(keyword.length<1){
      this.setData({ telLists: _this.data.backLists });
      return;
    }
    for (let index in telLists){
      let element = telLists[index];
      resultLists[index] = [];
      element.forEach((ele, ind) => {
        if(ele.name.indexOf(keyword) != -1 || ele.tel.indexOf(keyword) != -1){
          resultLists[index].push(ele);
          hasResult = true;
        }
      });
    }
    this.setData({
      keyword: keyword,
      telLists: resultLists
    })
  },
  clearSearch: function () {
    var _this = this;
    this.setData({ telLists: _this.data.backLists, keyword: ''});
  },
  callPhone: function (e) {
    var tel = '022' + e.currentTarget.dataset.tel;
    wx.makePhoneCall({ phoneNumber: tel });
  },
  copyTel: function(e) {
    var tel = '022' + e.currentTarget.dataset.tel;
    wx.setClipboardData({
      data: tel
    })
    wx.showToast({
      title: '已复制到粘贴版',
      icon: 'none',
      duration: 1000
    });
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '“贝壳小盒子” - 部门电话',
      path: 'pages/school/tel'
    }
  }
});
