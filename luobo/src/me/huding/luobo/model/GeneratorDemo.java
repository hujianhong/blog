package me.huding.luobo.model;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.sql.Date;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.sql.DataSource;
import javax.swing.text.html.ListView;

import me.huding.luobo.IConstants;
import me.huding.luobo.Parameters;
import me.huding.luobo.utils.DBUtils;
import me.huding.luobo.utils.KeyUtils;
import me.huding.luobo.utils.crypto.MDCoder;

import com.jfinal.kit.PathKit;
import com.jfinal.plugin.activerecord.ActiveRecordPlugin;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.generator.Generator;
import com.jfinal.plugin.druid.DruidPlugin;

/**
 * GeneratorDemo
 */
public class GeneratorDemo {

	public static DataSource getDataSource() {
		DruidPlugin cp = new DruidPlugin(Parameters.DB_URL,
				Parameters.DB_USERNAME, Parameters.DB_PASSWORD);
		cp.start();
		return cp.getDataSource();
	}


	public static void gen(){
		// base model 所使用的包名
		String baseModelPackageName = "me.huding.luobo.model.base";
		// base model 文件保存路径
		String baseModelOutputDir = PathKit.getWebRootPath() + "/../src/me/huding/luobo/model/base";

		// model 所使用的包名 (MappingKit 默认使用的包名)
		String modelPackageName = "me.huding.luobo.model";
		// model 文件保存路径 (MappingKit 与 DataDictionary 文件默认保存路径)
		String modelOutputDir = baseModelOutputDir + "/..";

		// 创建生成器
		Generator gernerator = new Generator(getDataSource(), baseModelPackageName, baseModelOutputDir, modelPackageName, modelOutputDir);
		// 添加不需要生成的表名
		gernerator.addExcludedTable("blog_display");
		gernerator.addExcludedTable("blog_display_by_tag");
		gernerator.addExcludedTable("blog_tags_display");
		gernerator.addExcludedTable("blog_rel_tags");
		gernerator.addExcludedTable("blog_back_display");
		
		// 设置是否在 Model 中生成 dao 对象
		gernerator.setGenerateDaoInModel(true);
		// 设置是否生成字典文件
		gernerator.setGenerateDataDictionary(false);
		// 设置需要被移除的表名前缀用于生成modelName。例如表名 "osc_user"，移除前缀 "osc_"后生成的model名为 "User"而非 OscUser
		gernerator.setRemovedTableNamePrefixes("t_");
		// 生成
		gernerator.generate();
	}
	
	
	public static int rand(){
		return (int)(Math.random() * 100);
	}
	
	
	public static void handle() throws IOException {
		ActiveRecordPlugin arp = new ActiveRecordPlugin(getDataSource());
		_MappingKit.mapping(arp);
		arp.start();

		
		/*String t = null;
		String[] titles = new String[100];
		BufferedReader reader = new BufferedReader(new FileReader("img"));
		int in = 0;
		while((t= reader.readLine()) != null){
			titles[in ++] = t.trim();
		}
		reader.close();
		List<Blog> blogs = Blog.dao.find("select * from blog where type = 1 limit ?",in);
		for(int i = 0;i < in;i ++){
			Blog blog = blogs.get(i);
			blog.setCoverURL(titles[i]);
			blog.update();
		}*/
		
//		User user = User.findByUsername("hujianhong");
//		
//		String password = "hubaichuan";
//		
//		password = MDCoder.encodeMD5Hex(password);
//		
//		System.out.println(password);
//		
//		user.setPassword(password);
//		
//		user.update();
		
//		List<Blog> blogs = Blog.dao.find("select * from blog");
//		for(int i = 0;i < blogs.size();i ++){
//			Blog blog = blogs.get(i);
//			blog.setStatusName("显示");
//			blog.update();
//		}
		
		List<Comment> comments = DBUtils.findAll(Comment.dao);
		for(Comment comment: comments){
			int code = comment.getEmail().hashCode();
			code = Math.abs(code) % IConstants.HEAD_MOD;
			comment.setHeadURL(code +".gif");
			comment.update();
		}
		
		
	}

	public static void main(String[] args) throws IOException {
		handle();
//		gen();
	}
}









