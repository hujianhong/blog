/**
 * 青菜萝卜 博文详情脚本
 * 所有前端模板的定义
 */

layui.define(['util','api','layer','form'],function(exports) {
	var $ = layui.jquery;
	var layer = layui.layer;
	var util = layui.util;
	var api = layui.api;
	
	api.loadHotRankBlogs();
	
    api.loadBlogTags();
	
	api.loadBlogTimeline();
	
	api.loadLastestBlogs();
	
	api.loadRecommedBlogs();
	
	$(".qing-btn-donate").on("click",function(event){
		window.open("donate.html","_blank");
	});
	
	//右下角固定Bar
	util.fixbar();
	
	exports('qingblog', {});
});