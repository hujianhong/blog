/**
 * 青菜萝卜 前端模板
 * 所有前端模板的定义
 */

layui.define(function(exports) {
	
	var tpl = {
		// 首页博客列表模板
		blogListTpl:
		'{{#  layui.each(d.list, function(index, item){ }}\
			<article class="qing-entry-article">\
		    <div class="am-u-lg-12 am-u-md-12 am-u-sm-12 qing-entry-text">\
		    	 <div class="qing-list-title">\
		    	 		<span class="qing-category">{{item.categoryName}}<i></i></span><a href="{{item.url}}"> {{item.title}}</a>\
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
			</article>\
		{{# });}}'
	    ,
		// 博客分类标签模板
		blogTagTpl: 
		'{{#  layui.each(d.data, function(index, item){ }}\
			<span class="qing-tag qing-tag{{ index % 4}} am-radius" >\
				{{item.tagName}}({{item.blogNum}})\
			</span>\
		{{# });}}'
		,
		
		// 热门博客模板
		hotestBlogsTpl:
		'{{#  layui.each(d.data.list, function(index, item){ }}\
			<li>\
				<!--<a href="{{item.url}}">{{item.title}}</a>-->\
				<a href="article.html">{{item.title}}</a>\
				<span><i class="am-icon-comments-o" title="评论数"> </i> {{item.readNum}}</span>\
			</li>\
		{{# });}}'
		,
		
		// 热门排行模板
		hotRankTpl:
		'{{#  layui.each(d.data, function(index, item){ }}\
			<li>\
				<!--<a href="{{item.url}}">{{item.title}}</a>-->\
				<a href="article.html">{{item.title}}</a>\
				<span><i class="am-icon-eye-slash" title="评论数"> </i> {{item.readNum}}</span>\
				<span><i class="am-icon-comments-o" title="评论数"> </i> {{item.commentNum}}</span>\
				<span><i class="am-icon-heart-o" title="评论数"> </i> {{item.heartNum}}</span>\
			</li>\
		{{# });}}'
		,
		
		// 猜你喜欢模板
		recommendBlogsTpl:
		'{{#  layui.each(d.data, function(index, item){ }}\
			<li>\
				<!--<a href="{{item.url}}">{{item.title}}</a>-->\
				<a href="article.html">{{item.title}}</a>\
				<span><i class="am-icon-eye-slash" title="评论数"> </i> {{item.readNum}}</span>\
			</li>\
		{{# });}}'
		,
		
		// 最新博客模板
		latestBlogsTpl:
		'{{#  layui.each(d.data.list, function(index, item){ }}\
			<li>\
				<!--<a href="{{item.url}}">{{item.title}}</a>-->\
				<a href="article.html">{{item.title}}</a>\
				<span><i class="am-icon-eye" title="阅读数"> </i> {{item.readNum}}</span>\
			</li>\
		{{# });}}'
		
		,
		
		blogTimelineTpl:
		'{{#  layui.each(d.data, function(index, item){ }}\
			<span class="qing-tag qing-tag0 am-radius" id="{{item.id}}">\
				{{item.displayName}}\
			</span>\
		{{# });}}'
		,
	}
    // 导出模板文件
	exports('qingtpl', tpl);
});