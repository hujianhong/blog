/**
 * 
 * 青菜萝卜 主入口
 * 
 */
layui.define(['util','api','layer','form'], function(exports) {
	var $ = layui.jquery;
	var layer = layui.layer;
	var util = layui.util;
	var api = layui.api;
	var form = layui.form();
  
    //监听提交
    form.on('submit(search)', function(data){
    	
    	var searchKey = JSON.stringify(data.field.search);
	    layer.msg("你要搜索的内容是" + searchKey +"，对不起，搜索功能暂时还没有实现。。。");
	    return false;
    });
    
    form.on('submit(search-sm)', function(data){
    	var searchKey = $("#search-sm").val()
	    layer.msg("你要搜索的内容是" + searchKey +"，对不起，搜索功能暂时还没有实现。。。");
	    return false;
    });
    
    //监听提交
    form.on('submit',function(data){
    	var searchKey = $("#search").val() || $("#search-sm").val();
	    layer.msg("你要搜索的内容是" + searchKey +"，对不起，搜索功能暂时还没有实现。。。");
	    return false;
    });
	
	api.loadHotRankBlogs();
	
	api.loadBlogs();
	
    api.loadBlogTags();
	
	api.loadBlogTimeline();
	
	api.loadLastestBlogs();
	
	api.loadRecommedBlogs();
	
	//右下角固定Bar
	util.fixbar();
	
	
	$('.am-slider').flexslider({
	  playAfterPaused: 8000,
	  before: function(slider) {
	    if (slider._pausedTimer) {
	      window.clearTimeout(slider._pausedTimer);
	      slider._pausedTimer = null;
	    }
	  },
	  after: function(slider) {
	    var pauseTime = slider.vars.playAfterPaused;
	    if (pauseTime && !isNaN(pauseTime) && !slider.playing) {
	      if (!slider.manualPause && !slider.manualPlay && !slider.stopped) {
	        slider._pausedTimer = window.setTimeout(function() {
	          slider.play();
	        }, pauseTime);
	      }
	    }
	  }
	  // 设置其他参数
	});

	exports('index', {});
});