

layui.define(['util','qingcmt','notice'], function(exports) {
	var notice = layui.notice;
	var qingcmt = layui.qingcmt;
	var util = layui.util;
	qingcmt.comment({
		elem:$("#commentContainer"),
		params:{
			pageNum:1,
			pageSize:20,
			id:'qingcailuo_donate_cmt',
		},
		title:'热心赞助',
		reportTip : '',
		reply:false,
		report:false,
		type:'赞助'
    });
    //右下角固定Bar
	util.fixbar();
	exports('qingdonate',{});
});