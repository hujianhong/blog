/**
 * editor.md编辑器
 */
var publishEditor;
/**
 * 发表博文的URL
 */
var PUBLISH_BLOG_URL = "/luobo/admin/blog/publish";

var UPLOAD_IMG_URL = "/luobo/admin/upload/uploadImage";

var CATEGORY_URL = "/luobo/admin/category/display";

var TAGS_URL = "/luobo/admin/tags/display";

function initCategory(){
	$.post(CATEGORY_URL,function(result){
		var tpl = juicer($("#blog-category-template").html());
		 // 渲染数据
		var html = tpl.render(result);
		// 显示内容
		$("#blog-category").html(html);
	});
	
}

function initTags(){
	$.post(TAGS_URL,function(result) {
		var tpl = juicer($("#blog-tags-template").html());
		 // 渲染数据
		var html = tpl.render(result);
		// 显示内容
		$("#blog-tags").html(html);
	});
}

$(function() {
	
	initCategory();
	initTags();

	publishEditor = editormd("publish-editormd", {
		//width: "90%",
		height: 740,
		path: 'http://static.huding.name/editor.md/lib/',
		//theme : "dark",
		// previewTheme : "dark",
		// editorTheme : "pastel-on-dark",
		//markdown : md,
		codeFold: true,
		//syncScrolling : false,
		saveHTMLToTextarea: true, // 保存 HTML 到 Textarea
		searchReplace: true,
		//watch : false,                // 关闭实时预览
		htmlDecode: "style,script,iframe|on*", // 开启 HTML 标签解析，为了安全性，默认不开启    
		//toolbar  : false,             //关闭工具栏
		//previewCodeHighlight : false, // 关闭预览 HTML 的代码块高亮，默认开启
		emoji: true,
		taskList: true,
		tocm: true, // Using [TOCM]
		tex: true, // 开启科学公式TeX语言支持，默认关闭
		flowChart: true, // 开启流程图支持，默认关闭
		sequenceDiagram: true, // 开启时序/序列图支持，默认关闭,
		//dialogLockScreen : false,   // 设置弹出层对话框不锁屏，全局通用，默认为true
		//dialogShowMask : false,     // 设置弹出层对话框显示透明遮罩层，全局通用，默认为true
		//dialogDraggable : false,    // 设置弹出层对话框不可拖动，全局通用，默认为true
		//dialogMaskOpacity : 0.4,    // 设置透明遮罩层的透明度，全局通用，默认值为0.1
		//dialogMaskBgColor : "#000", // 设置透明遮罩层的背景颜色，全局通用，默认为#fff
		imageUpload: true,
		imageFormats: ["jpg", "jpeg", "gif", "png", "bmp", "webp"],
		imageUploadURL: UPLOAD_IMG_URL,
		onload: function() {
			console.log('onload', this);
			//this.fullscreen();
			//this.unwatch();
			//this.watch().fullscreen();

			//this.setMarkdown("#PHP");
			//this.width("100%");
			//this.height(480);
			//this.resize("100%", 640);
			$.get("test.md", function(data) {
				publishEditor.setMarkdown(data);
			});
		}
	});
	
	//publishEditor.hide();

	$("#btn-editor-show").bind('click', function() {
		publishEditor.show();
	});

	$("#btn-editor-hide").bind('click', function() {
		publishEditor.hide();
	});
	
	$("#blog-cover").hide();
	
	$("#rd-blog-cover").bind('change', function() {
		if($("#rd-blog-cover").val() == 1){
			$("#blog-cover").show();
		} else {
			$("#blog-cover").hide();
		}
	});


	$("#blog-title").val("dingfurong");
	$("#blog-author").val("huajinhong");
	$("#blog-summary").val("不过需要注意的是，code 范围内，不论是行内还是区块， < 和 & 两个符号都一定会被转换成 HTML 实体，这项特性让你可以很容易地用 Markdown 写 HTML code （和 HTML 相对而言， HTML 语法中，你要把所有的 < 和 & 都转换为 HTML 实体，才能在 HTML 文件里面写出 HTML code。）");

    var debug = true;
	$("#blog-submit").bind('click', function() {
		var blogStatus = $('input[name=blog-status]:checked').val();
		var blogType = $('input[name=blog-type]:checked').val();
		var blogCoverURL = "";
		// 
		if(blogType == 1){
			blogCoverURL = $("#blog-cover-url").html();
			if(blogCoverURL == ""){
				alert("请上传图片");
				return;
			}
		}
		var blogCategory = $('#blog-category').val();
		if(blogCategory == null){
			alert("请选择文章类别")
			return;
		}
		var blogTags = $('#blog-tags').val();
		if(blogTags == null){
			alert("请选择文章标签")
			return;
		}
		var blogTagStr = "";
		for(var i = 0;i < blogTags.length;i ++){
			blogTagStr += blogTags[i];
			if(i != blogTags.length - 1){
				blogTagStr += ",";
			}
		}
		var blogTitle = $("#blog-title").val();
		var blogAuthor = $("#blog-author").val();
		var blogSummary = $("#blog-summary").val();
		var content = publishEditor.getMarkdown();
		var html = publishEditor.getHTML();
		var params = {
			'blog.content': content,
			'blog.title': blogTitle,
			'blog.author': blogAuthor,
			'blog.summary': blogSummary,
			'blog.html': html,
			'blog.categoryID': blogCategory,
			'tags': blogTagStr,
			'blog.type':blogType,
			'blog.status':blogStatus,
			'blog.coverURL':blogCoverURL,
		}
		$.post(PUBLISH_BLOG_URL, params, function(data) {
			switch(data.code) {
				case 1000:
					alert("保存成功");
					break;
				case 1002:
					alert("静态化失败");
					break;
				case 1003:
					alert("文章已存在");
					break;
				default:
					alert("保存失败");
					break;
			}
		});
	});

});