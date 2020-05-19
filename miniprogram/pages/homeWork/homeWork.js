// pages/homeWork/homeWork.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    btnArr:[
      { name: "开关", icon:"icon-kaiguan"},
      { name: "小夜灯", icon: "icon-yejianmoshi"},
      { name: "阅读", icon: "icon-book"},
      { name: "影音", icon: "icon-music"}
    ],
    sliderArr:[
      { icon: "icon-wendu", max: 6000,min:3000, value: 3000, func: "temperature"},
      { icon: "icon-liangdu-", max: 100, min:0,value: 50, func: "brightness"}
    ],
    selectedBtn:-1,
    selectSwitchBtn:true,
    colorSet: {
      lightColor:{ r:255, g:214, b:162},
      deepColor:{ r:255, g:124, b:18}
    },
    colorSource: {
      lightColor: { r: 255, g: 214, b: 162 },
      deepColor: { r: 255, g: 124, b: 18 }
    },
    disabledSlider:false,
    circleColor:"white"
  },

  temperature:function(e){
    let valueTemp = e.detail.value ;
    let lightG = this.data.colorSource.lightColor.g;
    let deepG = this.data.colorSource.deepColor.g;
    this.setData({ 'sliderArr[0].value': valueTemp});
    this.setData({ 'colorSet.lightColor.g': (valueTemp - 3000) * 1.18 * lightG / 3000  });
    this.setData({ 'colorSet.deepColor.g': (valueTemp - 3000) * 2 * deepG / 3000  });
  },
  brightness:function(e){
    let valueTemp = e.detail.value;
    let lightB = this.data.colorSource.lightColor.b;
    let deepB = this.data.colorSource.deepColor.b;
    this.setData({ 'sliderArr[1].value': valueTemp });
    this.setData({ 'colorSet.lightColor.b': valueTemp * 1.5 * lightB / 100 });
    this.setData({ 'colorSet.deepColor.b': valueTemp * 7 * deepB / 100 });
  },

  selectMode:function(e){
    this.setData({ 'selectedBtn': e.currentTarget.dataset.index });
    this.setData({ 'colorSet.lightColor.r': Math.round(Math.random()*255) });
    this.setData({ 'colorSet.lightColor.g': Math.round(Math.random() * 255) });
    this.setData({ 'colorSet.lightColor.b': Math.round(Math.random() * 255) });
    this.setData({ 'colorSet.deepColor.r': Math.round(Math.random()*255) });
    this.setData({ 'colorSet.deepColor.g': Math.round(Math.random() * 255) });
    this.setData({ 'colorSet.deepColor.b': Math.round(Math.random() * 255) });
  },

  switchBtn:function(e){
    this.setData({ 'selectSwitchBtn': !this.data.selectSwitchBtn });
    this.setData({ 'disabledSlider': !this.data.disabledSlider });
    this.setData({ 'sliderArr[0].value': 3000 });
    this.setData({ 'sliderArr[1].value': 50 });
    this.setData({ 'circleColor': "white" });
    this.setData({
      'colorSet': {
        lightColor: { r: 255, g: 214, b: 162 },
        deepColor: { r: 255, g: 124, b: 18 }
      } });
    if (!this.data.selectSwitchBtn){
      this.setData({ 'selectedBtn': -1 });
      this.setData({
        'colorSet': {
          lightColor: { r: 255, g: 255, b: 255 },
          deepColor: { r: 0, g: 0, b: 0 }
        } });
      this.setData({ 'sliderArr[0].value': 3000 });
      this.setData({ 'sliderArr[1].value': 0 });
      this.setData({ 'circleColor': "gray" });
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.testFunction();
    // console.log(this.data.btnArr)
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