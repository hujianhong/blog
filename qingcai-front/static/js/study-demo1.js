/*
 * 
 * study demo1.js
 * 
 */
layui.define(['layer'],function(exports){
	var layer = layui.layer;
	
	var gather = {
		check : function(){
			layer.msg("hujianhong");
		}
	}
	
	exports('study',gather);
	
});