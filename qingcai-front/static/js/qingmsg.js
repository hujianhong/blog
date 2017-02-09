/**
 * 青菜萝卜留言
 */
layui.define(['util','qingcmt','qingleft','notice'], function(exports) {
	var notice = layui.notice;
	var qingcmt = layui.qingcmt;
	var util = layui.util;
	
	qingcmt.comment({
		elem:$("#commentContainer"),
		params:{
		pageNum:1,
			pageSize:20,
			id:'qingcailuobo-msg-cmt'
		},
		title:"热忱留言",
		reportTip:"发表留言",
		type:'留言',
		blogID:'qingcailuobo-msg-cmt'
    });
    
    //右下角固定Bar
	util.fixbar();
    
	exports('qingmsg',{});
});