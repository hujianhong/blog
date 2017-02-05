/**
 * 系统校验
 */
layui.define(['api'],function(exports){
	var $ = layui.jquery;
	var api = layui.api;
	
	
	var action = {
		succss:function(res) {
			if(res.code != 0) {
				window.location.href='login.html';
			}
		},
		error:function(e) {
			window.location.href='login.html';
		}
	};
	
	var system = {
		checkLogin:function() {
			api.checkLogin(action.succss,action.error);
		}
	};
	
	system.checkLogin();
	
	
	
	exports('system',system);
});