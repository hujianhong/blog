


layui.define(['common','api','form','layer',"qingeditor"],function(exports){
	var common = layui.common;
	var api = layui.api;
	var laytpl = layui.laytpl;
	var $ = layui.jquery;
	var form = layui.form();
	var layer = layui.layer;
	
	var qingeditor = layui.qingeditor;
	
	var action = {
  		getComment:function(){
  			var id = common.getUrlParam("id");
  			var params = {
  				id:id
  			}
  			api.getComment(params,function(res){
  				console.log(res);
  				if(res.code == 0){
	    				laytpl($("#template").html()).render(res.data,function(html){
	    					$("#container").html(html);
	    					//加载编辑器
						qingeditor.layEditor({
							elem: '.qing-editor'
						});
						$("#qing-content").val("@" + res.data.nickname + " ");
	    					form.render();
	    				});
	    			} else {
	    				common.error(res);
	    			}
  			});
  		}
  	}
	
	action.getComment();
	
	
	//监听提交
  	form.on('submit(formDemo)', function(data){
  	 var button = $(data.elem);
	    var params = data.field;
	    params['nickname'] = qingeditor.escape(params.nickname);
	    params['content']  = qingeditor.content(params.content);
    		api.replyComment(data.field,function(res){
    			if(res.code == 0){
    				layer.alert(res.msg, {
			          icon: 1,
			          time: 1000,
			          end:function(){
			          	location.href = 'comment.html';
			          }
			    });
    			} else {
    				common.error(res);
    			}
    		});
    		return false;
  	});
	exports('comment-reply',{});
	
});