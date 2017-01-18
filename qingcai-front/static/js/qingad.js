/**
 * 青菜萝卜广告
 * 
 * 
 */
layui.define([],function(exports){
	
	var adTpl = {
		tpl:
		'<div class="qing-margin-bottom qing-left-ad">\
			广告占位\
			<iframe src="guanggao.html" style="height: 250px;width: 300px;"></iframe>\
		</div>'
	}
	
	
	var qingad = {
		
		leftAD : function() {
			return adTpl;
		}
	}
	
	
	exports('qingad',qingad);
});
