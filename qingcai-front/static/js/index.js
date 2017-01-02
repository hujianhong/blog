/**
 * 
 * 青菜萝卜 主入口
 * 
 */
layui.define(['laytpl', 'laypage', 'layer','util','api'], function(exports) {
	var $ = layui.jquery;
	var laypage = layui.laypage;
	var layer = layui.layer;
	var util = layui.util;
	var api = layui.api;
	var laytpl = layui.laytpl;
	
	var pageSize = 10;
	
	var gather = {
		
		loadBlogTags : function (){
			$.post(api.TAGS_DISPLAY_URL, function(result) {
				if(result.code == 1000) {
					// 加载模板
					var tpl = laytpl($("#blog-tags-template").html());
					// 渲染数据
					tpl.render(result,function(html){
						// 显示内容
						$("#blog-tags").html(html);
					});
				} else {
					layer.msg("服务器端发生错误...");
				}
			});
		},
		
		loadHotestBlogs : function (){
			$.post(api.BLOG_DISPLAY_URL, function(result) {
				if(result.code == 1000) {
					// 加载模板
					var tpl = laytpl($("#hotest-blogs-template").html());
					// 渲染数据
					tpl.render(result,function(html){
						// 显示内容
						$("#hotest-blogs").html(html);
					});
				} else {
					layer.msg("服务器端发生错误...");
				}
			});
		},
		
		loadLastestBlogs : function (){
			$.post(api.BLOG_DISPLAY_URL, function(result) {
				if(result.code == 1000) {
					// 加载模板
					var tpl = laytpl($("#lastest-blogs-template").html());
					// 渲染数据
					tpl.render(result,function(html){
						// 显示内容
						$("#lastest-blogs").html(html);
					});
				} else {
					layer.msg("服务器端发生错误...");
				}
			});
		},
		
		pageCallback : function(pageNum,pageSize){
			var params = {
				pageNum:pageNum,
				pageSize:pageSize
			};
			$.post(api.BLOG_DISPLAY_URL,params,function(result){
				if(result.code == 1000){
					// 加载模板
					var tpl = laytpl($("#blog-list-template").html());
					// 渲染数据
					tpl.render(result.data,function(html){
						// 显示内容
						$("#blog-list").html(html);
					});
					
				} else {
					layer.msg("服务器端发生错误...");
				}
			});
		},
		loadBlogs : function(){
			var params = {
				pageNum:1,
				pageSize:pageSize
			};
			$.post(api.BLOG_DISPLAY_URL,params,function(result){
				if(result.code == 1000){
					// 加载模板
					var tpl = laytpl($("#blog-list-template").html());
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
							gather.pageCallback(conf.curr,pageSize);
						}
					});
				} else {
					layer.msg("服务器端发生错误...");
				}
			});
		}
	}

    gather.loadBlogTags();
	
	gather.loadBlogs();
	
	gather.loadHotestBlogs();
	
	gather.loadLastestBlogs();
	
	//右下角固定Bar
	util.fixbar();

	exports('index', {});
});