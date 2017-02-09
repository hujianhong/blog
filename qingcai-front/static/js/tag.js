/**
 * 
 * 青菜萝卜 主入口
 * 
 */
layui.define(['api','layer','laytpl','laypage','form','common','notice'], function(exports) {
	var notice = layui.notice;
	var $ = layui.jquery;
	var layer = layui.layer;
	var api = layui.api;
	var form = layui.form();
	var laytpl = layui.laytpl;
	var common = layui.common;
	var laypage = layui.laypage;
  
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
	
	var tpl = {
		blogListTpl:
		'{{#  layui.each(d.list, function(index, item){ }}\
		    <div class="qing-entry-text">\
		    	 <div class="qing-list-title">\
		    	 		<span class="qing-category">{{item.typeName}}<i></i></span><a href="{{item.url}}"> {{item.title}}</a>\
		    	 </div>\
		       <div class="qing-list-hint">\
			       	<span><i class="am-icon-user qing-color-author" title="作者"></i> {{item.author}} &nbsp;</span>\
				    <span><i class="am-icon-clock-o qing-color-clock" title="时间"></i> {{item.publishTime}}</span>\
				    <span><i class="am-icon-eye-slash qing-color-eye" title="阅读"></i> 阅读({{item.readNum}})</span>\
			        <span><i class="am-icon-comments-o qing-color-comment" title="评论"></i> 评论({{item.commentNum}})</span>\
			        <span><i class="am-icon-heart-o qing-color-heart" title="点赞"></i> 点赞({{item.heartNum}})</span>\
		       </div>\
		       {{# if(item.summary != null && item.summary.length > 200) { }}\
		       		<p class="qing-list-content">{{item.summary.substring(0,200) + "......"}}</p>\
		       {{# } else { }}\
		      	 <p class="qing-list-content">{{ item.summary }}</p>\
		       {{# } }}\
		       <div class="qing-list-foot">\
		       		{{# if(item.tags.length > 0) { }}\
		       			<i class="am-icon-tags"></i>\
		       		{{# } }}\
		       		{{#  layui.each(item.tags, function(index, tag){ }}\
		       				<span class="am-radius">#{{tag}}</span>\
		       	  {{# });}}\
	            <a href="{{item.url}}" class="qing-read-more">阅读全文>></a>\
		       </div> \
		    </div>\
		{{# });}}\
		{{#  if(d.list.length === 0){ }}\
		  <div class="qing-content-empty qing-text-center">\
		  	<div class="qing-empty-tip">该标签下暂无文章</div>\
		  </div>\
		{{#  } }}' 
	}
    
    var pageSize = 10;
	    
	var action = {
		getUrlParam :function(name){
			//构造一个含有目标参数的正则表达式对象
			var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
			//匹配目标参数
			var r = window.location.search.substr(1).match(reg);  
			if(r!=null){
				return unescape(r[2]);
			}
			return null; //返回参数值
		},

		callback : function(params){
			api.showBlogByTag(params,function(result){
				// 渲染数据
				laytpl(tpl.blogListTpl).render(result.data,function(html){
					// 显示内容
					$("#blog-list").html(html);
				});
				// 回到顶部
				var speed=200;//滑动的速度
                $('body').animate({ scrollTop: 0 }, speed);
			});
		},
		showBlogByTag:function(){
			var blogID = action.getUrlParam("id");
			var params = {
				pageNum:1,
				pageSize:pageSize,
				id:blogID
			};
			api.showBlogByTag(params,function(result){
				// 渲染数据
				laytpl(tpl.blogListTpl).render(result.data,function(html){
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
						action.callback({
							pageNum:conf.curr,
							pageSize:pageSize,
							id:blogID
						});
					}
				});
			});
		},
	}
	action.showBlogByTag();
	exports('tag', {});
});



						    