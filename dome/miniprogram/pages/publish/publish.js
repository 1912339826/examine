// pages/publish/publish.js
const app = getApp();
const fun_ref = app.ref.default;
const fun_config = app.config.default;
import Toast from '@vant/weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fileList: [],
    focus: false,
    textarea_value: "",
    disabled: true
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
      title: '这一刻的想法...'
    })
  },
  afterRead(event) {
    let fileList = this.data.fileList;
    let that = this;
    const {
      file
    } = event.detail;
    wx.uploadFile({
      url: fun_config.import_info.url,
      filePath: file.path,
      name: 'file',
      formData: {
        user: 'test'
      },
      success(res) {
        // 上传完成需要更新 fileList
        fileList.push({
          url: JSON.parse(res.data).result.url
        })
        that.setData({
          fileList: fileList
        }, function () {
          if (that.data.textarea_value != "" || that.data.fileList != []) {
            that.setData({
              disabled: false
            })
          } else {
            that.setData({
              disabled: true
            })
          }
        })
      },
    });
  },
  // 点击删除
  delete(e) {
    let fileList = this.data.fileList;
    fileList.splice(e.detail.index, 1)
    this.setData({
      fileList: fileList
    }, function () {
      if (this.data.textarea_value != "" || this.data.fileList != []) {
        that.setData({
          disabled: false
        })
      } else {
        that.setData({
          disabled: true
        })
      }
    })
  },
  bindTextAreaBlur_individual(e) {
    this.setData({
      textarea_value: e.detail.value
    }, function () {
      if (e.detail.value != "" || this.data.fileList != []) {
        this.setData({
          disabled: false
        })
      } else {
        this.setData({
          disabled: true
        })
      }
    })
  },
  publish() {
    let fileList = [];
    for (let index = 0; index < this.data.fileList.length; index++) {
      const element = this.data.fileList[index];
      fileList.push(element.url)
    }
    this.add_circleFriends(fileList.join(","))

  },
  add_circleFriends(fileList) {
    fun_ref.post(fun_config.add_circleFriends.url, {
      pics: fileList,
      content: this.data.textarea_value
    }, res => {
      if (res.data.status == 200) {
        Toast.success(res.data.message);
        wx.navigateBack({
          delta: 1,
        })
      } else {
        Toast.fail(res.data.message);
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