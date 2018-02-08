Page({
  data: {
    array: ['通信1601','通信1602','自动化1601','自动化1602','计算机1601','计算机1602','计算机1603','计算机1604','计算机1605',"点我选班级"],
    objectArray: [
      {
        id: 0,
        name: '通信1601'
      },
      {
        id: 1,
        name: '通信1602'
      },
      {
        id: 2,
        name: '自动化1601'
      },{
        id: 3,
        name: "自动化1602"
      },{
        id: 4,
        name: "计算机1601"
      }, {
        id: 5,
        name: "计算机1602"
      }, {
        id: 6,
        name: "计算机1603"
      }, {
        id: 7,
        name: "计算机1604"
      }, {
        id: 8,
        name: "计算机1605"
      }, {
        id: 9,
        name: "点我选班级"
      }
    ],
    index: 9,
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为',e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
})