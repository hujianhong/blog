/**
 * 
 * 青菜萝卜 主入口
 * 
 */
layui.define(['api','layer','laytpl','laypage','common','qingleft'], function(exports) {
	var $ = layui.jquery;
	var layer = layui.layer;
	var api = layui.api;
	var form = layui.form();
	var laytpl = layui.laytpl;
	var common = layui.common;
	var laypage = layui.laypage;
  
	
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
		  <div class="qing-content-empty qing-text-center qing-margin-bottom">\
		  	<div class="qing-empty-tip">该标签下暂无文章</div>\
		  </div>\
		{{#  } }}' 
	}
    
    var pageSize = 10;
	    
	var action = {
		callback : function(params){
			api.showBlogByTag(params,function(result){
				// 渲染数据
				laytpl(tpl.blogListTpl).render(result.data,function(html){
					// 显示内容
					$("#blog-list").html(html);
					$("#qing-name").html(common.getUrlParam("name"));
					$("#qing-num").html(result.data.totalRow);
				});
				// 回到顶部
				var speed=200;//滑动的速度
                $('body').animate({ scrollTop: 0 }, speed);
			});
		},
		showBlogByTag:function(){
			var blogID = common.getUrlParam("id");
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
					$("#qing-name").html(common.getUrlParam("name"));
					$("#qing-num").html(result.data.totalRow);
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
	
	var qingleft = layui.qingleft;
	
	exports('tag', {});
});



						    