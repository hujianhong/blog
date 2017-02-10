/**
 * 青菜萝卜留言
 */
layui.define(['common','qingcmt'], function(exports) {
	var qingcmt = layui.qingcmt;
	
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
	exports('qingmsg',{});
});