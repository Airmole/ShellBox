// pages/school/movie.js
const app = getApp()
import todo from '../../utils/calendar/plugins/todo'
import plugin from '../../utils/calendar/plugins/index'

plugin.use(todo)

const conf = {
  data: {
    calendarConfig: {
      theme: 'default',
      firstDayOfWeek: 'Mon',
    },
    checkedDate: '',
    movieList: []
  },
  onLoad(option) {
    console.log('option', option)
    if (option && option.date) {
      this.setData({ checkedDate: option.date })
    } else {
      var date = new Date()
      var year = date.getFullYear()
      var month = date.getMonth() + 1
      var day = date.getDate()
      this.setData({ checkedDate: `${year}-${month}-${day}` })
    }
  },
  whenChangeMonth(e) {
    this.getMovieDaysByMonth(`${e.detail.next.year}-${e.detail.next.month}`)
  },
  afterCalendarRender(e) {
    // 获取日历组件上的 calendar 对象
    const calendar = this.selectComponent('#calendar').calendar
    console.log('afterCalendarRender', e)
    // 选中
    const checkDate = this.data.checkedDate.split('-')
    const toSet = [{ year: checkDate[0], month: checkDate[1], date: checkDate[2] }]
    calendar.setSelectedDates(toSet)
    // 获取当月放映天
    this.getMovieDaysByMonth(`${checkDate[0]}-${checkDate[1]}`)
    // 获取当天放映
    this.getMoviesByDay(this.data.checkedDate)
  },
  afterTapDate(e) {
    console.log('afterTapDate', e)
    this.getMoviesByDay(`${e.detail.year}-${e.detail.month}-${e.detail.date}`)
  },
  getMovieDaysByMonth(month = '') {
    const _this = this
    wx.request({
      url: `${app.globalData.domain}/library/movie/month?month=${month}`,
      success(res) {
        try {
          if (res.statusCode == 200) {
            _this.setMovieDayPoints(res.data)
          }
        } catch (error) {
          wx.showToast({ title: '系统异常,稍后再试', icon: 'none' })
        }
      }
    })
  },
  getMoviesByDay(date = '') {
    const _this = this
    wx.request({
      url: `${app.globalData.domain}/library/movie?date=${date}`,
      success(res) {
        try {
          if (res.statusCode == 200) {
            _this.setData({ movieList: res.data })
          }
        } catch (error) {
          wx.showToast({ title: '系统异常,稍后再试', icon: 'none' })
        }
      }
    })
  },
  setMovieDayPoints(dates) {
    console.log('dates', dates)
    const calendar = this.selectComponent('#calendar').calendar
    calendar.setTodos({
      // 待办点标记设置
      pos: 'bottom', // 待办点标记位置 ['top', 'bottom']
      dotColor: '#00C853', // 待办点标记颜色
      showLabelAlways: true, // 点击时是否显示待办事项（圆点/文字），在 circle 为 true 及当日历配置 showLunar 为 true 时，此配置失效
      dates: dates
    })
  },
  goLibraryCinema () {
    wx.navigateTo({
      url: '../traffic/navi?markerId=4',
    })
  },
  setRemind (e) {
    const index = e.currentTarget.dataset.index
    const movie = this.data.movieList[index]
    const endTime = new Date(movie.play_at).getTime() + 1000 * 60 * 150
    wx.addPhoneCalendar({
      title: `电影【${movie.name}】`,
      startTime: new Date(movie.play_at).getTime(),
      description: `电影《${movie.name}》即将开始放映`,
      location: '社科馆202音像室',
      endTime: endTime.toString().slice(0, -3),
      alarmOffset: 60*15
    });
  },
  showPoster (e) {
    wx.previewImage({
      urls: [e.currentTarget.dataset.url],
    })
  },
  goDouban (e) {
    const index = e.currentTarget.dataset.index
    const movie = this.data.movieList[index]
    wx.navigateToMiniProgram({
      appId: 'wx2f9b06c1de1ccfca',
      path: `pages/subject/subject?id=${movie.douban_id}&type=movie`
    })
  }
}

Page(conf)
