





layui.define(['common', 'api','form','layer','laytpl','upload'], function(exports){
	var common = layui.common;
	var api = layui.api;
	var layer = layui.layer;
	var laytpl = layui.laytpl;
	
	var form = layui.form();
	
	var publishEditor = null;
	
	var action = {
		
		init:function(){
			var id = common.getUrlParam("id");
			api.getBlog({id:id},function(res){
				if(res.code == 0){
					laytpl($("#template").html()).render(res.data,function(html){
						$("#content-cnt").html(html);
						action.editor(res.data.blog.content);
						if(res.data.blog.coverURL) {
							$("#cover-preview-cnt").show();
						} else {
							$("#cover-preview-cnt").hide();
						}
						action.event();
					});
				} else {
					common.errorTip(res);
				}
			});
		},
		editor:function(content){
			publishEditor = editormd("publish-editormd", {
				height: 740,
				path: 'static/editor.md/lib/',
				toolbarIcons:function(){
					return  [
			            "undo", "redo", "|", 
			            "bold", "del", "italic", "quote", "uppercase", "lowercase", "|", 
			            "h1", "h2", "h3", "|", 
			            "list-ul", "list-ol", "hr", "|",
			            "link", "reference-link", "image", "code", "preformatted-text", "code-block", "table", "datetime", "html-entities", "|",
			            "watch","fullscreen", "clear", "search"
			        ];
				},
				codeFold: true,
				saveHTMLToTextarea: true, // 保存 HTML 到 Textarea
				searchReplace: true,
				watch : false,                // 关闭实时预览
				htmlDecode: "style,script,iframe|on*", // 开启 HTML 标签解析，为了安全性，默认不开启    
				taskList: true,
				imageUpload: true,
				imageFormats: ["jpg", "jpeg", "gif", "png", "bmp", "webp"],
				imageUploadURL: api.UPLOAD_IMAGE_URL,
				onload: function() {
					publishEditor.setMarkdown(content);
				}
			});
		},
		event:function(){
			layui.upload({
				url: api.UPLOAD_BLOG_COVER_URL,
				elem:"#blog-cover-file",
				success: function(res){
					console.log(res);
					if(res.code == 0){
						$("#blog-cover").val(res.data);
						$("#cover-preview-cnt").show();
						$("#cover-preview-img").attr('src',res.data);
					} else {
						common.errorTip(res);
					}
				}
			});
			form.render();
			
			//监听提交
			form.on('submit(blogEidt)', function(data) {
				var content = publishEditor.getMarkdown();
				var html = publishEditor.getHTML();
				var params = data.field;
				
				delete params['publish-editormd-html-code'];
				delete params['publish-editormd-markdown-doc'];
				
				params['blog.html'] = html;
				params['blog.content'] = content;
				
				if(params['blog.status'] == 0) {
					params['blog.statusName'] = '发表';
				} else {
					params['blog.statusName'] = '草稿';
				}
				
				if(params['blog.coverURL'] == null || params['blog.coverURL']== ''){
					params['blog.type'] = '0';
				} else {
					params['blog.type'] = '1';
				}
				api.editBlog(params, function(res) {
					switch(res.code) {
						case 0:
							//询问框
							layer.confirm('保存成功，立即查看？', {
							  btn: ['是','否'] //按钮
							}, function(){
							  window.open(res.data);
							  location.href='blog.html';
							}, function(){
							  location.href='blog.html';
							});
							break;
						case 1002:
							layer.msg("静态化失败", {shift: 6});
							break;
						case 1003:
							layer.msg("文章已存在", {shift: 6});
							break;
						default:
							layer.msg("保存失败", {shift: 6});
							break;
					}
				});
				return false;
			});
		}
	}
	
	action.init();
	
	
	
	exports('blog-edit',{});
});