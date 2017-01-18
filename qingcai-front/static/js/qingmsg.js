/**
 * 青菜萝卜留言
 */
layui.define(['util','qingeditor','qingcmt','qingleft'],function(exports) {
	var qingcmt = layui.qingcmt;
	var util = layui.util;
	
	var params = {
		pageNum:1,
		pageSize:20,
		id:'a232f9e0af9c40f9aa9e6b8882e2b94f'
	};
	
	qingcmt.comment({
		elem:$("#commentContainer"),
		params:params,
		title:"热忱留言",
		reportTip:"发表留言"
    });
    
    //右下角固定Bar
	util.fixbar();
    
	exports('qingmsg',{});
});