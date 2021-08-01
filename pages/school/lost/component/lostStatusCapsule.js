// pages/school/lost/component/lostStatus.js
Component({
  options: {
    styleIsolation: 'shared'
  },
  /**
   * 组件的属性列表
   */
  properties: {
    data: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    lostStatus: ['无人拾获' ,'有人拾获', '物归原主'],
    receiveStatus: ['无人认领' ,'有人认领', '物归原主']
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
