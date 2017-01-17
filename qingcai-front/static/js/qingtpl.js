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
	            <!--<a href="{{item.url}}" class="qing-read-more">阅读全文>></a>-->\
	            <a href="article.html">阅读全文>></a>\
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
		blogCommentListTpl:
		'{{# if(d.list.length > 0) { }}\
			{{#  layui.each(d.list, function(index, item){ }}\
				<div class="qing-comment-main" data="{{item.id}}">\
					<div class="qing-comment-avatar">\
						<div class="qing-comment-img">\
							<img src="static/img/100.jpg" />\
						</div>\
					</div>\
					<div class="qing-comment-body">\
						<div class="qing-comment-meta">\
							<span class="qing-comment-author"><strong>{{item.nickname}}</strong></span> 评论于 <span>{{item.cdate}}</span>\
						</div>\
						<p class="qing-comment-content">{{item.content}}</p>\
						<div class="qing-comment-hint">\
							<span type="share"><i class="am-icon-share"></i> <span>分享</span>(<em>{{item.shareNum}}</em>)</span>\
							<span type="like"><i class="am-icon-thumbs-o-up"></i> <span>点赞</span>(<em>{{item.likeNum}}</em>)</span>\
							<span type="reply"><i class="am-icon-reply"></i> <span>回复</span>(<em>{{item.replyNum}}</em>)</span>\
						</div>\
					</div>\
				</div>\
			{{# }); }}\
		{{# } else { }}\
			<div class="qing-comment-no"><div class="qing-comment-tip">暂无评论,快抢沙发</div></div>\
		{{# } }}',
		
		qingEditorTpl:
		'<div class="fly-edit">\
			<span type="face" title="插入表情"><i class=""></i>表情</span>\
			<span type="picture" title="插入图片：img[src]"><i class="iconfont icon-tupian"></i>图片</span>\
			<span type="href" title="超链接格式：a(href)[text]"><i class="iconfont icon-lianjie"></i>链接</span>\
			<span type="code" title="插入代码"><i class="am-icon-code"></i>代码</span>\
			<span type="yulan" title="预览"><i class="am-icon-"></i>预览</span>\
		</div>'
	}
    // 导出模板文件
	exports('qingtpl', tpl);
});