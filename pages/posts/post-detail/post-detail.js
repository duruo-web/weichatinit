var postData = require('../../../data/post-data.js')
var app = getApp();
Page({
  data: {
    isPlaymusic: false
  },
  onLoad: function (options) {
    console.log(options)
    var global_isPlaymusic = app.globalData.global_isPlaymusic;
    var PlaymusicId = app.globalData.PlaymusicId;
    var postId = options.id;
    this.setData({currentPostId: postId})
    var postdata = postData.postList[postId];
    var artTitle = postData.postList[postId].title;
    this.setData({
      postdata: postdata,
      artTitle: artTitle
    })
    var postcollected = wx.getStorageSync('stroage');
    if (postcollected) {
      var collected = postcollected[postId];
      this.setData({
        collected: collected
      })
    }
    else {
      var postcollected = {};
      postcollected[postId] = false;
      wx.setStorageSync('stroage', postcollected);
    }
    if (global_isPlaymusic && PlaymusicId === postId) {
      this.setData({
        isPlaymusic: true
      })
    }
    this.setMusicMonitor();
  },
  setMusicMonitor: function () {
    var that = this;
    wx.onBackgroundAudioPlay(function () {
      this.setData({
        isPlaymusic: true
      })
      app.globalData.global_isPlaymusic = true;
      app.globalData.PlaymusicId = that.data.currentPostId;
    })
    wx.onBackgroundAudioPause(function () {
      this.setData({
        isPlaymusic: false
      })
      app.globalData.global_isPlaymusic = false;
      app.globalData.PlaymusicId = null;
    })
  },
  onCash: function () {
    this.onPostcollectedSync();
  },
  onPostcollectedSync: function () {
    var postcollected = wx.getStorageSync('stroage');
    var collected = postcollected[this.data.currentPostId];
    collected = !collected;
    postcollected[this.data.currentPostId] = collected;
    wx.setStorageSync('stroage', postcollected);
    this.setData({
      collected: collected
    })
    wx.showToast({
      title: collected?"收藏成功": "取消收藏",
      icon: 'success',
      duration: 1000
    })
  },
  onShare: function () {
    wx.showActionSheet({
      itemList: ['分享给好友'],
      success: function (res) {
        if (res.confirm) {
          wx.showToast({
            title:'分享成功',
            icon: 'success',
            duration: 1000
          })
        }
      }
    })
  },
  onMusic: function (event) {
    var isPlaymusic = this.data.isPlaymusic;
    var currentId = this.data.currentPostId;
    var data = postData.postList[currentId].music;
    if (isPlaymusic) {
      wx.pauseBackgroundAudio()
      this.setData({
        isPlaymusic: false
      })
    } else {
      wx.playBackgroundAudio({
        dataUrl: data.dataUrl,
        title: data.title,
        coverImgUrl: data.coverImgUrl
      })
      this.setData({
        isPlaymusic: true
      })
    }
  },
  onShow: function (event) {
    wx.setNavigationBarTitle({
      title: this.data.artTitle,
    })
  }
})