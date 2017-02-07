/**
 * 青菜萝卜左侧侧边栏
 * 
 */

layui.define(['layer','laytpl','api','qingad','qingbqy'],function(exports){
	var api = layui.api;
	var qingad = layui.qingad;
	var qingbqy = layui.qingbqy;
	var laytpl = layui.laytpl;
	var layer = layui.layer;
	
	var leftPTpls = [
		{
			tpl:
			'<div class="qing-margin-bottom">\
			  <div class="qing-panel">\
			  	<div class="qing-panel-title">\
			  		<h2>文章分类</h2>\
			  	</div>\
			  	<div class="qing-panel-body">\
			  		<div id="blog-tags"></div>\
			  	</div>\
			  </div>\
			</div>',
			sort:1
		},
		{
			tpl:
			'<div class="qing-margin-bottom">\
	    	  <div class="qing-panel">\
	    	  	<div class="qing-panel-title">\
	    	  		<h2>最新文章</h2>\
	    	  	</div>\
	    	  	<div class="qing-panel-body">\
	    	  		<ol class="qing-list-one" id="lastest-blogs"></ol>\
	    	  	</div>\
	    	  </div>\
	    	</div>',
			sort:2
		},
		{
			tpl:
			'<div class="qing-margin-bottom">\
	    	   <div class="qing-panel">\
		    	  	<div class="qing-panel-title">\
		    	  		<h2>标签云</h2>\
		    	  	</div>\
		    	  	<div class="qing-panel-body">\
		    	  		<div class="qing-tag-cloud" id="qing-tag-cloud"></div>\
		    	  	</div>\
		    	</div>\
	    	</div>',
	    	sort:3,
		},
		{
			tpl:
			'<div class="qing-margin-bottom">\
	    	  <div class="qing-panel">\
	    	  	<div class="qing-panel-title">\
	    	  		<h2>猜你喜欢</h2>\
	    	  	</div>\
	    	  	<div class="qing-panel-body">\
	    	  		<ol class="qing-list-one" id="recommend-blogs"></ol>\
	    	  	</div>\
	    	  </div>\
	    	</div>',
	    	sort:4,
		},
//		{
//			tpl:
//			'<div class="qing-margin-bottom">\
//			  <div class="qing-panel">\
//			  	<div class="qing-panel-title">\
//			  		<h2>文章归档</h2>\
//			  	</div>\
//			  	<div class="qing-panel-body">\
//			  		<div class="fly-tip" id="blog-timeline"></div>\
//			  	</div>\
//			  </div>\
//			</div>',
//	    	sort:5,
//		},
		{
			tpl:
			'<div class="qing-margin-bottom">\
	    	  <div class="qing-panel">\
	    	  	<div class="qing-panel-title">\
	    	  		<h2>联系我</h2>\
	    	  	</div>\
	    	  	<div class="qing-panel-body">\
	    	  		<p class="am-text-left">邮箱：1043244432@qq.com</p>\
		            <p class="am-text-left">QQ交流群：545418785</p>\
		            <p class="am-text-left">\
	            	       社交账号：\
		                <a href="https://github.com/hujianhong" target="_blank"><span class="am-icon-github am-icon-fw blog-icon blog-icon"></span></a>\
		                <a href="http://weibo.com/p/1005055576062761?is_all=1" target="_blank"><span class="am-icon-weibo am-icon-fw blog-icon blog-icon"></span></a>\
		                <a href=""><span class="am-icon-weixin am-icon-fw blog-icon blog-icon"></span></a>\
		                <a href=""><span class="am-icon-twitter am-icon-fw blog-icon blog-icon"></span></a>\
	           		</p>\
	    	  	</div>\
	    	  </div>\
	    	</div>',
	    	sort:6,
		},
		{
			tpl:
			'<div class="qing-margin-bottom">\
		    	<div class="qing-panel">\
		    	  	<div class="qing-panel-title">\
		    	  		<h2>友情链接</h2>\
		    	  	</div>\
		    	  	<div class="qing-panel-body">\
		    	  		<p>\
						  <ul>\
		                    <li><a href="https://www.oschina.net" target="_blank">开源中国社区</a></li>\
		                    <li><a href="http://amazeui.org" target="_blank">Amaze ~ 妹子 UI</a></li>\
		                    <li><a href="https://github.com/hujianhong" target="_blank">我的GitHub</a></li>\
		                    <li><a href="https://www.qiniu.com" target="_blank">七牛云存储</a></li>\
		                  </ul>\
						</p>\
		    	  	</div>\
		    	</div>\
		    </div>',
	    	sort:7,
		}
	];
	
	var leftCTpl = {
		// 博客分类标签模板
		blogTagTpl: 
		'{{#  layui.each(d.data, function(index, item){ }}\
			<span class="qing-tag qing-tag{{ index % 4}} am-radius" >\
				{{item.tagName}}({{item.blogNum}})\
			</span>\
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
		tagCloudListTpl:
		'{{# layui.each(d,function(index,item){ }}\
			<a class="qing-tcloud-color{{index % 5}}"\
			href="javascript:;" data="{{item.id}}"title="{{item.name}}">{{item.name}}</a>\
		{{# });}}'
	}
	
	leftPTpls.sort(function(a,b){
		return a.sort - b.sort;
//		return b.sort - a.sort;
	});
	
	
	var leftMTpl = {
		tpl:
		'{{#  layui.each(d, function(index, item){ }}\
			{{item.tpl}}\
		{{# }); }}'
	}
	
	var action = {
		showBlogCategory:function(){
			api.showBlogCategory({},function(result){
				// 加载模板
				var tpl = laytpl(leftCTpl.blogTagTpl);
				// 渲染数据
				tpl.render(result,function(html){
					// 显示内容
					$("#blog-tags").html(html);
				});
			});
		},
		showZuixinBlog:function(){
			api.showZuixinBlog({},function(result){
				// 加载模板
				var tpl = laytpl(leftCTpl.latestBlogsTpl);
				// 渲染数据
				tpl.render(result,function(html){
					// 显示内容
					$("#lastest-blogs").html(html);
				});
			});
		},
		showRecommedBlog:function(){
			var params = {
				pageNum:1,
				pageSize:5
			};
			api.showRecommedBlog(params,function(result){
				// 加载模板
				var tpl = laytpl(leftCTpl.recommendBlogsTpl);
				// 渲染数据
				tpl.render(result,function(html){
					// 显示内容
					$("#recommend-blogs").html(html);
				});
			});
		},
		showBlogTimeline:function(){
			api.showBlogTimeline({},function(result){
				// 加载模板
				var tpl = laytpl(leftCTpl.blogTimelineTpl);
				// 渲染数据
				tpl.render(result,function(html){
					// 显示内容
					$("#blog-timeline").html(html);
				});
			});
		},
		showYoulian:function(){
			
		}
	};
	
	var leftEdge = {
		/**
		 * 
		 * @param {Object} options
		 * options = {
		 *	 elem: elem, // 容器
		 * }
		 */
		edge:function(options){
			// 加载广告
			leftPTpls.push(qingad.leftAD());
			// 渲染数据
			laytpl(leftMTpl.tpl).render(leftPTpls,function(html){
				// 显示内容
				options.elem.html(html);
				// 渲染数据
				action.showBlogCategory();
				action.showZuixinBlog();
//				action.showBlogTimeline();
				action.showRecommedBlog();
			});
			// 标签云数据
			api.blogTagCloud({},function(result){
				var tagTpl = laytpl(leftCTpl.tagCloudListTpl);
				tagTpl.render(result.data,function(html){
					$("#qing-tag-cloud").html(html);
					// 添加动画
					qingbqy.amination({
						cntr:'qing-tag-cloud',
						tagElem:'a'
					});
					// 设置点击事件
					$(".qing-tag-cloud a").on("click",function(event){
						var data = $(this).attr("data");
						var title = $(this).attr("title");
						layer.msg("你选中了:" + title + ", sorry,尚未实现该功能....");
						
					});
				});
			});
		}
	};
	exports('qingleft',leftEdge);
});


