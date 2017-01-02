该模版由Layui官方社区（[http://fly.layui.com/](http://fly.layui.com/)）倾情提供，只为表明我们对 Layui 执着的信念、以及对未来持续加强的承诺。模版基于Layui搭建而成，可作为一个简约问答社区的页面支撑。

# 目录说明 
```
├─html 可直接预览的模版文件
│  ├─jie
│  ├─public
│  └─user
├─res 静态资源
│  ├─css
│  ├─images
│  │  ├─avatar
│  │  └─other
│  ├─layui
│  └─mods 模版业务模块
└─views Node.js动态模版
    ├─jie
    └─user
```

# 全屏风格
模版提供了全屏风格，你可以打开 html/full.html预览效果
使用全屏风格只需在原有css的基础上，引入 css/full.css即可。

# 关于自带编辑器的字符解析
该模版自带一个特定语法的编辑器，当你把内容存储到数据库后，在页面读取后浏览，会发现诸如“表情、代码、图片”等无法解析，这是因为需要对该内容进行一次转义，通常来说这是在服务端完成的，但鉴于简单化，你还可以直接在前端去解析，在模版的detail.html中，我们已经把相关的代码写好了，你只要打开注释即可。

当然，如果觉得编辑器无法满足你的需求，你也可以把该编辑器换成别的HTML编辑器。

# 部分页面预览

### 固宽排版
![固宽排版](http://cdn.layui.com/upload/2016_10/336_1477439906513_77240.jpg)

### 全屏排版
![全屏排版](http://cdn.layui.com/upload/2016_10/336_1477439915763_52692.jpg)

### 登入页面
![登入页面](http://cdn.layui.com/upload/2016_10/168_1477442683053_20213.jpg)

### 移动设备下的首页
![移动设备下的首页](http://cdn.layui.com/upload/2016_10/336_1477439925013_51706.jpg)

### 移动设备下的详情页
![移动设备下的详情页](http://cdn.layui.com/upload/2016_10/336_1477439931466_72461.jpg)

# 开源协议
Fly模版采用MIT协议，也就是说几乎没有约束，你可以随便使用它

# 在线演示
[http://fly.layui.com/](http://fly.layui.com/)
<hr>
[GitHub地址](https://github.com/layui/fly)
