


layui.define(['layer','form','api'],function(exports){
	var form = layui.form();
	var $ = layui.jquery;
	var api = layui.api;
	var layer = layui.layer;
	
	var refresh = {
		change:function() {
			var url = "/luobo/admin/validateCode?rand="+Math.random();
			$("#login-valicode").attr('src',url);
		}
	};
	
	$("#login-refresh").on('click',function(){
		refresh.change();
	});
	
	//监听提交
	form.on('submit(loginform)', function(data){
	   //layer.msg(JSON.stringify(data.field));
	   api.login(data.field,function(res){
			switch(res.code) {
			case 0: 
				location.href='index.html';
				break;
			case 2002:
				layer.alert(res.msg, {
			          icon: 1,
			          time: 1000,
			          end:function(){
			          	refresh.change();
			          }
			    });
			    break;
			default:
				layer.alert(res.msg, {
			          icon: 1,
			          time: 1000,
			          end:function(){
			          	refresh.change();
			          }
			    });
			}
	   });
	   return false;
	});
	exports('login',{});
	
});