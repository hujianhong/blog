


layui.define(['common','api','laytpl'],function(exports){
	var common = layui.common;
	var api = layui.api;
	var laytpl = layui.laytpl;
	var $ = layui.jquery;
	
	
	var tpl = 
	'<table width="100%">\
		<tr>\
			<th width="20%" align="center">分类名称</th>\
			<th width="20%" align="center">所属类型</th>\
			<th width="20%" align="center">关键字</th>\
			<th width="20%" align="center">添加时间</th>\
			<th width="20%" align="center">基本操作</th>\
		</tr>\
		{{#  layui.each(d.list, function(index, item){ }}\
			<tr>\
				<td align="center">{{item.name}}</td>\
				<td align="center">{{item.typeName}}</td>\
				<td align="center">{{item.keywords}}</td>\
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
			api.showCategory(params,function(res){
				console.log(res)
				if(res.code == 0){
					laytpl(tpl).render(res.data,function(html){
						$("#category-container").html(html);
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
	
	
	
	exports('category',{});
	
});