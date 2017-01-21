/**
 * 青菜萝卜 API
 * 所有异步请求的地址
 */

layui.define(['laytpl', 'laypage', 'layer','qingtpl'],function(exports) {
	var $ = layui.jquery;
	var laypage = layui.laypage;
	var layer = layui.layer;
	var laytpl = layui.laytpl;
	var qingtpl = layui.qingtpl;
	
	var BASE_PREFIX = "http://www.huding.name";
	
//	var BASE_PREFIX = "http://192.168.1.102";

	var pageSize = 10;
	
	var api = {
		/**
		 * 博文列表请求地址
		 */
		BLOG_DISPLAY_URL : BASE_PREFIX + "/luobo/showBlogs",
		/**
		 * 博文标签请求地址
		 */
		TAGS_DISPLAY_URL : BASE_PREFIX + "/luobo/showTags",
		/**
		 * 博文归档地址
		 */
		BLOG_TIMELINE_URL: BASE_PREFIX + "/luobo/blog/timeline",
		/**
		 * 热门排行地址
		 */
		HOT_RANK_URL: BASE_PREFIX + "/luobo/blog/hotRank",
		/**
		 * 猜你喜欢地址
		 */
		BLOG_RECOMMEND_URL: BASE_PREFIX + "/luobo/blog/recommend",
		/**
		 * 博客轮播地址
		 */
		BLOG_LUNBO_URL: BASE_PREFIX + "/luobo/blog/lunbo",
		/**
		 * 
		 */
		BLOG_TAGS_URL: BASE_PREFIX + "/luobo/blog/blogTags",
		/**
		 * 博文评论地址
		 */
		BLOG_COMMENT_URL: BASE_PREFIX + "/luobo/comment/show",
		/**
		 * 
		 */
		COMMENT_LIKE_URL: BASE_PREFIX + "/luobo/comment/like",
		/**
		 * 
		 */
		COMMENT_HATE_URL: BASE_PREFIX + "/luobo/comment/hate",
		/**
		 * 
		 */
		COMMENT_REPORT_URL: BASE_PREFIX + "/luobo/comment/report",
		/**
		 * 
		 */
		UPLOAD_IMG_URL : BASE_PREFIX + "/luobo/upload/uploadImage",
	}
	
	var action = {
		//Ajax
		doAjax: function(url, data, success, options) {
			var that = this;
			options = options || {};
			data = data || {};
			return $.ajax({
				type: options.type || 'post',
				dataType: options.dataType || 'json',
				data: data,
				url: url,
				success: function(res) {
					console.log(res);
					if(res.code == 0) {
						success && success(res);
					} else {
						layer.msg(res.msg || res.code, {
							shift: 6
						});
					}
				},
				error: function(e) {
					options.error || layer.msg('请求异常，请重试', {
						shift: 6
					});
				}
			});
		},
		
		blogLunbo:function(params,success){
			action.doAjax(api.BLOG_LUNBO_URL,params,success);
		},
		/*
		 * 请求博文标签云数据
		 */
		blogTagCloud:function(params,success) {
			action.doAjax(api.BLOG_TAGS_URL,params,success);
		},
		qingComment:function(params,success) {
			action.doAjax(api.BLOG_COMMENT_URL,params,success);
		},
		commentLike:function(params,success){
			action.doAjax(api.COMMENT_LIKE_URL,params,success);
		},
		uploadImage:function(params,success){
			layui.use('upload', function(){
				layui.upload({
					url: api.UPLOAD_IMG_URL,
					success: success
				});
			});
		},
		reportComment:function(params,success){
			action.doAjax(api.COMMENT_REPORT_URL,params,success);
		},
		
		
		/* 待修改函数 */
		loadBlogTags : function (){
			action.doAjax(api.TAGS_DISPLAY_URL,{},function(result){
				// 加载模板
				var tpl = laytpl(qingtpl.blogTagTpl);
				// 渲染数据
				tpl.render(result,function(html){
					// 显示内容
					$("#blog-tags").html(html);
				});
			});
		},
		
		loadHotestBlogs : function (){
			action.doAjax(api.BLOG_DISPLAY_URL,{},function(result){
				// 加载模板
				var tpl = laytpl(qingtpl.hotestBlogsTpl);
				// 渲染数据
				tpl.render(result,function(html){
					// 显示内容
					$("#hotest-blogs").html(html);
				});
			});
		},
		loadHotRankBlogs:function(){
			var params = {
				pageNum:1,
				pageSize:5
			};
			action.doAjax(api.HOT_RANK_URL,params,function(result){
				// 加载模板
				var tpl = laytpl(qingtpl.hotRankTpl);
				// 渲染数据
				tpl.render(result,function(html){
					// 显示内容
					$("#hot-rank-blogs").html(html);
				});
			});
		},
		loadRecommedBlogs:function(){
			var params = {
				pageNum:1,
				pageSize:5
			};
			action.doAjax(api.BLOG_RECOMMEND_URL,params,function(result){
				// 加载模板
				var tpl = laytpl(qingtpl.recommendBlogsTpl);
				// 渲染数据
				tpl.render(result,function(html){
					// 显示内容
					$("#recommend-blogs").html(html);
				});
			});
		},
		loadBlogTimeline:function(){
			action.doAjax(api.BLOG_TIMELINE_URL,{},function(result){
				// 加载模板
				var tpl = laytpl(qingtpl.blogTimelineTpl);
				// 渲染数据
				tpl.render(result,function(html){
					// 显示内容
					$("#blog-timeline").html(html);
				});
			});
		},
		loadLastestBlogs : function (){
			action.doAjax(api.BLOG_DISPLAY_URL,{},function(result){
				// 加载模板
				var tpl = laytpl(qingtpl.latestBlogsTpl);
				// 渲染数据
				tpl.render(result,function(html){
					// 显示内容
					$("#lastest-blogs").html(html);
				});
			});
		},
		pageCallback : function(pageNum,pageSize){
			var params = {
				pageNum:pageNum,
				pageSize:pageSize
			};
			action.doAjax(api.BLOG_DISPLAY_URL,params,function(result){
				// 加载模板
				//var tpl = laytpl($("#blog-list-template").html());
				var tpl = laytpl(qingtpl.blogListTpl);
				// 渲染数据
				tpl.render(result.data,function(html){
					// 显示内容
					$("#blog-list").html(html);
				});
				// 回到顶部
				var speed=200;//滑动的速度
                $('body').animate({ scrollTop: 0 }, speed);
			});
		},
		loadBlogs : function(){
			var params = {
				pageNum:1,
				pageSize:pageSize
			};
			action.doAjax(api.BLOG_DISPLAY_URL,params,function(result){
				// 加载模板
				var tpl = laytpl(qingtpl.blogListTpl);
				// 渲染数据
				tpl.render(result.data,function(html){
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
						action.pageCallback(conf.curr,pageSize);
					}
				});
			});
		},
	}
	exports('api', action);
});