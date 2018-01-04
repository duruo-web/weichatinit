var postData = require('../../data/post-data.js')
Page({
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
  },
  onLoad: function () {
    this.setData({post_key: postData.postList})
    var postKey = this.data.post_key;
    for (var i = 0; i < postKey.length; i++) {
      var orTitle = postKey[i].title;
      var orContent = postKey[i].detail;
      if (orTitle.length > 8) {
        orTitle = orTitle.substring(0, 6) + '...'
      }
      if (orContent.length > 74) {
        orContent = orContent.substring(0,73) + '...'
      }
      postKey[i].title = orTitle;
      postKey[i].detail = orContent;
    }
    this.setData({
      post_key: postKey
    })
  },
  onPostTap: function (event) {
    var postId = event.currentTarget.dataset.postid;
    var view = this.data.post_key[postId].view;
    console.log(this.data)
    view ++;
    console.log(postId)
    this.data.post_key[postId].view = view;
    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + postId
    })

  }
})