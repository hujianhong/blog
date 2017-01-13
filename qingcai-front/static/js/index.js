/**
 * 
 * 青菜萝卜 主入口
 * 
 */
layui.define(['laytpl', 'laypage', 'layer','util','api','qingtpl','form'], function(exports) {
	var $ = layui.jquery;
	var laypage = layui.laypage;
	var layer = layui.layer;
	var util = layui.util;
	var api = layui.api;
	var laytpl = layui.laytpl;
	var qingtpl = layui.qingtpl;
	
	
	var form = layui.form();
  
    //监听提交
    form.on('submit(search)', function(data){
    	
    	var searchKey = JSON.stringify(data.field.search);
	    layer.msg("你要搜索的内容是" + searchKey +"，对不起，搜索功能暂时还没有实现。。。");
	    return false;
    });
    
     form.on('submit(search-sm)', function(data){
    	var searchKey = $("#search-sm").val()
	    layer.msg("你要搜索的内容是" + searchKey +"，对不起，搜索功能暂时还没有实现。。。");
	    return false;
    });
    
    //监听提交
    form.on('submit',function(data){
    	var searchKey = $("#search").val() || $("#search-sm").val();
    	
	    layer.msg("你要搜索的内容是" + searchKey +"，对不起，搜索功能暂时还没有实现。。。");
	    return false;
    });
    
    
	
	var pageSize = 10;
	
	var gather = {
		
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
					$("#hotest-blogs1").html(html);
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
					$("#lastest-blogs1").html(html);
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
						gather.pageCallback(conf.curr,pageSize);
					}
				});
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