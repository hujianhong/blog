layui.define(['util', 'api', 'layer', 'form'], function(exports) {
	var $ = layui.jquery;
	var layer = layui.layer;
	var api = layui.api;
	var form = layui.form();
	// 
	var action = {
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
				action[type].call(this, othis.parents('div.qing-comment-main'));
			});
		}
	};
	
	exports('comment', action);
});