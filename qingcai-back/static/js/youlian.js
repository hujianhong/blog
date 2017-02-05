


layui.define(['common','api','laytpl'],function(exports){
	var common = layui.common;
	var api = layui.api;
	var laytpl = layui.laytpl;
	var $ = layui.jquery;
	
	
	var tpl = 
	'<table width="100%">\
		<tr>\
			<th width="10%" align="center">链接编号</th>\
			<th width="20%" align="center">链接名称</th>\
			<th width="30%" align="center">链接地址</th>\
			<th width="20%" align="center">添加时间</th>\
			<th width="15%" align="center">基本操作</th>\
		</tr>\
		{{#  layui.each(d.list, function(index, item){ }}\
			<tr>\
				<td align="center">{{item.id}}</td>\
				<td align="center">{{item.name}}</td>\
				<td align="center">{{item.url}}</td>\
				<td align="center">{{item.cdate}}</td>\
				<td align="center">\
					<a href="">修改</a> | <a href="">删除</a>\
				</td>\
			</tr>\
		{{# }); }}\
	</table>';
	
	var action = {
		
		
		callback:function(pageNum,pageSize){
			
		},
		
		display:function(){
			// 请求数据
			var params = {
				pageNum:1,
				pageSize:10
			};
			api.showYoulian(params,function(res){
				console.log(res)
				if(res.code == 0){
					laytpl(tpl).render(res.data,function(html){
						$("#youlian-container").html(html);
					});
					
				} else {
					layer.msg(res.msg || res.code, {
						shift: 6
					});
				}
			});
		},
	};
	
	action.display();
	
	
	
	exports('youlian',{});
	
});