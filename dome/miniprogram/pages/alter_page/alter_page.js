// pages/alter_page/alter_page.js
const app = getApp();
const fun_ref = app.ref.default;
const fun_config = app.config.default;
import Toast from '@vant/weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ischange: false,
    value: "",
    inquire: {
      name: "昵称",
      specialty: "特长",
      signature: "签名",
      introduction: "个人简介",
      teamIntroduction: "团队简介"
    },
    type: "",
    maxlength: 25,
    maxlength_obj: {
      name: 15,
      specialty: 20,
      signature: 25,
      introduction: 50,
      teamIntroduction: 100
    }
  },
  // 一下进入此页面：
  // wx.navigateTo({
  //   url: `../alter_page/alter_page?type=${e.currentTarget.dataset.name}`
  // })
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#395996'
    })
    this.setData({
      maxlength: this.data.maxlength_obj[options.type]
    })
    wx.setNavigationBarTitle({
      title: `更改${this.data.inquire[options.type]}`
    })
    this.setData({
      type: options.type
    })
    if (!!wx.getStorageSync('user').taster) {
      this.setData({
        value: wx.getStorageSync('user').taster[options.type]
      })
    } else {
      this.setData({
        value: wx.getStorageSync('user')[options.type]
      })
    }
  },
  onChange() {
    if (this.data.value == " ") {
      this.setData({
        value: ""
      })
    } else {
      this.setData({
        ischange: true
      })
    }
  },
  sub() {
    if (this.data.value == "") {
      Toast.fail("没有输入，请重新填写")
    } else {
      if (!!wx.getStorageSync('user').taster) {
        this.update_taster()
      } else {
        this.update_user()
      }
    }
  },
  update_taster() {
    let type = this.data.type;
    fun_ref.post(fun_config.update_taster.url, {
      [type]: this.data.value,
      id: wx.getStorageSync('user').taster.id
    }, res => {
      if (res.data.status == 200) {
        Toast.success(res.data.message);
        setTimeout(() => {
          wx.navigateBack({
            delta: 1,
          })
        }, 300);
      } else {
        Toast.fail('失败');
      }
    })
  },
  update_user() {
    let type = this.data.type;
    fun_ref.post(fun_config.update_user.url, {
      [type]: this.data.value,
      id: wx.getStorageSync('user').id
    }, res => {
      if (res.data.status == 200) {
        Toast.success(res.data.message);
        setTimeout(() => {
          wx.navigateBack({
            delta: 1,
          })
        }, 300);
      } else {
        Toast.fail('失败');
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