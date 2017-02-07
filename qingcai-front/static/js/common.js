



layui.define(['util','qingleft'],function(exports){
	var util = layui.util;
	var qingleft = layui.qingleft;
	
	// 加载左侧内容
	qingleft.edge({
		elem:$("#qing-left"),
	});
	
	//右下角固定Bar
	util.fixbar();
	
	exports('common',{});
	
});