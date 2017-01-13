/**
 * 青菜萝卜 API
 * 所有异步请求的地址
 */

layui.define(function(exports) {
	var BASE_PREFIX = "http://www.huding.name";
	
	var api = {
		/**
		 * 博文列表请求地址
		 */
		BLOG_DISPLAY_URL : BASE_PREFIX + "/luobo/showBlogs",

		/**
		 * 博文标签请求地址
		 */
		TAGS_DISPLAY_URL : BASE_PREFIX + "/luobo/showTags",
		
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
					if(res.code == 1000) {
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
		
		loadBlogTags:function(data,success) {
			this.load(this.TAGS_DISPLAY_URL,data,success);
		}
		
	}
	exports('api', api);
});