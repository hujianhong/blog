

layui.define(['api','form'],function(exports){
	var form = layui.form();
   //监听提交
    form.on('submit(search)', function(data){
    	var searchKey = $("#search").val()
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
    
    exports('query',{});
});