// pages/tasting_tube/tasting_tube.js
const app = getApp();
const fun_ref = app.ref.default;
const fun_config = app.config.default;
import Toast from '@vant/weapp/toast/toast';
// 临时数据
const citys = [{
  text: "",
  children: [{
    text: "",
    children: [{
      text: "",
      children: []
    }]
  }]
}];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    status: "",
    value: "",
    columns: [{
        values: citys,
        className: 'column1',
        defaultIndex: 2,
      },
      {
        values: citys[0]["children"],
        className: 'column2',
        defaultIndex: 2,
      },
      // {
      //   values: citys[0]["children"][0]["children"],
      //   className: 'column3',
      //   defaultIndex: 0,
      // }
    ],
    show: false,
    changecity: {
      text: "城市",
      id: ""
    },
    apply: null,
    pageNo: 1,
    totalPage: 1,
    lists: [{
      balance: 0,
      cityId: "81",
      cityName: "南平",
      id: "4e957940eab047d6bdae2dc8abbae5ac",
      introduction: "搞笑+跳舞1111",
      name: "百度",
      phone: "13855292100",
      pic: "https://jason-blog.oss-cn-hangzhou.aliyuncs.com/images/2020/05/23/toux.png",
      signature: "舞王",
      specialty: "搞笑+跳舞4444",
      status: 1,
      teamId: null,
      teamIntroduction: "搞笑+跳舞",
      teamName: null
    }],
    getList_ad_list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      status: wx.getStorageSync('user').tasterId
    })
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#395996'
    })
    wx.setNavigationBarTitle({
      title: '城市品鉴官'
    })
    this.getList_ad()
    // 有手写测试数据，清空
    this.setData({
      lists: []
    })
    this.tasterList()
    this.cityTree()
  },
  tasterList(pull) {
    fun_ref.get(fun_config.tasterList.url, {
      pageNo: this.data.pageNo, //页码
      pageSize: 9, //每页记录条数,
      name: this.data.value,
      cityId: this.data.changecity.id
    }, res => {
      let arr = [];
      let newarr = [];
      arr = this.data.lists
      newarr = arr.concat(res.data.result.data)
      this.setData({
        lists: newarr,
        totalPage: res.data.result.totalPage
      }, function () {
        if (pull == "pull") {
          wx.stopPullDownRefresh();
        }
      })
    })
  },
  // 城市（省市区）
  cityTree() {
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
    })
    fun_ref.get(fun_config.cityTree.url, {}, res => {
      let arr = [];
      arr = res.data.result;
      let columns0 = `columns[${0}].values`;
      let columns1 = `columns[${1}].values`;
      // let columns2 = `columns[${2}].values`;
      this.setData({
        [columns0]: arr
      }, function () {
        this.setData({
          [columns1]: arr[0].children
        }, function () {
          this.setData({
            // [columns2]: arr[0].children[0].children
          }, function () {
            Toast.clear();
          })
        })
      })
    })
  },
  onChange(event) {
    const {
      picker,
      value,
      index
    } = event.detail;
    // value 当前列的值
    if (index == 0) {
      picker.setColumnValues(1, value[0]["children"]);
      // picker.setColumnValues(2, value[0]["children"][0]["children"]);
    } else if (index == 1) {
      // picker.setColumnValues(2, value[1]["children"]);
    }
  },
  go_homepage(e) {
    if (wx.getStorageSync('authorization')) {
      wx.navigateTo({
        url: `../homepage/homepage?id=${e.currentTarget.dataset.id}`
      });
    } else {
      Toast.fail("未登录")
      setTimeout(() => {
        wx.redirectTo({
          url: '../my/my',
        })
      }, 500);
    }

  },
  goapply() {
    if (wx.getStorageSync('authorization')) {
      wx.navigateTo({
        url: '../apply/apply'
      });
    } else {
      Toast.fail("未登录")
      setTimeout(() => {
        wx.redirectTo({
          url: '../my/my',
        })
      }, 500);
    }
  },
  // bind_input
  bind_input(e) {
    this.setData({
      value: e.detail.value
    })
  },
  // 点击城市
  select_city: function () {
    this.setData({
      show: true
    })
  },
  // 搜索
  select() {
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
    })
    this.setData({
      pageNo: 1,
      lists: []
    })
    this.tasterList()
  },
  // 取消
  onCancel: function () {
    this.onClose()
  },
  // 确定
  onConfirm: function (e) {
    console.log(e.detail.value)
    this.setData({
      changecity: e.detail.value[1]
    })
    this.onClose()
  },
  // 关闭选择器层
  onClose: function () {
    this.setData({
      show: false
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      apply: wx.getStorageSync('user').taster
    })
  },
  // 广告
  getList_ad() {
    fun_ref.get(fun_config.getList_ad.url, {}, res => {
      this.setData({
        getList_ad_list: res.data.result
      })
    })
  },
  // 广告详情
  getList_ad_fn(e) {
    wx.navigateTo({
      url: '../information_details/information_details?id=' + e.currentTarget.dataset.id + "&&type=advertising"
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
    let pageNo = this.data.pageNo + 1;
    if (this.data.totalPage < pageNo) {
      console.log(pageNo)
    } else {
      this.setData({
        pageNo: pageNo
      }, function () {
        this.tasterList()
      })
    }
  },
  // 下拉刷新，重置当前搜索结果
  onPullDownRefresh() {
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
    })
    this.setData({
      value: "",
      changecity: {
        text: "城市",
        id: ""
      },
      pageNo: 1,
      lists: []
    }, function () {
      this.tasterList("pull")
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})