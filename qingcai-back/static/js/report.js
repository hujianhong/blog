


layui.use(['form', 'layedit', 'laydate','element'], function(exports){
  var form = layui.form()
  ,layer = layui.layer
  ,layedit = layui.layedit
  ,laydate = layui.laydate;
  var $ = layui.jquery;
  var element = layui.element(); //导航的hover效果、二级菜单等功能，需要依赖element模块
  
  //监听导航点击
  element.on('nav(demo)', function(elem){
    //console.log(elem)
    layer.msg(elem.text());
  });
  
  var UPLOAD_IMG_URL = "/luobo/admin/upload/uploadImage";
  
  //创建一个编辑器
  var editIndex = layedit.build('LAY_demo_editor');
 
  //自定义验证规则
  form.verify({
    title: function(value){
      if(value.length < 5){
        return '标题至少得5个字符啊';
      }
    }
    ,pass: [/(.+){6,12}$/, '密码必须6到12位']
    ,content: function(value){
      layedit.sync(editIndex);
    }
  });
  
  
  
  //监听提交
  form.on('submit(demo1)', function(data){
    layer.alert(JSON.stringify(data.field), {
      title: '最终的提交信息'
    })
    return false;
  });
  
  
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
  
   exports('report',{});
});