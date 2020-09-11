export default {
  time: function (time) {
    var newDate = new Date(time);
    let getFullYear = newDate.getFullYear()
    let Month = newDate.getMonth() + 1
    let getMonth = Month > 10 ? Month : `0` + Month
    let isDate = newDate.getDate()
    let getDate = isDate > 10 ? isDate :  isDate
    let getHours = newDate.getHours()
    let getMinutes = newDate.getMinutes()
    let getSeconds = newDate.getSeconds()
    let obj = {
      getFullYear: getFullYear, //年
      getMonth: getMonth, //月
      getDate: getDate, //日
      getHours: getHours, //时
      getMinutes: getMinutes, //分
      getSeconds: getSeconds //秒
    }
    return obj
  }
}