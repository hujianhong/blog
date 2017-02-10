/**
 * 青菜萝卜 API
 * 所有异步请求的地址
 */

layui.define(['layer'],function(exports) {
	var $ = layui.jquery;
	var layer = layui.layer;
	
	var BASE_PREFIX = "http://www.huding.name/luobo";
	
//	var BASE_PREFIX = "http://localhost";

	var pageSize = 10;
	
	var api = {
		
		
		YOULIAN_URL:BASE_PREFIX + "/youlian",
		
		/**
		 * 博文相关地址
		 */
		BLOG_DISPLAY_URL : BASE_PREFIX + "/blog",
		BLOG_CATEGORY_URL : BASE_PREFIX + "/blog/category",
		BLOG_TIMELINE_URL: BASE_PREFIX + "/blog/timeline",
		BLOG_HOT_RANK_URL: BASE_PREFIX + "/blog/hotRank",
		BLOG_RECOMMEND_URL: BASE_PREFIX + "/blog/recommend",
		BLOG_LIKE_URL:BASE_PREFIX + "/blog/like",
		BLOG_LUNBO_URL: BASE_PREFIX + "/blog/lunbo",
		BLOG_TAGS_URL: BASE_PREFIX + "/blog/blogTags",
		BLOG_OPENREAD_URL: BASE_PREFIX + "/blog/openRead",
		BLOG_SHOW_BY_CATEGORY_URL:BASE_PREFIX + "/blog/showByCategory",
		BLOG_SHOW_BY_TAG_URL:BASE_PREFIX + "/blog/showByTag",
		BLOG_SHOW_BY_QUERY_URL:BASE_PREFIX + "/blog/showByQuery",
		
		/**
		 * 评论相关地址
		 */
		COMMENT_SHOW_URL: BASE_PREFIX + "/comment/show",
		COMMENT_LIKE_URL: BASE_PREFIX + "/comment/like",
		COMMENT_HATE_URL: BASE_PREFIX + "/comment/hate",
		COMMENT_REPORT_URL: BASE_PREFIX + "/comment/report",
		/**
		 * 
		 */
		NOTICE_SHOW_URL:BASE_PREFIX + "/notice",
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
		blogOpenRead:function(params,success){
			action.doAjax(api.BLOG_OPENREAD_URL,params,success);
		},
		blogTagCloud:function(params,success) {
			action.doAjax(api.BLOG_TAGS_URL,params,success);
		},
		qingComment:function(params,success) {
			action.doAjax(api.COMMENT_SHOW_URL,params,success);
		},
		commentLike:function(params,success){
			action.doAjax(api.COMMENT_LIKE_URL,params,success);
		},
		commentHate:function(params,success){
			action.doAjax(api.COMMENT_HATE_URL,params,success);
		},
		reportComment:function(params,success){
			action.doAjax(api.COMMENT_REPORT_URL,params,success);
		},
		uploadImage:function(params,success){
			layui.use('upload', function(){
				layui.upload({
					url: api.UPLOAD_IMG_URL,
					success: success
				});
			});
		},
		showBlogCategory : function(params,success){
			action.doAjax(api.BLOG_CATEGORY_URL,params,success);
		},
		showHotRankBlog:function(params,success){
			action.doAjax(api.BLOG_HOT_RANK_URL,params,success);
		},
		showRecommedBlog:function(params,success){
			action.doAjax(api.BLOG_RECOMMEND_URL,params,success);
		},
		showBlogTimeline:function(params,success){
			action.doAjax(api.BLOG_TIMELINE_URL,params,success);
		},
		showZuixinBlog:function(params,success){
			action.doAjax(api.BLOG_DISPLAY_URL,params,success);
		},
		showBlog:function(params,success){
			action.doAjax(api.BLOG_DISPLAY_URL,params,success);
		},
		showBlogByCategory:function(params,success){
			action.doAjax(api.BLOG_SHOW_BY_CATEGORY_URL,params,success);
		},
		showBlogByTag:function(params,success){
			action.doAjax(api.BLOG_SHOW_BY_TAG_URL,params,success);
		},
		showBlogByQuery:function(params,success){
			action.doAjax(api.BLOG_SHOW_BY_QUERY_URL,params,success);
		},
		showYoulian:function(params,success){
			action.doAjax(api.YOULIAN_URL,params,success);
		},
		blogLike:function(params,success){
			action.doAjax(api.BLOG_LIKE_URL,params,success);
		},
		showNotice:function(params,success){
			action.doAjax(api.NOTICE_SHOW_URL,params,success);
		},
	};
	exports('api', action);
});