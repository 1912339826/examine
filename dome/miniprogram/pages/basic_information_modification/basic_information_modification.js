// pages/basic_information_modification/basic_information_modification.js
const app = getApp();
const fun_ref = app.ref.default;
const fun_config = app.config.default;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    head_sculpture: "",
    name: "",
    specialty: "",
    taster: {},
    introPic: "",
    teamPic: "",
    introduction: "",
    teamIntroduction: ""
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
      title: '基本信息修改'
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
      taster: wx.getStorageSync('user').taster
    })
    this.index_taster()
  },
  // 判断是品鉴官、普通用户
  taster_judge() {
    if (!!wx.getStorageSync('user').taster) {
      this.setData({
        specialty: wx.getStorageSync('user').taster.specialty,
        head_sculpture: wx.getStorageSync('user').taster.pic,
        name: wx.getStorageSync('user').taster.name,
        introPic: wx.getStorageSync('user').taster.introPic,
        teamPic: wx.getStorageSync('user').taster.teamPic,
        introduction: wx.getStorageSync('user').taster.introduction,
        teamIntroduction: wx.getStorageSync('user').taster.teamIntroduction
      })
    } else {
      this.setData({
        specialty: false,
        introduction: false,
        teamIntroduction: false,
        head_sculpture: wx.getStorageSync('user').avatarPic,
        name: wx.getStorageSync('user').name,
      })
    }
  },
  // 预览图片
  previewMedia(e) {
    wx.previewMedia({
      sources: [{
        url: e.currentTarget.dataset.img
      }]
    })
  },
  chooseImage(e) {
    // e.currentTarget.dataset.name
    let arr = ["album", "camera"];
    let that = this;
    wx.showActionSheet({
      itemList: ['从手机相册选择', '拍照'],
      success(res) {
        wx.chooseImage({
          count: 1,
          sizeType: ['compressed'],
          sourceType: [arr[res.tapIndex]],
          success(ress) {
            wx.uploadFile({
              url: fun_config.UploadPhotos.url, // 真实的接口地址
              filePath: ress.tempFilePaths[0],
              name: 'file',
              success(res) {
                // JSON.parse(res.data).result.url
                // that.update_taster(JSON.parse(res.data).result.url)
                if (e.currentTarget.dataset.name == "head_sculpture") {
                  that.update(JSON.parse(res.data).result.url)
                } else if (e.currentTarget.dataset.name == "introPic") {
                  that.update_taster("introPic", wx.getStorageSync('user').taster.id, JSON.parse(res.data).result.url)
                } else if (e.currentTarget.dataset.name == "teamPic") {
                  that.update_taster("teamPic", wx.getStorageSync('user').taster.id, JSON.parse(res.data).result.url)
                }
              },
            });
          }
        })
      },
      fail(err) {
        console.log(err.errMsg)
      }
    })
  },
  // update_taster 品鉴官
  update(url) {
    let type;
    let id;
    if (!!wx.getStorageSync('user').taster) {
      type = "pic";
      id = wx.getStorageSync('user').taster.id
      this.update_taster(type, id, url)
    } else {
      type = "avatarPic";
      id = wx.getStorageSync('user').id
      this.update_user(type, id, url)
    }
  },

  update_taster(type, id, url) {
    fun_ref.post(fun_config.update_taster.url, {
      [type]: url,
      id: id
    }, res => {
      if (res.data.status == 200) {
        // Toast.success(res.data.message);
        this.index_taster()
      } else {
        Toast.fail('失败');
      }
    })
  },

  update_user(type, id, url) {
    fun_ref.post(fun_config.update_user.url, {
      [type]: url,
      id: id
    }, res => {
      if (res.data.status == 200) {
        // Toast.success(res.data.message);
        this.index_taster()
      } else {
        Toast.fail('失败');
      }
    })
  },





  index_taster() {
    fun_ref.get(fun_config.index_taster.url, {}, res => {
      wx.setStorageSync('user', res.data);
      wx.setStorageSync('authorization', true);
      this.taster_judge()
    })
  },
  // 去更改页面更改信息
  alter(e) {
    wx.navigateTo({
      url: `../alter_page/alter_page?type=${e.currentTarget.dataset.name}`
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