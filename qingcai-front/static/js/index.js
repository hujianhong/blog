/**
 * 
 * 青菜萝卜 主入口
 * 
 */
layui.define(['util','api','layer','laytpl','form','qingleft'], function(exports) {
	var $ = layui.jquery;
	var layer = layui.layer;
	var util = layui.util;
	var api = layui.api;
	var form = layui.form();
	var laytpl = layui.laytpl;
	
	var qingleft = layui.qingleft;
  
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
	
	// 加载左侧内容
	qingleft.edge({
		elem:$("#qing-left"),
	});
	
	//右下角固定Bar
	util.fixbar();
	
	var lunboTpl = 
		'{{# layui.each(d,function(index,item){ }}\
			<li>\
		    	<img src="{{item.coverURL}}" class="qing-slider-img"/>\
			    <div class="am-slider-desc qing-slider-desc">\
			      <span>{{item.title}}</span>\
			    </div>\
		    </li>\
	    {{# });}}';
	    
	var lunbo = {
		init:function(){
			// 加载轮播
			api.blogLunbo({},function(result){
				var tpl = laytpl(lunboTpl);
				tpl.render(result.data,function(html){
					// 渲染数据
					$("#qing-lunbo").html(html);
					// 轮播组件设置
					lunbo.event();
				});
			});
		},
		event:function(){
			// 轮播组件设置	
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
		}
	}
	lunbo.init();
	
	exports('index', {});
});



						    