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
			  		<div id="blog-category"></div>\
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
	    	  	<div class="qing-panel-body" id="lastest-blogs"></div>\
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
	    	  	<div class="qing-panel-body" id="recommend-blogs"></div>\
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
		            <!--<p class="am-text-left">\
	            	       社交账号：\
		                <a href="https://github.com/hujianhong" target="_blank"><span class="am-icon-github am-icon-fw am-icon-sm"></span></a>\
		                <a href="http://weibo.com/p/1005055576062761?is_all=1" target="_blank"><span class="am-icon-weibo am-icon-fw am-icon-sm"></span></a>\
	           		</p>-->\
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
		    	  	<div class="qing-panel-body" id="qing-youlian">\
		    	  	</div>\
		    	</div>\
		    </div>',
	    	sort:7,
		}
	];
	
	var leftCTpl = {
		// 博客分类标签模板
		blogCategoryTpl: 
		'{{#  layui.each(d.data, function(index, item){ }}\
			<span id="{{item.id}}" val="{{item.name}}" class="qing-left-category qing-left-category{{ index % 4}} am-radius" >\
				{{item.name}}({{item.blogNum}})\
			</span>\
		{{# });}}'
		,
		// 热门排行模板
		hotRankTpl:
		'<div class="qing-item-cnt">\
			{{#  layui.each(d.data, function(index, item){ }}\
				<div class="qing-item-list">\
					<a class="qing-item-link" href="{{item.url}}">{{item.title}}</a>\
					<span>{{item.readNum}}阅/{{item.commentNum}}评/{{item.heartNum}}赞</span>\
				</div>\
			{{# });}}\
  		</<div>'
		,
		// 猜你喜欢模板
		recommendBlogsTpl:
		'<div class="qing-item-cnt">\
			{{#  layui.each(d.data, function(index, item){ }}\
				<div class="qing-item-list">\
					<a class="qing-item-link" href="{{item.url}}">{{item.title}}</a>\
					<span>{{item.readNum}}阅/{{item.commentNum}}评/{{item.heartNum}}赞</span>\
				</div>\
			{{# });}}\
  		</<div>'
		,
		// 最新博客模板
		latestBlogsTpl:
		'<div class="qing-item-cnt">\
			{{#  layui.each(d.data.list, function(index, item){ }}\
				<div class="qing-item-list">\
					<a class="qing-item-link" href="{{item.url}}">{{item.title}}</a>\
					<span>{{item.readNum}}阅/{{item.commentNum}}评/{{item.heartNum}}赞</span>\
				</div>\
			{{# });}}\
  		</<div>'
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
		,
		youlianTpl:
		'<p>\
		  <ul>\
		  {{# layui.each(d.data,function(index,item){ }}\
            <li><a href="{{item.url}}" target="_blank">{{item.name}}</a></li>\
          </ul>\
          {{# });}}\
		</p>'
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
				var tpl = laytpl(leftCTpl.blogCategoryTpl);
				// 渲染数据
				tpl.render(result,function(html){
					// 显示内容
					$("#blog-category").html(html);
					// 添加事件
					$(".qing-left-category").on("click",function(event){
						var id=$(event.target).attr("id");
						var name=$(event.target).attr("val");
						location.href="category.html?id=" + id + "&name=" + name;
					});
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
			api.showYoulian({},function(result){
				// 加载模板
				var tpl = laytpl(leftCTpl.youlianTpl);
				// 渲染数据
				tpl.render(result,function(html){
					// 显示内容
					$("#qing-youlian").html(html);
				});
			});
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
			//leftPTpls.push(qingad.leftAD());
			// 渲染数据
			laytpl(leftMTpl.tpl).render(leftPTpls,function(html){
				// 显示内容
				options.elem.html(html);
				// 渲染数据
				action.showBlogCategory();
				action.showZuixinBlog();
//				action.showBlogTimeline();
				action.showRecommedBlog();
				action.showYoulian();
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
						location.href="tag.html?id=" + data + "&name=" + title;
					});
				});
			});
		}
	};
	
	// 加载左侧内容
	leftEdge.edge({
		elem:$("#qing-left"),
	});
	
	exports('qingleft',{});
});


