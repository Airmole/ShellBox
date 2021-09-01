// pages/school/finance/component/feeRecord.js
Component({
  options: {
    addGlobalClass: true,
  },
  /**
   * 组件的属性列表
   */
  properties: {
  },

  /**
   * 组件的初始数据
   */
  data: {
    datalist: []
  },
  lifetimes: {
    attached: function() {
      // 在组件实例进入页面节点树时执行
      this.inital()
    },
    detached: function() {
      // 在组件实例被从页面节点树移除时执行
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    inital: function (params) {
      this.formatDatalist()
    },
    formatDatalist: function () {
      
      let jsonStr = '[{"ParentTaskUID":-98318,"UID":274892,"xmmc":"学费","rybh":"181150336","rymc":"张凌霄","bmbh":"20180603-3","bmmc":"造价1803","sfnd":"2020","sfqjbh":"001","sfqjmc":"学年","yysje":"16,000.00","tzje":"0.00","xysje":"16,000.00","sjje":"16,000.00","dkje":"0.00","tfje":"0.00","jmje":"0.00","jfcs":1},{"ParentTaskUID":274892,"UID":1271668,"xmmc":"学费","rybh":"181150336","rymc":"张凌霄","bmbh":"20180603-3","bmmc":"造价1803","sfnd":"2020","sfqjbh":"001","sfqjmc":"学年","yysje":"0.00","tzje":"0.00","xysje":"0.00","sjje":"16,000.00","dkje":"0.00","tfje":"0.00","jmje":"0.00","jfcs":1},{"ParentTaskUID":-98318,"UID":236939,"xmmc":"学费","rybh":"181150336","rymc":"张凌霄","bmbh":"20180603-3","bmmc":"造价1803","sfnd":"2019","sfqjbh":"001","sfqjmc":"学年","yysje":"16,000.00","tzje":"0.00","xysje":"16,000.00","sjje":"16,000.00","dkje":"0.00","tfje":"0.00","jmje":"0.00","jfcs":1},{"ParentTaskUID":236939,"UID":1100425,"xmmc":"学费","rybh":"181150336","rymc":"张凌霄","bmbh":"20180603-3","bmmc":"造价1803","sfnd":"2019","sfqjbh":"001","sfqjmc":"学年","yysje":"0.00","tzje":"0.00","xysje":"0.00","sjje":"16,000.00","dkje":"0.00","tfje":"0.00","jmje":"0.00","jfcs":1},{"ParentTaskUID":-98318,"UID":224073,"xmmc":"学费","rybh":"181150336","rymc":"张凌霄","bmbh":"20180603-3","bmmc":"造价1803","sfnd":"2018","sfqjbh":"001","sfqjmc":"学年","yysje":"16,000.00","tzje":"0.00","xysje":"16,000.00","sjje":"16,000.00","dkje":"0.00","tfje":"0.00","jmje":"0.00","jfcs":1},{"ParentTaskUID":224073,"UID":949038,"xmmc":"学费","rybh":"181150336","rymc":"张凌霄","bmbh":"20180603-3","bmmc":"造价1803","sfnd":"2018","sfqjbh":"001","sfqjmc":"学年","yysje":"0.00","tzje":"0.00","xysje":"0.00","sjje":"16,000.00","dkje":"0.00","tfje":"0.00","jmje":"0.00","jfcs":1},{"ParentTaskUID":-98318,"UID":311735,"xmmc":"学费","rybh":"181150336","rymc":"张凌霄","bmbh":"20180603-3","bmmc":"造价1803","sfnd":"2021","sfqjbh":"001","sfqjmc":"学年","yysje":"16,000.00","tzje":"0.00","xysje":"16,000.00","sjje":"16,000.00","dkje":"0.00","tfje":"0.00","jmje":"0.00","jfcs":1},{"ParentTaskUID":311735,"UID":1384441,"xmmc":"学费","rybh":"181150336","rymc":"张凌霄","bmbh":"20180603-3","bmmc":"造价1803","sfnd":"2021","sfqjbh":"001","sfqjmc":"学年","yysje":"0.00","tzje":"0.00","xysje":"0.00","sjje":"16,000.00","dkje":"0.00","tfje":"0.00","jmje":"0.00","jfcs":1},{"ParentTaskUID":-1,"UID":-98318,"xmmc":"学费","rybh":"181150336","rymc":"张凌霄","bmbh":"20180603-3","bmmc":"造价1803","sfnd":"--","sfqjbh":null,"sfqjmc":"--","yysje":"64,000.00","tzje":"0.00","xysje":"64,000.00","sjje":"64,000.00","dkje":"0.00","tfje":"0.00","jmje":"0.00","jfcs":4},{"ParentTaskUID":-98319,"UID":269125,"xmmc":"住宿费","rybh":"181150336","rymc":"张凌霄","bmbh":"20180603-3","bmmc":"造价1803","sfnd":"2020","sfqjbh":"001","sfqjmc":"学年","yysje":"1,500.00","tzje":"0.00","xysje":"1,500.00","sjje":"1,500.00","dkje":"0.00","tfje":"0.00","jmje":"0.00","jfcs":2},{"ParentTaskUID":269125,"UID":1269462,"xmmc":"住宿费","rybh":"181150336","rymc":"张凌霄","bmbh":"20180603-3","bmmc":"造价1803","sfnd":"2020","sfqjbh":"001","sfqjmc":"学年","yysje":"0.00","tzje":"0.00","xysje":"0.00","sjje":"750.00","dkje":"0.00","tfje":"0.00","jmje":"0.00","jfcs":1},{"ParentTaskUID":269125,"UID":1271669,"xmmc":"住宿费","rybh":"181150336","rymc":"张凌霄","bmbh":"20180603-3","bmmc":"造价1803","sfnd":"2020","sfqjbh":"001","sfqjmc":"学年","yysje":"0.00","tzje":"0.00","xysje":"0.00","sjje":"750.00","dkje":"0.00","tfje":"0.00","jmje":"0.00","jfcs":1},{"ParentTaskUID":-98319,"UID":243926,"xmmc":"住宿费","rybh":"181150336","rymc":"张凌霄","bmbh":"20180603-3","bmmc":"造价1803","sfnd":"2019","sfqjbh":"001","sfqjmc":"学年","yysje":"1,500.00","tzje":"-750.00","xysje":"750.00","sjje":"1,500.00","dkje":"0.00","tfje":"750.00","jmje":"0.00","jfcs":1},{"ParentTaskUID":243926,"UID":1100426,"xmmc":"住宿费","rybh":"181150336","rymc":"张凌霄","bmbh":"20180603-3","bmmc":"造价1803","sfnd":"2019","sfqjbh":"001","sfqjmc":"学年","yysje":"0.00","tzje":"0.00","xysje":"0.00","sjje":"1,500.00","dkje":"0.00","tfje":"0.00","jmje":"0.00","jfcs":1},{"ParentTaskUID":-98319,"UID":228659,"xmmc":"住宿费","rybh":"181150336","rymc":"张凌霄","bmbh":"20180603-3","bmmc":"造价1803","sfnd":"2018","sfqjbh":"001","sfqjmc":"学年","yysje":"1,500.00","tzje":"0.00","xysje":"1,500.00","sjje":"1,500.00","dkje":"0.00","tfje":"0.00","jmje":"0.00","jfcs":1},{"ParentTaskUID":228659,"UID":949037,"xmmc":"住宿费","rybh":"181150336","rymc":"张凌霄","bmbh":"20180603-3","bmmc":"造价1803","sfnd":"2018","sfqjbh":"001","sfqjmc":"学年","yysje":"0.00","tzje":"0.00","xysje":"0.00","sjje":"1,500.00","dkje":"0.00","tfje":"0.00","jmje":"0.00","jfcs":1},{"ParentTaskUID":-98319,"UID":304755,"xmmc":"住宿费","rybh":"181150336","rymc":"张凌霄","bmbh":"20180603-3","bmmc":"造价1803","sfnd":"2021","sfqjbh":"001","sfqjmc":"学年","yysje":"1,500.00","tzje":"0.00","xysje":"1,500.00","sjje":"1,500.00","dkje":"0.00","tfje":"0.00","jmje":"0.00","jfcs":1},{"ParentTaskUID":304755,"UID":1384442,"xmmc":"住宿费","rybh":"181150336","rymc":"张凌霄","bmbh":"20180603-3","bmmc":"造价1803","sfnd":"2021","sfqjbh":"001","sfqjmc":"学年","yysje":"0.00","tzje":"0.00","xysje":"0.00","sjje":"1,500.00","dkje":"0.00","tfje":"0.00","jmje":"0.00","jfcs":1},{"ParentTaskUID":-1,"UID":-98319,"xmmc":"住宿费","rybh":"181150336","rymc":"张凌霄","bmbh":"20180603-3","bmmc":"造价1803","sfnd":"--","sfqjbh":null,"sfqjmc":"--","yysje":"6,000.00","tzje":"-750.00","xysje":"5,250.00","sjje":"6,000.00","dkje":"0.00","tfje":"0.00","jmje":"0.00","jfcs":5},{"ParentTaskUID":-98320,"UID":231187,"xmmc":"保险费","rybh":"181150336","rymc":"张凌霄","bmbh":"20180603-3","bmmc":"造价1803","sfnd":"2018","sfqjbh":"001","sfqjmc":"学年","yysje":"800.00","tzje":"0.00","xysje":"800.00","sjje":"800.00","dkje":"0.00","tfje":"0.00","jmje":"0.00","jfcs":1},{"ParentTaskUID":231187,"UID":949039,"xmmc":"保险费","rybh":"181150336","rymc":"张凌霄","bmbh":"20180603-3","bmmc":"造价1803","sfnd":"2018","sfqjbh":"001","sfqjmc":"学年","yysje":"0.00","tzje":"0.00","xysje":"0.00","sjje":"800.00","dkje":"0.00","tfje":"0.00","jmje":"0.00","jfcs":1},{"ParentTaskUID":-1,"UID":-98320,"xmmc":"保险费","rybh":"181150336","rymc":"张凌霄","bmbh":"20180603-3","bmmc":"造价1803","sfnd":"--","sfqjbh":null,"sfqjmc":"--","yysje":"800.00","tzje":"0.00","xysje":"800.00","sjje":"800.00","dkje":"0.00","tfje":"0.00","jmje":"0.00","jfcs":1},{"ParentTaskUID":-98321,"UID":234051,"xmmc":"体检费","rybh":"181150336","rymc":"张凌霄","bmbh":"20180603-3","bmmc":"造价1803","sfnd":"2018","sfqjbh":"001","sfqjmc":"学年","yysje":"22.00","tzje":"0.00","xysje":"22.00","sjje":"22.00","dkje":"0.00","tfje":"0.00","jmje":"0.00","jfcs":1},{"ParentTaskUID":234051,"UID":949040,"xmmc":"体检费","rybh":"181150336","rymc":"张凌霄","bmbh":"20180603-3","bmmc":"造价1803","sfnd":"2018","sfqjbh":"001","sfqjmc":"学年","yysje":"0.00","tzje":"0.00","xysje":"0.00","sjje":"22.00","dkje":"0.00","tfje":"0.00","jmje":"0.00","jfcs":1},{"ParentTaskUID":-1,"UID":-98321,"xmmc":"体检费","rybh":"181150336","rymc":"张凌霄","bmbh":"20180603-3","bmmc":"造价1803","sfnd":"--","sfqjbh":null,"sfqjmc":"--","yysje":"22.00","tzje":"0.00","xysje":"22.00","sjje":"22.00","dkje":"0.00","tfje":"0.00","jmje":"0.00","jfcs":1}]';
      let array = JSON.parse(jsonStr)
      let result = []
      // 一级目录
      array.forEach(element => {
        if (element.ParentTaskUID == -1) {
          element.unfold = true
          result.push(element)
        }
      })
      // 二级目录
      array.forEach(element => {
        result.forEach(function(subele, subidx) {
          if (!subele.children) {
            result[subidx].children = []
          }
          if (element.ParentTaskUID == subele.UID) {
            result[subidx].children.push(element)
          }
        })
      })
      // 三级目录
      array.forEach(element => {
        result.forEach(function(subele, subidx) {
          subele.children.forEach(function(ssubele, ssubidx) {
            if (!ssubele.children) {
              result[subidx].children[ssubidx].children = []
            }
            if (element.ParentTaskUID == ssubele.UID) {
              result[subidx].children[ssubidx].children.push(element)
            }
          })
        })
      })
      // console.log(result)
      this.setData({ datalist: result })
    },
    fold: function (e) {
      const index = e.currentTarget.dataset.index
      let datalist = this.data.datalist
      datalist[index].unfold = !datalist[index].unfold
      this.setData({ datalist: datalist })
    }
  }
})
