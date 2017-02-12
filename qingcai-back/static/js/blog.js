


layui.define(['common','api','laytpl','laypage'],function(exports){
	var common = layui.common;
	var api = layui.api;
	var laytpl = layui.laytpl;
	var $ = layui.jquery;
	
	var laypage = layui.laypage;
		
	var pageSize = 10;
	
	var action = {
		
		render:function(res){
			laytpl($("#template").html()).render(res.data,function(html){
				$("#blog-container").html(html);
				// 监听事件
				$(".row-del").on("click",function(event){
					var id = $(event.target).attr("data");
					//询问框
					layer.confirm('是否确认删除？', {
					  btn: ['是','否'] //按钮
					}, function(){
					  api.delBlog({id:id},function(res){
					  	if(res.code == 0){
							layer.msg("删除成功");
							location.reload();
						} else {
							layer.msg(res.msg || res.code, {
								shift: 6
							});
						}
					  });
					}, function(){
					  //location.href='blog.html';
					});
				});
			});
		},
		callback:function(params){
			api.showBlog(params,function(res){
				console.log(res)
				if(res.code == 0){
					action.render(res);
				} else {
					layer.msg(res.msg || res.code, {
						shift: 6
					});
				}
			});
		},
		
		display:function(){
			// 请求数据
			var params = {
				pageNum:1,
				pageSize:10
			};
			api.showBlog(params,function(res){
				console.log(res)
				if(res.code == 0){
					action.render(res);
					// 调用分页
					laypage({
						cont: 'blog-pager',
						pages: res.data.totalPage, //得到总页数
						jump: function(conf,first) {
							if(first){
								return;
							}
							action.callback({
								pageNum:conf.curr,
								pageSize:pageSize || 10
							});
						}
					});
				} else {
					layer.msg(res.msg || res.code, {
						shift: 6
					});
				}
			});
		},
	};
	
	action.display();
	
	$("#blog-restatic-all").on("click",function(res){
		//询问框
		layer.confirm('确认要重新静态化全部博文？', {
		  btn: ['是','否'] //按钮
		}, function(){
			api.blogRestaticAll({},function(res){
				if(res.code == 0){
					layer.msg("全部重新静态化成功!");
				} else {
					common.error(res);
				}
			});
		}, function(){
		  
		});
	});
	
	exports('blog',{});
	
});