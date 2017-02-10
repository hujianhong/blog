



layui.define(['util','notice','form'],function(exports){
	var notice = layui.notice;
	var util = layui.util;
	//右下角固定Bar
	util.fixbar();
	
	var form = layui.form();
   //监听提交
    form.on('submit(search)', function(data){
    	var searchKey = $("#search").val()
    	if(searchKey == ""){
    		return false;
    	}
	    location.href="query.html?name=" + searchKey;
	    return false;
    });
    
    form.on('submit(searchSM)', function(data){
    	var searchKey = $("#search-sm").val();
    	if(searchKey == ""){
    		return false;
    	}
	    location.href="query.html?name=" + searchKey;
	    return false;
    });
	
	var action = {
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
	}
	exports('common',action);
	
});

