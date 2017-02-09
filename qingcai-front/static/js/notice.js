



layui.define(['api','laytpl'],function(exports){
	var api = layui.api;
	var laytpl = layui.laytpl;
	
	var noticeTpl = 
	'<div class="qing-notice">\
		<i class="am-icon-bell"></i><span id="qing-notice-text">{{d.data[0].content}}</span>\
	</div>';
	
	
	var noticeData = null;
	var count = 0;
	
	var action = {
		showNotice:function(){
			api.showNotice({},function(res){
				if(res.data.length > 0){
					noticeData = res.data;
					// 渲染数据
					laytpl(noticeTpl).render(res,function(html){
						// 显示内容
						$("#qing-notice-cnt").html(html);
						setInterval(action.clock,3000);
					});
				}
			});
		},
		clock:function(){
			if(noticeData == null){
				return;
			}
			var length = noticeData.length;
			if(length > 0){
				count++;
				count = count % length;
				$("#qing-notice-text").text(noticeData[count].content);
			}
		}
	}
	action.showNotice();
	
	exports('notice',{});
	
});