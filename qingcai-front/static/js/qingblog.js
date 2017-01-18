/**
 * 青菜萝卜 博文详情脚本
 * 所有前端模板的定义
 */

layui.define(['util','laytpl','api','layer','qingeditor','qingcmt','form','qingleft'],function(exports) {
	var $ = layui.jquery;
	var layer = layui.layer;
	var util = layui.util;
	var api = layui.api;
	var laytpl = layui.laytpl;
	
	var qingeditor = layui.qingeditor;
	var qingleft = layui.qingleft;
	
	var qingcmt = layui.qingcmt;
	
	api.loadHotRankBlogs();
	
	qingleft.edge({
		elem:$("#qing-left")
	});
	
	var pageSize = 10;
	
	var params = {
		pageNum:1,
		pageSize:pageSize,
		id:$("#qing-blog-id").val()
	};
	
	qingcmt.comment({
		elem:$("#commentContainer"),
		params:params,
    });
	
	
	
	$(".qing-btn-donate").on("click",function(event){
		window.open("donate.html","_blank");
	});
	
	//加载特定模块
	if(layui.cache.page && layui.cache.page !== 'index') {
		var extend = {};
		layui.use(layui.cache.page);
	}
	
	//加载编辑器
	qingeditor.layEditor({
		elem: '.qing-editor'
	});
	
	//右下角固定Bar
	util.fixbar();
	
	exports('qingblog', {});
});