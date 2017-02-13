


layui.define(['common','api','form','layer'],function(exports){
	var common = layui.common;
	var api = layui.api;
	var $ = layui.jquery;
	var form = layui.form();
	var layer = layui.layer;
	
	//监听提交
  	form.on('submit(formDemo)', function(data){
    		api.password(data.field,function(res){
    			if(res.code == 0){
    				layer.alert(res.msg, {
			          icon: 1,
			          time: 1000,
			          end:function(){
			          	location.href = 'index.html';
			          }
			    });
    			} else {
    				common.error(res);
    			}
    		});
    		return false;
  	});
	
	exports('password',{});
	
});