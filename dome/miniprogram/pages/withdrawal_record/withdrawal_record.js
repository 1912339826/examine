// pages/withdrawal_record/withdrawal_record.js
const app = getApp();
const fun_ref = app.ref.default;
const fun_config = app.config.default;
import Toast from '@vant/weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageNo: 1,
    totalPage: 1,
    lists: [{
      "id": "b6801c4393c4489184e9ff7a86bc1e33",
      "userId": "c72e7f22219d4864998316af08dba02c",
      "status": 0,
      // 正在审核 0  提现成功3 提现失败4 拒绝提现2
      "orderNo": "202009041550208043",
      "price": 0.23,
      "name": null,
      "createTime": 1599205820000,
      timestamp: "22020-8-1 20:11"
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#395996'
    })
    wx.setNavigationBarTitle({
      title: '提现记录'
    })
    this.setData({
      lists: []
    })
    this.getList_withdraw()
  },
  getList_withdraw() {
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
    })
    fun_ref.get(fun_config.getList_withdraw.url, {
      pageNo: this.data.pageNo,
      pageSize: 15
    }, res => {
      let arr = this.data.lists;
      for (let index = 0; index < res.data.result.data.length; index++) {
        const element = res.data.result.data[index];
        element.timestamp = this.timestamp(element.createTime)
      }
      let newarr = arr.concat(res.data.result.data)
      this.setData({
        lists: newarr,
        totalPage: res.data.result.totalPage
      }, function () {
        Toast.clear();
      })
    })
  },
  timestamp(time) {
    let isdata = new Date(time)
    var y = isdata.getFullYear();
    var m = isdata.getMonth() + 1;
    var d = isdata.getDate();
    var h = isdata.getHours();
    var mm = isdata.getMinutes();
    m = m < 10 ? '0' + m : m;
    d = d < 10 ? '0' + d : d;
    return `${y}-${m}-${d} ${h}:${mm}`
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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
    let pageNo = this.data.pageNo + 1;
    if (this.data.totalPage < pageNo) {
      console.log(pageNo)
    } else {
      this.setData({
        pageNo: pageNo
      }, function () {
        this.getList_withdraw()
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})