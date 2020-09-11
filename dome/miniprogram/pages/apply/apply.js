// pages/apply/apply.js
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
    input_name: "",
    input_phone: "",
    text_individual: "",
    text_teams: "",
    radio_change_list: false,
    show: false,
    notice_show: false,
    notice_title: "",
    notice_content: "",
    changecity: [{
        text: "省份",
        id: ""
      },
      {
        text: "城市",
        id: ""
      },
      {
        text: "地区",
        id: ""
      }
    ],
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
      {
        values: citys[0]["children"][0]["children"],
        className: 'column3',
        defaultIndex: 0,
      }
    ],
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
      title: '申请品鉴官'
    })
    this.cityTree()
  },
  // 提交按钮
  go_be_reviewing() {
    Toast.clear();
    if (!this.data.input_name) {
      Toast.fail("请填写姓名")
      return
    }
    if (!this.data.input_phone) {
      Toast.fail("请填写联系方式")
      return
    }
    if (!this.data.changecity[2].id) {
      Toast.fail("请选择城市")
      return
    }
    if (!this.data.text_individual) {
      Toast.fail("请填写个人介绍")
      return
    }
    if (!this.data.text_teams) {
      Toast.fail("请填写团队介绍")
      return
    }

    Toast.loading({
      message: '加载中...',
      forbidClick: true,
    })
    fun_ref.post(fun_config.tasterSubmit.url, {
      name: this.data.input_name,
      phone: this.data.input_phone,
      cityId: this.data.changecity[2].id,
      introduction: this.data.text_individual,
      teamIntroduction: this.data.text_teams
    }, res => {
      Toast.clear();
      if (res.data.status == 200) {
        wx.navigateTo({
          url: "../be_reviewing/be_reviewing"
        });
      } else {
        Toast.fail(res.data.message)
      }
    }, File => {
      console.log(File)
    })
  },
  city() {
    this.setData({
      show: true
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
      let columns2 = `columns[${2}].values`;
      this.setData({
        [columns0]: arr
      }, function () {
        this.setData({
          [columns1]: arr[0].children
        }, function () {
          this.setData({
            [columns2]: arr[0].children[0].children
          }, function () {
            Toast.clear();
          })
        })
      })
    })
  },
  // 城市选择变化事件。
  onChange(event) {
    const {
      picker,
      value,
      index
    } = event.detail;
    // value 当前列的值
    if (index == 0) {
      picker.setColumnValues(1, value[0]["children"]);
      picker.setColumnValues(2, value[0]["children"][0]["children"]);
    } else if (index == 1) {
      picker.setColumnValues(2, value[1]["children"]);
    }
  },
  // 取消
  onCancel: function () {
    this.onClose()
  },
  // 确定
  onConfirm: function (e) {
    this.setData({
      changecity: e.detail.value
    })
    this.onClose()
  },
  // 关闭选择器层
  onClose: function () {
    this.setData({
      show: false
    })
  },
  // 是否选中“选中”
  checked_(e) {
    if (e.currentTarget.dataset.checked == "yes") {
      this.setData({
        radio_change_list: true
      })
    } else {
      this.setData({
        radio_change_list: false
      })
    }
  },
  // 名字
  bind_input_name(e) {
    this.setData({
      input_name: e.detail.value
    })
  },
  // 手机号
  bind_input_phone(e) {
    this.setData({
      input_phone: e.detail.value
    })
  },
  bindTextAreaBlur_individual(e) {
    this.setData({
      text_individual: e.detail.value
    })
  },
  bindTextAreaBlur_teams(e) {
    this.setData({
      text_teams: e.detail.value
    })
  },
  // 点击阅读品鉴官须知
  notice() {
    this.getInfo_notice()
  },
  notice_onClose() {
    this.setData({
      notice_show: false
    })
  },
  getInfo_notice() {
    fun_ref.get(fun_config.getInfo_notice.url, {}, res => {
      console.log(res.data.result)
      this.setData({
        notice_title: res.data.result.title,
        notice_content: res.data.result.content
      }, function () {
        this.setData({
          notice_show: true
        })
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