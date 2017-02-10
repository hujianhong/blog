/**
 * 青菜萝卜 博文详情脚本
 * 所有前端模板的定义
 */

layui.define(['common','laytpl','api','layer','qingcmt','qingleft'], function(exports) {
	var $ = layui.jquery;
	var layer = layui.layer;
	var common = layui.common;
	var api = layui.api;
	var laytpl = layui.laytpl;
	var laypage = layui.laypage;
	var qingcmt = layui.qingcmt;
	
	qingcmt.comment({
		elem:$("#commentContainer"),
		params:{
			pageNum:1,
			pageSize:10,
			id:$("#qing-blog-id").val()
		},
		blogID:$("#qing-blog-id").val()
    });
    /**
     * 模板数据
     */
    var tpl = {
    	// 热门排行模板
		hotRankTpl:
		'<div class="qing-panel">\
		  	<div class="qing-panel-title">\
		  		<h2>热门排行</h2>\
		  	</div>\
		  	<div class="qing-panel-body">\
		  		<div class="qing-item-cnt">\
		  		{{#  layui.each(d.data, function(index, item){ }}\
					<div class="qing-item-list">\
						<a class="qing-item-link" href="{{item.url}}">{{item.title}}</a>\
						<span>{{item.readNum}}阅/{{item.commentNum}}评/{{item.heartNum}}赞</span>\
					</div>\
				{{# });}}\
		  		</<div>\
		  	</div>\
		  </div>'
		  ,
	}
    
    var action = {
    	openRead:function(){
    		var para = {
    			id:$("#qing-blog-id").val()
    		}
    		api.blogOpenRead(para,function(res){
    			$("#blog-readNum").html(res.data.readNum);
    			$("#blog-commentNum").html(res.data.commentNum);
    			$("#blog-heartNum").html(res.data.heartNum);
    			$("#blog-content-like").html(res.data.heartNum);
    			$("#blog-content-share").html(res.data.shareNum);
    		});
    	},
    	showHotRankBlog:function(){
    		var p = {
				pageNum:1,
				pageSize:5
			};
			api.showHotRankBlog(p,function(result){
				// 渲染数据
				laytpl(tpl.hotRankTpl).render(result,function(html){
					// 显示内容
					$("#hot-rank-blogs").html(html);
				});
			});
    	}
    }
    
    action.openRead();
    action.showHotRankBlog();
	
	
	$(".qing-btn-donate").on("click",function(event){
		window.open("donate.html","_blank");
	});
	$(".qing-blog-share").on("click",function(event){
		layer.msg("sorry,该功能暂时尚未实现")
	});
	$(".qing-blog-like").on("click",function(event){
		var para = {
			id:$("#qing-blog-id").val()
		}
		api.blogLike(para,function(res){
			$("#blog-content-like").html(res.data);
			layer.msg("喜欢成功");
		});
	});
	
	//加载特定模块
	if(layui.cache.page && layui.cache.page !== 'index') {
		var extend = {};
		layui.use(layui.cache.page);
	}
	
	var qingleft = layui.qingleft;
	
	exports('qingblog', {});
});