// pages/canvasTest/canvasTest.js
import {
  translate
} from '../../utils/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tempFilePath: "",
    visableFlag: "hidden",
    canvasHeight: "170px",
    textareaShow: true,
    imgShow: false
  },

  getResult: function(e) {
    const lines = e.detail.value.textarea.split('\n');
    const _this = this;
    let jpLines = [];
    let finishFlag = 0;
    lines.forEach(item => {
      translate(item, {
        from: 'zh',
        to: "jp"
      }).then(res => {
        jpLines.push(res.trans_result[0].dst);
        ++finishFlag
        if (finishFlag == lines.length) {
          _this.paintCanvas(lines, jpLines, _this)
        }
      })
    });
  },

  paintCanvas: function(lines, jpLines, _this) {
    var context = wx.createCanvasContext('firstCanvas')
    for (let i = lines.length - 1; i >= 0; --i) {
      context.drawImage("img_edit.jpg", 0, 30 * i, 303, 170);
    }
    _this.setData({
      "canvasHeight": 170 + 30 * (lines.length - 1) + "px"
    });
    context.font = "12px YouYuan"
    context.fillStyle = "rgba(255,255,255,1)"
    for (let i = 0; i < lines.length; ++i) {
      const metrics = context.measureText(lines[i])
      context.strokeStyle = "rgba(135, 158, 177, 0.7)"
      context.fillText(lines[i], (303 - metrics.width) / 2, 155 + 30 * i)
      context.strokeText(lines[i], (303 - metrics.width) / 2, 155 + 30 * i, "0.1px")
    }
    context.font = "6px YouYuan"
    for (let i = 0; i < lines.length; ++i) {
      const metrics = context.measureText(jpLines[i])
      context.strokeStyle = "rgba(135, 158, 177, 0.7)"
      context.fillText(jpLines[i], (303 - metrics.width) / 2, 165 + 30 * i)
      context.strokeText(jpLines[i], (303 - metrics.width) / 2, 165 + 30 * i, "0.1px")
    }
    context.draw(false, function() {
      wx.canvasToTempFilePath({
        canvasId: 'firstCanvas',
        success(res) {
          _this.setData({
            'tempFilePath': res.tempFilePath
          }, function() {
            _this.setData({
              'imgShow': true
            });
          });
        }
      })
    })
    this.setData({
      "visableFlag": "visible"
    });
    this.setData({
      "textareaShow": false
    });
  },

  savePic: function(e) {
    let _this = this;
    wx.showModal({
      title: '保存本地',
      content: '是否保存到本地图片？',
      success(res) {
        if (res.confirm) {
          wx.saveImageToPhotosAlbum({
            filePath: _this.data.tempFilePath,
            success(res) {
              _this.cancelCustem();
              wx.showToast({
                title: '保存成功',
                icon: 'none',
                duration: 2000
              })
            },
          })
        }
      }
    })
  },
  cancelCustem: function(e) {
    this.setData({
      "visableFlag": "hidden"
    });
    this.setData({
      "textareaShow": true
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function(e) {




  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})