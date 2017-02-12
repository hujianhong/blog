



layui.define(['left','system','layer'],function(exports){
	var left = layui.left;
	var layer = layui.layer;
	var system = layui.system;
	
	var common = {
		getUrlParam :function(name){
			/// 获取参数
		    var url = window.location.search;
		    // 正则筛选地址栏
		    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
		    // 匹配目标参数
		    var result = url.substr(1).match(reg);
		    //返回参数值
		    return result ? decodeURIComponent(result[2]) : null;
		},
		
		errorTip:function(res) {
			layer.msg(res.msg || res.code, {
				shift: 6
			});
		}
	};
	
	exports('common',common);
	
});