/**
 * 
 * 青菜萝卜 主入口
 * 
 */
layui.define(['api','layer','laytpl','laypage','common','qingleft'], function(exports) {
	var $ = layui.jquery;
	var layer = layui.layer;
	var api = layui.api;
	var laytpl = layui.laytpl;
	var common = layui.common;
	var laypage = layui.laypage;
	
	var tpl = {
		blogListTpl:
		'{{#  layui.each(d.list, function(index, item){ }}\
		    <div class="qing-entry-text">\
		    	 <div class="qing-list-title">\
		    	 	<span class="qing-category">{{item.typeName}}<i></i></span><a href="{{item.url}}"> {{item.title}}</a>\
		    	 </div>\
			     <div class="qing-list-hint">\
			       	<span><i class="am-icon-user qing-color-author" title="作者"></i> {{item.author}} &nbsp;</span>\
				    <span><i class="am-icon-clock-o qing-color-clock" title="时间"></i> {{item.publishTime}}</span>\
				    <span><i class="am-icon-eye-slash qing-color-eye" title="阅读"></i> 阅读({{item.readNum}})</span>\
			        <span><i class="am-icon-comments-o qing-color-comment" title="评论"></i> 评论({{item.commentNum}})</span>\
			        <span><i class="am-icon-heart-o qing-color-heart" title="点赞"></i> 点赞({{item.heartNum}})</span>\
			     </div>\
		       	{{# if(item.summary != null && item.summary.length > 200) { }}\
		       		<p class="qing-list-content">{{item.summary.substring(0,200) + "......"}}</p>\
		      	 {{# } else { }}\
		      	 <p class="qing-list-content">{{ item.summary }}</p>\
		       	{{# } }}\
		       	<div class="qing-list-foot">\
		       		{{# if(item.tags.length > 0) { }}\
		       			<i class="am-icon-tags"></i>\
		       		{{# } }}\
		       		{{#  layui.each(item.tags, function(index, tag){ }}\
		       				<span class="am-radius">#{{tag}}</span>\
		       	  	{{# });}}\
	            	<a href="{{item.url}}" class="qing-read-more">阅读全文>></a>\
		      	 </div> \
		    </div>\
		{{# });}}'
		,
		lunboTpl: 
		'<div class="am-slider am-slider-default" data-am-flexslider="{playAfterPaused: 8000}">\
		  <ul class="am-slides qing-text-center" >\
		    {{# layui.each(d,function(index,item){ }}\
				<li>\
					<a href="{{item.url}}">\
			    		<img src="{{item.coverURL}}" class="qing-slider-img"/>\
			    	</a>\
				    <div class="am-slider-desc qing-slider-desc">\
				      <span><a class="qing-lunbo-a" href="{{item.url}}">{{item.title}}</a></span>\
				    </div>\
			    </li>\
		    {{# });}}\
		  </ul>\
		</div>'
		
	    ,
	    // 热门排行模板
		hotRankTpl:
		'<div class="qing-panel">\
		  	<div class="qing-panel-title">\
		  		<h2 class="qing-hot-rank-title">热门排行</h2>\
		  	</div>\
		  	<div class="qing-panel-body">\
		  		<div class="qing-item-cnt">\
		  		{{#  layui.each(d.data, function(index, item){ }}\
					<div class="qing-item-list">\
						<a class="qing-item-link" href="{{item.url}}">{{item.title}}</a>\
						<span>{{item.readNum}}阅/{{item.commentNum}}评/{{item.heartNum}}赞</span>\
					</div>\
				{{# });}}\
		  		</<div>\
		  	</div>\
		  </div>'
		  ,
	}
    
    var pageSize = 10;
	    
	var action = {
		callback : function(params){
			api.showBlog(params,function(result){
				// 渲染数据
				laytpl(tpl.blogListTpl).render(result.data,function(html){
					// 显示内容
					$("#blog-list").html(html);
				});
				// 回到顶部
				var speed=200;//滑动的速度
                $('body').animate({ scrollTop: 0 }, speed);
			});
		},
		showBlog:function(){
			var params = {
				pageNum:1,
				pageSize:pageSize
			};
			api.showBlog(params,function(result){
				// 渲染数据
				laytpl(tpl.blogListTpl).render(result.data,function(html){
					// 显示内容
					$("#blog-list").html(html);
				});
				// 调用分页
				laypage({
					cont: 'blog-pager',
					pages: result.data.totalPage, //得到总页数
					jump: function(conf,first) {
						if(first){
							return;
						}
						action.callback({
							pageNum:conf.curr,
							pageSize:pageSize
						});
					}
				});
			});
		},
		showLunbo:function(){
			// 加载轮播
			api.blogLunbo({},function(result){
				laytpl(tpl.lunboTpl).render(result.data,function(html){
					// 渲染数据
					$("#qing-lunbo").html(html);
					// 轮播组件设置
					action.event();
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
			});
		},
		showHotRankBlog:function(){
    		var p = {
				pageNum:1,
				pageSize:5
			};
			api.showHotRankBlog(p,function(result){
				// 渲染数据
				laytpl(tpl.hotRankTpl).render(result,function(html){
					// 显示内容
					$("#hot-rank-blogs").html(html);
				});
			});
    	}
	}
	action.showLunbo();
	action.showBlog();
	action.showHotRankBlog();
	
	var qingleft = layui.qingleft;
	exports('index', {});
});



						    