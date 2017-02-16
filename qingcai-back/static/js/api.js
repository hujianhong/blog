/**
 * 青菜萝卜 API
 * 所有异步请求的地址
 */

layui.define(['laytpl', 'laypage', 'layer'],function(exports) {
	var $ = layui.jquery;
	var laypage = layui.laypage;
	var layer = layui.layer;
	var laytpl = layui.laytpl;
	
	var BASE_PREFIX = "http://localhost:8080/luobo/admin";
	
	var pageSize = 10;
	
	var api = {
		/**
		 * 检查是否登录的地址
		 */
		CHECK_LOGIN_URL:BASE_PREFIX + "/checkLogin",
		/**
		 * 登录地址
		 */
		LOGIN_URL:BASE_PREFIX + "/login",
		/**
		 * 退出地址
		 */
		LOGOUT_URL:BASE_PREFIX + "/logout",
		
		YOULIAN_SHOW_URL:BASE_PREFIX + "/youlian",
		YOULIAN_ADD_URL:BASE_PREFIX + "/youlian/add",
		YOULIAN_EDIT_URL:BASE_PREFIX + "/youlian/edit",
		YOULIAN_DEL_URL:BASE_PREFIX + "/youlian/del",
		YOULIAN_GET_URL:BASE_PREFIX + "/youlian/get",
		
		CATEGORY_SHOW_URL:BASE_PREFIX + "/category",
		CATEGORY_ALL_URL:BASE_PREFIX + "/category/all",
		CATEGORY_GET_URL:BASE_PREFIX + "/category/get",
		CATEGORY_ADD_URL:BASE_PREFIX + "/category/add",
		CATEGORY_EDIT_URL:BASE_PREFIX + "/category/edit",
		CATEGORY_DEL_URL:BASE_PREFIX + "/category/del",
		
		TYPE_SHOW_URL:BASE_PREFIX + "/type",
		TYPE_ALL_URL:BASE_PREFIX + "/type/all",
		TYPE_GET_URL:BASE_PREFIX + "/type/get",
		TYPE_ADD_URL:BASE_PREFIX + "/type/add",
		TYPE_EDIT_URL:BASE_PREFIX + "/type/edit",
		TYPE_DEL_URL:BASE_PREFIX + "/type/del",
		
		NOTICE_SHOW_URL:BASE_PREFIX + "/notice",
		NOTICE_ALL_URL:BASE_PREFIX + "/notice/all",
		NOTICE_GET_URL:BASE_PREFIX + "/notice/get",
		NOTICE_ADD_URL:BASE_PREFIX + "/notice/add",
		NOTICE_EDIT_URL:BASE_PREFIX + "/notice/edit",
		NOTICE_DEL_URL:BASE_PREFIX + "/notice/del",
		
		TAG_SHOW_URL:BASE_PREFIX + "/tag",
		TAG_ALL_URL:BASE_PREFIX + "/tag/all",
		TAG_GET_URL:BASE_PREFIX + "/tag/get",
		TAG_ADD_URL:BASE_PREFIX + "/tag/add",
		TAG_EDIT_URL:BASE_PREFIX + "/tag/edit",
		TAG_DEL_URL:BASE_PREFIX + "/tag/del",
		
		COMMENT_SHOW_URL:BASE_PREFIX + "/comment",
		COMMENT_GET_URL:BASE_PREFIX + "/comment/get",
		COMMENT_REPLY_URL:BASE_PREFIX + "/comment/reply",
		COMMENT_EDIT_URL:BASE_PREFIX + "/comment/edit",
		
		
		DONATE_SHOW_URL:BASE_PREFIX + "/donate",
		DONATE_ADD_URL:BASE_PREFIX + "/donate/add",
		DONATE_EDIT_URL:BASE_PREFIX + "/donate/edit",
		DONATE_DEL_URL:BASE_PREFIX + "/donate/del",
		DONATE_GET_URL:BASE_PREFIX + "/donate/get",
		
		BLOG_SHOW_URL:BASE_PREFIX + "/blog",
		BLOG_ADD_URL:BASE_PREFIX + "/blog/add",
		BLOG_GET_URL:BASE_PREFIX + "/blog/get",
		BLOG_EDIT_URL:BASE_PREFIX + "/blog/edit",
		BLOG_DEL_URL:BASE_PREFIX + "/blog/del",
		BLOG_RESTATIC_ALL_URL:BASE_PREFIX + "/blog/restaticsAll",
		
		PASSWORD_URL:BASE_PREFIX + "/password",
		
		UPLOAD_IMAGE_URL:BASE_PREFIX + "/upload/uploadImage",
		UPLOAD_BLOG_COVER_URL:BASE_PREFIX + "/upload/uploadBlogCover",
	}
	
	var action = {
		//Ajax
		ajax: function(url, data, success, options,async) {
			var that = this;
			options = options || {};
			data = data || {};
			return $.ajax({
				type: options.type || 'post',
				dataType: options.dataType || 'json',
				data: data,
				url: url,
				async:async || true,
				success: success || function(){
					layer.msg("success回调函数不能为空");
				},
				error: function(e) {
					options.error || layer.msg('请求异常，请重试', {
						shift: 6
					});
				}
			});
		},
		/**
		 * 异步Ajax
		 * @param {Object} url
		 * @param {Object} data
		 * @param {Object} success
		 * @param {Object} options
		 */
		doAjax: function(url, data, success, options) {
			action.ajax(url,data,success,options,true);
		},
		
		/**
		 * 同步Ajax
		 * @param {Object} url
		 * @param {Object} data
		 * @param {Object} success
		 * @param {Object} options
		 */
		doSyncAjax:function(url,data,success,options){
			action.ajax(url,data,success,options,false);
		},
		
		checkLogin:function(success,error) {
			var options = {
				error:error
			};
			action.doSyncAjax(api.CHECK_LOGIN_URL,{},success,options);
		},
		
		login:function(params,success){
			action.doAjax(api.LOGIN_URL,params,success);
		},
		logout:function(params,success){
			action.doAjax(api.LOGOUT_URL,params,success);
		},
		
		showYoulian:function(params,success){
			action.doAjax(api.YOULIAN_SHOW_URL,params,success);
		},
		addYoulian:function(params,success){
			action.doAjax(api.YOULIAN_ADD_URL,params,success);
		},
		getYoulian:function(params,success){
			action.doAjax(api.YOULIAN_GET_URL,params,success);
		},
		editYoulian:function(params,success){
			action.doAjax(api.YOULIAN_EDIT_URL,params,success);
		},
		delYoulina:function(params,success){
			action.doAjax(api.YOULIAN_DEL_URL,params,success);
		},
		
		showCategory:function(params,success){
			action.doAjax(api.CATEGORY_SHOW_URL,params,success);
		},
		getCategory:function(params,success){
			action.doAjax(api.CATEGORY_GET_URL,params,success);
		},
		allCategory:function(params,success){
			action.doAjax(api.CATEGORY_ALL_URL,params,success);
		},
		addCategory:function(params,success){
			action.doAjax(api.CATEGORY_ADD_URL,params,success);
		},
		editCategory:function(params,success){
			action.doAjax(api.CATEGORY_EDIT_URL,params,success);
		},
		delCategory:function(params,success){
			action.doAjax(api.CATEGORY_DEL_URL,params,success);
		},
		
		showType:function(params,success){
			action.doAjax(api.TYPE_SHOW_URL,params,success);
		},
		getType:function(params,success){
			action.doAjax(api.TYPE_GET_URL,params,success);
		},
		allType:function(params,success){
			action.doAjax(api.TYPE_ALL_URL,params,success);
		},
		addType:function(params,success){
			action.doAjax(api.TYPE_ADD_URL,params,success);
		},
		editType:function(params,success){
			action.doAjax(api.TYPE_EDIT_URL,params,success);
		},
		delType:function(params,success){
			action.doAjax(api.TYPE_DEL_URL,params,success);
		},
		
		showNotice:function(params,success){
			action.doAjax(api.NOTICE_SHOW_URL,params,success);
		},
		getNotice:function(params,success){
			action.doAjax(api.NOTICE_GET_URL,params,success);
		},
		allNotice:function(params,success){
			action.doAjax(api.NOTICE_ALL_URL,params,success);
		},
		addNotice:function(params,success){
			action.doAjax(api.NOTICE_ADD_URL,params,success);
		},
		editNotice:function(params,success){
			action.doAjax(api.NOTICE_EDIT_URL,params,success);
		},
		delNotice:function(params,success){
			action.doAjax(api.NOTICE_DEL_URL,params,success);
		},
		
		showComment:function(params,success){
			action.doAjax(api.COMMENT_SHOW_URL,params,success);
		},
		getComment:function(params,success){
			action.doAjax(api.COMMENT_GET_URL,params,success);
		},
		
		replyComment:function(params,success){
			action.doAjax(api.COMMENT_REPLY_URL,params,success);
		},
		editComment:function(params,success){
			action.doAjax(api.COMMENT_EDIT_URL,params,success);
		},
		
		
		showTag:function(params,success){
			action.doAjax(api.TAG_SHOW_URL,params,success);
		},
		getTag:function(params,success){
			action.doAjax(api.TAG_GET_URL,params,success);
		},
		allTag:function(params,success){
			action.doAjax(api.TAG_ALL_URL,params,success);
		},
		addTag:function(params,success){
			action.doAjax(api.TAG_ADD_URL,params,success);
		},
		editTag:function(params,success){
			action.doAjax(api.TAG_EDIT_URL,params,success);
		},
		delTag:function(params,success){
			action.doAjax(api.TAG_DEL_URL,params,success);
		},
		
		showDonate:function(params,success){
			action.doAjax(api.DONATE_SHOW_URL,params,success);
		},
		addDonate:function(params,success){
			action.doAjax(api.DONATE_ADD_URL,params,success);
		},
		editDonate:function(params,success){
			action.doAjax(api.DONATE_EDIT_URL,params,success);
		},
		delDonate:function(params,success){
			action.doAjax(api.DONATE_DEL_URL,params,success);
		},
		getDonate:function(params,success){
			action.doAjax(api.DONATE_GET_URL,params,success);
		},
		
		showBlog:function(params,success){
			action.doAjax(api.BLOG_SHOW_URL,params,success);
		},
		getBlog:function(params,success){
			action.doAjax(api.BLOG_GET_URL,params,success);
		},
		addBlog:function(params,success){
			action.doAjax(api.BLOG_ADD_URL,params,success);
		},
		editBlog:function(params,success){
			action.doAjax(api.BLOG_EDIT_URL,params,success);
		},
		delBlog:function(params,success){
			action.doAjax(api.BLOG_DEL_URL,params,success);
		},
		blogRestaticAll:function(params,success){
			action.doAjax(api.BLOG_RESTATIC_ALL_URL,params,success);
		},
		password:function(params,success){
			action.doAjax(api.PASSWORD_URL,params,success);
		},
		UPLOAD_IMAGE_URL:api.UPLOAD_IMAGE_URL,
		UPLOAD_BLOG_COVER_URL:api.UPLOAD_BLOG_COVER_URL,
	}
	exports('api', action);
});