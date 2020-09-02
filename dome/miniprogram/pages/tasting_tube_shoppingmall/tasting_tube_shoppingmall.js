// pages/tasting_tube_shoppingmall/tasting_tube_shoppingmall.js
const app = getApp();
const fun_ref = app.ref.default;
const fun_config = app.config.default;
import Toast from '@vant/weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: "c39b9dc1f16b4bcb886b9fdf9a72d2de",
    name: "罗志祥",
    pic: "https://jason-blog.oss-cn-hangzhou.aliyuncs.com/imgs/4.jpg",
    lists: [{
      catId: "1111",
      categoryName: "新闻",
      cover: "https://jason-blog.oss-cn-hangzhou.aliyuncs.com/imgs/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20200826112538.jpg",
      id: "03ef9dae06fb479190373e1e0fbf6a26",
      introduction: "测试",
      isLikes: null,
      likes: 0,
      price: 200,
      title: "测试",
      videoId: "f108df1b81604b2ba9e64ba58c4d5332"
    }],
    pageNo: 1,
    id: '',
    totalPage: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id)
    let {
      id,
      name,
      pic
    } = options;
    this.setData({
      id,
      name,
      pic
    })
    this.setData({
      id: this.data.id,
      // 清空临时数据
      lists: []
    }, function () {
      this.getTasterMall_taster()
    })
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#395996'
    })
    wx.setNavigationBarTitle({
      title: ''
    })
  },
  // 数据
  getTasterMall_taster() {
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
    })
    fun_ref.get(fun_config.getTasterMall_taster.url, {
      id: this.data.id,
      pageNo: this.data.pageNo,
      pageSize: 4
    }, res => {
      console.log(res.data.result.data)
      let arr = [];
      let newarr = [];
      arr = this.data.lists
      newarr = arr.concat(res.data.result.data)
      this.setData({
        lists: newarr,
        totalPage: res.data.result.totalPage
      }, function () {
        Toast.clear();
      })
    })
  },
  // 取消点赞
  cancelLikes(e) {
    console.log(e.currentTarget.dataset)
    fun_ref.post(fun_config.cancelLikes.url, {
      userId: wx.getStorageSync('user').id,
      videoId: e.currentTarget.dataset.videoId
    }, res => {
      if (res.data.success) {
        let lists = this.data.lists;
        lists[e.currentTarget.dataset.index].isLikes = null;
        lists[e.currentTarget.dataset.index].likes--
        this.setData({
          lists: lists
        })
      }
    })
  },
  // 点赞
  addLikes(e) {
    console.log(e.currentTarget.dataset)
    fun_ref.post(fun_config.addLikes.url, {
      userId: wx.getStorageSync('user').id,
      videoId: e.currentTarget.dataset.videoid
    }, res => {
      if (res.data.success) {
        let lists = this.data.lists;
        lists[e.currentTarget.dataset.index].isLikes = true;
        lists[e.currentTarget.dataset.index].likes++
        this.setData({
          lists: lists
        })
      }
    })
  },
  // 播放
  play(e) {
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../play/play?videoId=' + e.currentTarget.dataset.id + "&&title=" + e.currentTarget.dataset.title + "&&introduction=" + e.currentTarget.dataset.introduction + "&&price=" + e.currentTarget.dataset.price,
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
    let pageNo = this.data.pageNo + 1;
    if (this.data.totalPage < pageNo) {
      console.log(pageNo)
    } else {
      this.setData({
        pageNo: pageNo
      }, function () {
        this.getTasterMall_taster()
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})