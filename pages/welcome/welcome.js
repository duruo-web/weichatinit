Page({
  data: {
    color: 'blue',
  },
  click: function () {
    console.log('i click start')
    wx.switchTab({
      url: '/pages/posts/post'
    })
  },
  onLoad: function (options) {

  },
  onReady: function () {

  },
  onShow: function () {

  },
  onHide: function () {

  },
  onUnload: function () {

  }
})