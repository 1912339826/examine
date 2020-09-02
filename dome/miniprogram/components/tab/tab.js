// components/tab/tab.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    active_index: {
      type: String,
      value: "0"
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    img_list: [{
      active: "../../images/information_active.png",
      active_no: "../../images/information_active_no.jpg"
    }, {
      active: "../../images/tasting_tube_active.jpg",
      active_no: "../../images/tasting_tube_active_no.png"
    }, {
      active: "../../images/store_active.jpg",
      active_no: "../../images/store_active_no.png"
    }, {
      active: "../../images/my_active.jpg",
      active_no: "../../images/my_active_no.png"
    }],
    tab: ["../../images/information_active_no.jpg", "../../images/tasting_tube_active_no.png", "../../images/store_active_no.png", "../../images/my_active_no.png"],
    navigateTo_list: ["../information/information", "../tasting_tube/tasting_tube", "../store/store", "../my/my"]
  },

  //  在组件实例进入页面节点树时执行
  attached() {
    let change_list = this.data.tab;
    change_list[this.data.active_index] = this.data.img_list[this.data.active_index].active
    this.setData({
      tab: change_list
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    change(e) {
      var pages = getCurrentPages() //获取加载的页面

      var currentPage = pages[pages.length - 1] //获取当前页面的对象

      var url = currentPage.route //当前页面url
      // 检测原地TP
      var o = `../${url.split("/")[1]}/${url.split("/")[2]}`
      if (this.data.navigateTo_list[e.currentTarget.dataset.index] != o) {
        // 通过当前页的url，检测是不是从子页面点击底部菜单
        if (o == "../information/information" || o == "../tasting_tube/tasting_tube" || o == "../store/store" || o == "../my/my") {
          wx.redirectTo({
            url: this.data.navigateTo_list[e.currentTarget.dataset.index]
          })
        } else {
          wx.navigateBack({
            delta: 10,
            success() {
              wx.redirectTo({
                url: this.data.navigateTo_list[e.currentTarget.dataset.index]
              })
            }
          })
        }

      }
    }
  }
})