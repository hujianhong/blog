


layui.define(['common','api','laytpl','laypage'],function(exports){
	var common = layui.common;
	var api = layui.api;
	var laytpl = layui.laytpl;
	var $ = layui.jquery;
	
	var laypage = layui.laypage;
	
	
	
	
	var action = {
		
		render:function(res){
			laytpl($("#template").html()).render(res.data,function(html){
				$("#donate-container").html(html);
				// 监听事件
				$(".row-del").on("click",function(event){
					var id = $(event.target).attr("data");
					//询问框
					layer.confirm('是否确认删除？', {
					  btn: ['是','否'] //按钮
					}, function(){
					  api.delDonate({id:id},function(res){
					  	if(res.code == 0){
							layer.alert("删除成功", {
						          icon: 1,
						          time: 1000,
						          end:function(){
						          	location.reload();
						          }
						    });
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
			api.showDonate(params,function(res){
				if(res.code == 0){
					action.render(res);
				} else {
					common.error(res);
				}
			});
		},
		
		display:function(){
			// 请求数据
			var params = {
				pageNum:1,
				pageSize:10,
				id:'qingcailuo_donate_cmt'
			};
			api.showDonate(params,function(res){
				if(res.code == 0){
					action.render(res);
					// 调用分页
					laypage({
						cont: 'pager',
						pages: res.data.totalPage, //得到总页数
						jump: function(conf,first) {
							if(first){
								return;
							}
							action.callback({
								pageNum:conf.curr,
								pageSize:10,
								id:'qingcailuo_donate_cmt'
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
	
	
	
	exports('donate',{});
	
});