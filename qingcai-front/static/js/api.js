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
	
//	var BASE_PREFIX = "http://www.huding.name";
	
	var BASE_PREFIX = "http://192.168.1.102";

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
		 * 博文文章归档地址
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
		
		
		//Ajax
		load: function(url, data, success, options) {
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
					// 暂时使用1000代表成功
					// 正式使用0表示
//					if(res.code == 1000) {
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
		
		
		loadBlogTags : function (){
			api.load(api.TAGS_DISPLAY_URL,{},function(result){
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
			api.load(api.BLOG_DISPLAY_URL,{},function(result){
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
			api.load(api.HOT_RANK_URL,params,function(result){
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
			api.load(api.BLOG_RECOMMEND_URL,params,function(result){
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
			api.load(api.BLOG_TIMELINE_URL,{},function(result){
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
			api.load(api.BLOG_DISPLAY_URL,{},function(result){
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
			api.load(api.BLOG_DISPLAY_URL,params,function(result){
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
			api.load(api.BLOG_DISPLAY_URL,params,function(result){
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
						api.pageCallback(conf.curr,pageSize);
					}
				});
			});
		},
		commentPageCallback : function(pageNum,pageSize){
			var id = $("#qing-blog-id").val();
			var params = {
				pageNum:pageNum,
				pageSize:pageSize,
				id:id
			};
			api.load(api.BLOG_COMMENT_URL,params,function(result){
				// 加载模板
				//var tpl = laytpl($("#blog-list-template").html());
				var tpl = laytpl(qingtpl.blogCommentListTpl);
				// 渲染数据
				tpl.render(result.data,function(html){
					// 显示内容
					$("#blog-comment-num").html(result.data.totalRow);
					$("#qing-comment-list").html(html);
					// 监听事件
					layui.use('comment',function(comment){
						comment.onClick();
					});
				});
				// 回到顶部
				var speed=200;//滑动的速度
				var top = $("#qing-comment-list").offset().top;
                $('body').animate({ scrollTop:  top - 100 }, speed);
			});
		},
		
		loadBlogComments : function(){
			var id = $("#qing-blog-id").val();
			var params = {
				pageNum:1,
				pageSize:pageSize,
				id:id
			};
			api.load(api.BLOG_COMMENT_URL,params,function(result){
				// 加载模板
				var tpl = laytpl(qingtpl.blogCommentListTpl);
				// 渲染数据
				tpl.render(result.data,function(html){
					// 显示内容
					$("#blog-comment-num").html(result.data.totalRow);
					$("#qing-comment-list").html(html);
					// 监听事件
					layui.use('comment',function(comment){
						comment.onClick();
					});
				});
				// 调用分页
				laypage({
					cont: 'comment-pager',
					pages: result.data.totalPage, //得到总页数
					jump: function(conf,first) {
						if(first){
							return;
						}
						api.commentPageCallback(conf.curr,pageSize);
					}
				});
			});
		},
		commentLike:function(params,success){
			api.load(api.COMMENT_LIKE_URL,params,success);
		}
	}
	exports('api', api);
});