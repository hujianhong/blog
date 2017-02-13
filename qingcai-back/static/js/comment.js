


layui.define(['common','api','laytpl','laypage','layer','element'],function(exports){
	var common = layui.common;
	var api = layui.api;
	var laytpl = layui.laytpl;
	var $ = layui.jquery;
	var layer = layui.layer;
	var laypage = layui.laypage;
	
	var element = layui.element();
	
	
	var action = {
		
		render:function(tplElem,cntElem,res){
			laytpl($(tplElem).html()).render(res.data,function(html){
				$(cntElem).html(html);
			});
		},
		callback:function(params,tplElem,cntElem){
			api.showComment(params,function(res){
				if(res.code == 0){
					action.render(tplElem,cntElem,res);
				} else {
					common.error(res);
				}
			});
		},
		display:function(params,tplElem,cntElem,pager){
			api.showComment(params,function(res){
				if(res.code == 0){
					action.render(tplElem,cntElem,res);
					// 调用分页
					laypage({
						cont: pager,
						pages: res.data.totalPage, //得到总页数
						jump: function(conf,first) {
							if(first){
								return;
							}
							var np = {};
							for(key in params){
								np[key] = params[key];
							}
							np['pageNum'] = conf.curr;
							action.callback(np,tplElem,cntElem);
						}
					});
				} else {
					common.error(res);
				}
			});
		},
	};
	
	// 请求数据
	var params1 = {
		pageNum:1,
		pageSize:10,
		check:0
	};
	
	var params2 = {
		pageNum:1,
		pageSize:10,
		check:1
	};
			
	action.display(params1,"#template1","#container1","pager1");
	action.display(params2,"#template2","#container2","pager2");
	exports('comment',{});
	
});