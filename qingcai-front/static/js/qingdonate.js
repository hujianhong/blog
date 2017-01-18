

layui.define(['util','qingeditor','qingcmt'],function(exports){
	var qingcmt = layui.qingcmt;
	var util = layui.util;
	var qingeditor = layui.qingeditor;
	
	var params = {
		pageNum:1,
		pageSize:20,
		id:'a232f9e0af9c40f9aa9e6b8882e2b94f'
	};
	
	qingcmt.comment({
		elem:$("#commentContainer"),
		params:params,
    });
    
    //右下角固定Bar
	util.fixbar();
	
	//加载编辑器
	qingeditor.layEditor({
		elem: '.qing-editor'
	});
    
	exports('qingdonate',{});
});