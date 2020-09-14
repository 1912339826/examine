// pages/headquarters_of_the_message/headquarters_of_the_message.js
// pages/tasting_tube/tasting_tube.js
const app = getApp();
const fun_ref = app.ref.default;
const fun_config = app.config.default;
import Toast from '@vant/weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: "",
    content: "",
    textarea_value: ""
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
      title: '总部留言'
    })
  },
  bindTextAreaBlur(e) {
    this.setData({
      content: e.detail.value
    })
  },
  change_value(e) {
    this.setData({
      value: e.detail
    })
  },
  add() {
    let reg = /^1(3[0-9]|4[5,7]|5[0,1,2,3,5,6,7,8,9]|6[2,5,6,7]|7[0,1,7,8]|8[0-9]|9[1,8,9])\d{8}$/;
    if (this.data.value == "" || this.data.content == "") {
      Toast.fail('请填写完整！');
    } else {
      if (!reg.test(this.data.value) || !this.data.value.length == 11) {
        Toast.fail('输入的手机号不正确');
      } else {
        this.add_leaveMessage()
      }

    }
  },
  add_leaveMessage() {
    Toast.loading({
      message: '提交中...',
      forbidClick: true,
    });
    fun_ref.post(fun_config.add_leaveMessage.url, {
      content: this.data.content,
      phone: this.data.value
    }, res => {


      if (res.data.status == 200) {
        setTimeout(() => {

        }, 300);
        wx.navigateBack({
          delta: 1
        })
      } else {

      }
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