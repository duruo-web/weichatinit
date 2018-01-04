App({
  globalData: {
    global_isPlaymusic: false,
    PlaymusicId: null,
    doubanbase: "https://api.douban.com"
  },
  onLaunch: function () {
   console.log('App Launch') 
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  }
})