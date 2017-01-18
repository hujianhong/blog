/**
 * 
 * 
 * 青菜萝卜 评论插件
 * 
 * 
 */
layui.define(['api', 'laytpl','laypage','layer','qingface', 'form'], function(exports) {
	var $ = layui.jquery;
	var layer = layui.layer;
	var api = layui.api;
	var form = layui.form();
	var laypage = layui.laypage;
	
	var laytpl = layui.laytpl;
	
	var dom = {
		jieda: $('#jieda'),
		content: $('#L_content'),
		jiedaCount: $('#jiedaCount')
	};
	
	var cas = function(content){
		return "";
	}
	
	
	var qingface = layui.qingface;
	
	
	var commentTpl = {
		commentCntrTpl:
		'<div class="qing-comment-head">\
			<div class="qing-comment-title">\
				<h2>{{d.title}}<span>(<em id="qing-comment-num"></em>)</span></h2>\
			</div>\
			<span class="qing-comment-report">{{d.reportTip}}</span>\
		</div>\
		<div class="qing-comment-container" id="qing-comment-list">\
		</div>\
		<div id="comment-pager" class="qing-text-center"></div>'
		,
		commentListTpl:
		'{{# if(d.list.length > 0) { }}\
			{{#  layui.each(d.list, function(index, item){ }}\
				<div class="qing-comment-main" data="{{item.id}}">\
					<div class="qing-comment-avatar">\
						<div class="qing-comment-img">\
							<img src="static/img/100.jpg" />\
						</div>\
					</div>\
					<div class="qing-comment-body">\
						<div class="qing-comment-meta">\
							<span class="qing-comment-author"><strong>{{item.nickname}}</strong></span>  <span>{{item.cdate}}</span>\
						</div>\
						<p class="qing-comment-content">{{item.content}}</p>\
						<div class="qing-comment-hint">\
							<span type="share"><i class="am-icon-share"></i> <span>分享</span>(<em>{{item.shareNum}}</em>)</span>\
							<span type="like"><i class="am-icon-thumbs-o-up"></i> <span>点赞</span>(<em>{{item.likeNum}}</em>)</span>\
							<span type="reply"><i class="am-icon-reply"></i> <span>回复</span>(<em>{{item.replyNum}}</em>)</span>\
						</div>\
					</div>\
				</div>\
			{{# }); }}\
		{{# } else { }}\
			<div class="qing-comment-no"><div class="qing-comment-tip">暂无评论,<span class="qing-comment-shafa">快抢沙发</span></div></div>\
		{{# } }}'
	};
	
	var plugin = {
		/**
		 * 评论组件初始化
		 * 
		 * @param {Object} options
		 * 
		 * options = {
		 * 	 elem : elem,
		 *   params: {
		 * 	
		 * 	 },
		 *   title:'热忱评论',
		 *   reportTip : '发表评论'
		 * }
		 */
		comment:function(options) {
			// validate params
			var elem = options.elem || $("#commentContainer");
			
			var params = options.params;
			
			options.title = options.title || '热忱评论';
			options.reportTip = options.reportTip || '发表评论';
			
			// 加载评论容器
			var cntrTpl = laytpl(commentTpl.commentCntrTpl);
			cntrTpl.render(options,function(html){
				options.elem.html(html);
			});
			
			// 注册事件
			$('.qing-comment-report').on("click",function(event){
				$('#qing-content').focus();
			});
			
			
			// 加载评论数据
			api.qingComment(params,function(result){
				// 加载模板
				var tpl = laytpl(commentTpl.commentListTpl);
				// 渲染数据
				tpl.render(result.data,function(html){
					// 显示内容
					$("#qing-comment-num").html(result.data.totalRow);
					$("#qing-comment-list").html(html);
					// 监听事件
					plugin.onClick();
					
					// 对评论内容进行转义
					plugin.zhuanyi();
				});
				// 调用分页
				laypage({
					cont: 'comment-pager',
					pages: result.data.totalPage, //得到总页数
					jump: function(conf,first) {
						if(first){
							return;
						}
						plugin.pageCallback(conf.curr,params);
					}
				});
			});
		},
		
		pageCallback : function(pageNum,params){
			var np = {};
			for(var key in params) {
				np[key] = params[key];
			}
			np.pageNum = pageNum;
			api.qingComment(np,function(result){
				// 加载模板
				var tpl = laytpl(commentTpl.commentListTpl);
				// 渲染数据
				tpl.render(result.data,function(html){
					// 显示内容
					$("#qing-comment-num").html(result.data.totalRow);
					$("#qing-comment-list").html(html);
					// 监听事件
					plugin.onClick();
					// 对评论内容进行转义
					plugin.zhuanyi();
				});
				
				// 回到顶部
				var speed=200;//滑动的速度
				var top = $("#qing-comment-list").offset().top;
                $('body').animate({ scrollTop:  top - 200 }, speed);
			});
		},
		
		share: function(elem) { //分享
			var othis = $(this),
				ok = othis.hasClass('zanok');
			api.json('/api/jieda-zan/', {
				ok: ok,
				id: li.data('id')
			}, function(res) {
				if(res.status === 0) {
					var zans = othis.find('em').html() | 0;
					othis[ok ? 'removeClass' : 'addClass']('zanok');
					othis.find('em').html(ok ? (--zans) : (++zans));
				} else {
					layer.msg(res.msg);
				}
			});
		},
		
		
		like: function(elem) { //赞
			var othis = $(this);
			var id = elem.attr('data');
			var ok = othis.hasClass('qing-comment-ok');
			api.commentLike({
				ok: ok,
				id: id
			}, function(res) {
					var zans = othis.find('em').html() | 0;
					othis[ok ? 'removeClass' : 'addClass']('qing-comment-ok');
					othis.find('span').html(ok ? '点赞' : '取消赞');
					othis.find('em').html(ok ? (--zans) : (++zans));
			});
		},
		
		
		reply: function(elem) { //回复
			var val = dom.content.val();
			var aite = '@' + li.find('.jie-user cite i').text().replace(/\s/g, '');
			dom.content.focus()
			if(val.indexOf(aite) !== -1) return;
			dom.content.val(aite + ' ' + val);
		},
		
		
		accept: function(elem) { //采纳
			var othis = $(this);
			layer.confirm('是否采纳该回答为最佳答案？', function(index) {
				layer.close(index);
				fly.json('/api/jieda-accept/', {
					id: li.data('id')
				}, function(res) {
					if(res.status === 0) {
						$('.jieda-accept').remove();
						li.addClass('jieda-daan');
						li.find('.detail-about').append('<i class="iconfont icon-caina" title="最佳答案"></i>');
					} else {
						layer.msg(res.msg);
					}
				});
			});
		},
		
		
		edit: function(elem) { //编辑
			fly.json('/jie/getDa/', {
				id: li.data('id')
			}, function(res) {
				var data = res.rows;
				layer.prompt({
					formType: 2,
					value: data.content,
					maxlength: 100000
				}, function(value, index) {
					fly.json('/jie/updateDa/', {
						id: li.data('id'),
						content: value
					}, function(res) {
						layer.close(index);
						li.find('.detail-body').html(fly.content(value));
					});
				});
			});
		},
		
		del: function(elem) { //删除
			layer.confirm('确认删除该回答么？', function(index) {
				layer.close(index);
				fly.json('/api/jieda-delete/', {
					id: li.data('id')
				}, function(res) {
					if(res.status === 0) {
						var count = dom.jiedaCount.text() | 0;
						dom.jiedaCount.html(--count);
						li.remove();
						//如果删除了最佳答案
						if(li.hasClass('jieda-daan')) {
							$('.jie-status').removeClass('jie-status-ok').text('求解中');
						}
					} else {
						layer.msg(res.msg);
					}
				});
			});
		},
		
		onClick : function(){
			$('.qing-comment-hint>span').on('click', function() {
				var othis = $(this);
				var type = othis.attr('type');
				plugin[type].call(this, othis.parents('div.qing-comment-main'));
			});
		},
		
		escape: function(html) {
			return String(html || '').replace(/&(?!#?[a-zA-Z0-9]+;)/g, '&amp;')
				.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/'/g, '&#39;').replace(/"/g, '&quot;');
		},
		
		content: function(content) {
			//支持的html标签
			var html = function(end) {
				return new RegExp('\\[' + (end || '') + '(pre|div|table|thead|th|tbody|tr|td|ul|li|ol|li|dl|dt|dd|h2|h3|h4|h5)\\]\\n*', 'g');
			};
			content = plugin.escape(content || '') //XSS
				.replace(/img\[([^\s]+?)\]/g, function(img) { //转义图片
					return '<img src="' + img.replace(/(^img\[)|(\]$)/g, '') + '">';
				}).replace(/@(\S+)(\s+?|$)/g, '@<a href="javascript:;" class="fly-aite">$1</a>$2') //转义@
				.replace(/face\[([^\s\[\]]+?)\]/g, function(face) { //转义表情
					var alt = face.replace(/^face/g, '');
					return '<img alt="' + alt + '" title="' + alt + '" src="' + qingface[alt] + '">';
				}).replace(/a\([\s\S]+?\)\[[\s\S]*?\]/g, function(str) { //转义链接
					var href = (str.match(/a\(([\s\S]+?)\)\[/) || [])[1];
					var text = (str.match(/\)\[([\s\S]*?)\]/) || [])[1];
					if(!href) return str;
					var rel = /^(http(s)*:\/\/)\b(?!(\w+\.)*(sentsin.com|layui.com))\b/.test(href.replace(/\s/g, ''));
					return '<a href="' + href + '" target="_blank"' + (rel ? ' rel="nofollow"' : '') + '>' + (text || href) + '</a>';
				}).replace(html(), '\<$1\>').replace(html('/'), '\</$1\>') //转义代码
				.replace(/\n/g, '<br>') //转义换行   
			return content;
		},
		
		// 内容转义
		zhuanyi:function(){
			var elements = $('.qing-comment-content');
			for(var i = 0;i < elements.length;i ++){
				var elem = $(elements[i]);
				elem.html(plugin.content(elem.html()));
			}
		}
	}
	exports('qingcmt', plugin);
});