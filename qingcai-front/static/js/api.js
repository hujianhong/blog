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
		
		
	}
	exports('api', api);
});