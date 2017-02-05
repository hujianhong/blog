

layui.define(['api'],function(exports){
	var $ = layui.jquery;
	
	var api = layui.api;
	
	var action = {
		init:function(){
			$.get('left.html',{},function(res){
				$('#left-container').html(res);
				$("#left-logout").on('click',function(event){
					action.logout();
				});
			});
			
		},
		logout:function(){
			api.logout();
			location.href='login.html';
		}
	};
	action.init();
	$("#top-logout").on('click',function(event){
		action.logout();
	});
	exports('left',action);
});