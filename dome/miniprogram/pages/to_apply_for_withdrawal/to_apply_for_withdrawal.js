// pages/to_apply_for_withdrawal/to_apply_for_withdrawal.js
const app = getApp();
const fun_ref = app.ref.default;
const fun_config = app.config.default;
import Toast from '@vant/weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    balance: 0,
    value: ""
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
      title: '提现页面'
    })
  },
  go_withdrawal_record() {
    wx.navigateTo({
      url: "../withdrawal_record/withdrawal_record"
    });
  },
  change_() {
    if (this.data.value == "") {} else {
      if ((this.data.balance - Number(this.data.value)) < 0) {
        this.setData({
          value: this.data.balance
        })
      } else {}
    }
  },
  // 全部提现
  withdraw_all() {
    this.setData({
      value: this.data.balance
    })
  },
  // 提现
  withdraw() {
    if (this.data.value == "") {
      Toast.fail("请输入金额")
      return
    }
    if (Number(this.data.value == 0)) {
      Toast.fail("金额错误")
      return
    }
    this.apply_withdraw()
  },
  apply_withdraw() {
    fun_ref.post(fun_config.apply_withdraw.url, {
      price: this.data.value
    }, res => {
      if (res.data.status == 200) {
        Toast.success(res.data.message);
        this.index_taster()
      } else {
        Toast.fail(res.data.message);
      }
    })
  },
  index_taster() {
    fun_ref.get(fun_config.index_taster.url, {}, res => {
      wx.setStorageSync('user', res.data);
      wx.setStorageSync('authorization', true);
      this.setData({
        balance: wx.getStorageSync('user').taster.balance,
        value: ""
      })
    })
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
    this.setData({
      balance: wx.getStorageSync('user').taster.balance
    })
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

  }
})