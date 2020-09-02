// pages/information/information.js
const app = getApp();
const fun_ref = app.ref.default;
const fun_config = app.config.default;
const fun_time = app.time.default.time
import Toast from '@vant/weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tab_son_list: ["tab_son_active", "tab_son", "tab_son"],
    type: 1,
    pageNo: 1,
    pageSize: 5,
    totalPage: 1, //数据总页数
    lists: [
      //   {
      //   id: 'bf0548e5db9c447789a732eab696f19b',
      //   createTime: 1597644668000,
      //   title: "中新社北京8月21日电 (记者 陈溯)中国水利部副部长田学斌21日对外宣布，中国贫困人口饮水安全问题已得到全面解决。",
      //   pic: "https://jason-blog.oss-cn-hangzhou.aliyuncs.com/images/2020/05/23/toux.png"
      // }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#395996'
    })
    this.list(this.data.type,this.data.pageNo,true)
  },

  tab_son: function (e) {
    let tab = [];
    tab = ["tab_son", "tab_son", "tab_son"];
    tab[e.target.dataset.index] = "tab_son_active";
    this.setData({
      tab_son_list: tab ,
      type:  Number(e.target.dataset.index)+1,
      pageNo: 1
    }, function () {
      this.list(this.data.type, this.data.pageNo, true)
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  list(type, pageNo, ispage) {
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
    })
    fun_ref.get(fun_config.list.url, {
      type: type,
      pageNo: pageNo, //当前页码
      pageSize: 3 //每页记录条数
    }, res => {
      let arr = [];
      for (let index = 0; index < res.data.result.data.length; index++) {
        const element = res.data.result.data[index];
        element.time = fun_time(element.createTime)
        arr.push(element)
      }
      if (ispage) {
        this.setData({
          lists: res.data.result.data,
          totalPage: res.data.result.totalPage
        }, function () {
          Toast.clear();
        })
      } else {
        let data = this.data.lists;
        let newarr = data.concat(res.data.result.data)
        this.setData({
          lists: newarr,
          totalPage: res.data.result.totalPage
        }, function () {
          Toast.clear();
        })
      }
    })
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
        this.list(this.data.type, pageNo, false)
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})