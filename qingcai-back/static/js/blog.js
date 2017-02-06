


layui.define(['common','api','laytpl','laypage'],function(exports){
	var common = layui.common;
	var api = layui.api;
	var laytpl = layui.laytpl;
	var $ = layui.jquery;
	
	var laypage = layui.laypage;
	
	
	var tpl = 
	'<table width="100%">\
		<tr>\
			<th width="5%" align="center"><input type="checkbox" name="checkbox" id="selall" /></th>\
			<th width="25%" align="center">文章标题</th>\
			<th width="7%" align="center">作者</th>\
			<th width="5%" align="center">所属分类</th>\
			<th width="5%" align="center">评论数</th>\
			<th width="5%" align="center">阅读数</th>\
			<th width="5%" align="center">喜欢数</th>\
			<th width="5%" align="center">状态</th>\
			<th width="9%" align="center">添加时间</th>\
			<th width="10%" align="center">基本操作</th>\
		</tr>\
		{{#  layui.each(d.list, function(index, item){ }}\
			<tr>\
				<td align="center"><input type="checkbox" class="selall" name="deletes[]" value="4" /></td>\
				<td align="center">{{item.title}}</td>\
				<td align="center">{{item.author}}</td>\
				<td align="center">{{item.categoryName}}</td>\
				<td align="center">{{item.commentNum}}</td>\
				<td align="center">{{item.readNum}}</td>\
				<td align="center">{{item.heartNum}}</td>\
				<td align="center"><span style="color:#FF5722;">{{item.statusName}}</span></td>\
				<td align="center">{{item.publishTime}}</td>\
				<td align="center">\
					<a href="">修改</a> | <a href="">删除</a>\
				</td>\
			</tr>\
		{{# }); }}\
	</table>';
	
	
	var pageSize = 10;
	
	var action = {
		callback:function(pageNum,pageSize){
			// 请求数据
			var params = {
				pageNum:pageNum,
				pageSize:pageSize || 10
			};
			api.showBlog(params,function(res){
				console.log(res)
				if(res.code == 0){
					laytpl(tpl).render(res.data,function(html){
						$("#blog-container").html(html);
					});
				} else {
					layer.msg(res.msg || res.code, {
						shift: 6
					});
				}
			});
		},
		
		display:function(){
			// 请求数据
			var params = {
				pageNum:1,
				pageSize:10
			};
			api.showBlog(params,function(res){
				console.log(res)
				if(res.code == 0){
					laytpl(tpl).render(res.data,function(html){
						$("#blog-container").html(html);
					});
					// 调用分页
					laypage({
						cont: 'blog-pager',
						pages: res.data.totalPage, //得到总页数
						jump: function(conf,first) {
							if(first){
								return;
							}
							action.callback(conf.curr,pageSize);
						}
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
	
	exports('blog',{});
	
});