

layui.define(['common','qingcmt',], function(exports) {
	var common = layui.common;
	var qingcmt = layui.qingcmt;
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
	exports('qingdonate',{});
});