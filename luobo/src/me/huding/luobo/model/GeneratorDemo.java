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

import me.huding.luobo.Parameters;
import me.huding.luobo.utils.DBUtils;
import me.huding.luobo.utils.KeyUtils;

import com.jfinal.kit.PathKit;
import com.jfinal.plugin.activerecord.ActiveRecordPlugin;
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
		BufferedReader reader = new BufferedReader(new FileReader("temp"));
		int in = 0;
		while((t= reader.readLine()) != null){
			titles[in ++] = t;
		}
		reader.close();
		Blog b = Blog.dao.findById("1ca3888bf494480a81db9f577e362d07");
		Date cDate = new Date(2012, 0, 1);
		for(int i = 1;i < 40;i ++){
			Blog bl = new Blog();
			bl._setAttrs(b);
			cDate.setMonth(i);
			bl.setPublishTime(cDate);
			bl.setId(KeyUtils.getUUID());
			bl.setTitle(titles[i]);
			bl.setCommentNum(rand());
			bl.setHeartNum(rand());
			bl.setReadNum(rand());
			bl.setSignature(KeyUtils.signByMD5(titles[i]));
			bl.save();
		}*/
		
		/*List<Timeline> timelines = DBUtils.findAll(Timeline.dao);
		System.out.println(timelines);
		for(Timeline timeline : timelines){
			System.out.println(timeline.getDisplayName());
		}*/
		
		
		
		
		
		/*List<Blog> blogs = Blog.findAll("id,publishTime");
		System.out.println(blogs);
		Map<String, Timeline> maps = new HashMap<String, Timeline>();
		SimpleDateFormat format = new SimpleDateFormat("yyyyMM");
		SimpleDateFormat format2 = new SimpleDateFormat("yyyy年MM月");
		int i = 1;
		for(Blog blog : blogs) {
			java.util.Date date = blog.getPublishTime();
			//date.setMonth(i ++);
			//blog.update();
			String id = format.format(date);
			System.out.println(date);
			System.out.println(id);
			if(!maps.containsKey(id)){
				Timeline timeline = new Timeline();
				timeline.setId(id);
				timeline.setDisplayDate(date);
				timeline.setCreatedDate(new java.util.Date(System.currentTimeMillis()));
				timeline.setDisplayName(format2.format(date));
				timeline.save();
				maps.put(id, timeline);
			}
		}*/
		
		
		
		/*BufferedReader reader = new BufferedReader(new FileReader("tag"));
		String t = reader.readLine();
		System.out.println(t);
		String arr[] = t.split(" ");
		List<String> tags = new ArrayList<String>();
		for(String string : arr){
//			System.out.println(string);
			if(string.contains(")")){
				string = string.substring(string.indexOf(")") + 1);
			}
			string = string.trim();
			System.out.println(string);
			if(string.length() > 0){
				tags.add(string);
			}
		}
		List<Tags> list = new ArrayList<Tags>();
		for(String tagName : tags){
			Tags tags2 = new Tags();
			tags2.setId(KeyUtils.getUUID());
			tags2.setName(tagName);
			list.add(tags2);
		}
		for(Tags tags2 : list){
			tags2.save();
		}
		
		reader.close();*/
		
		List<Tags> tags = DBUtils.findAll(Tags.dao);
		List<Blog> blogs = DBUtils.findAll(Blog.dao);
		int blen = blogs.size();
		for(Tags tags2 : tags){
			int klen = Math.max(5, (int)(Math.random() * 20));
			Set<Integer> set = new HashSet<Integer>();
			int k = 0;
			while(k < klen){
				int index = 0;
				while(true){
					index = (int)(Math.random() * blen);
					if(!set.contains(index)){
						set.add(index);
						break;
					}
				}
				Blog blog = blogs.get(index);
				BlogTags blogTags = new BlogTags();
				blogTags.setBlogID(blog.getId());
				blogTags.setTagID(tags2.getId());
				blogTags.save();
				k ++;
			}
		}
		
		
	}

	public static void main(String[] args) throws IOException {
		handle();
	}
}









