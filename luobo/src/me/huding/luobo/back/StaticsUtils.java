/**
 * Copyright (c) 2015-2016, Silly Boy 胡建洪(1043244432@qq.com).
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package me.huding.luobo.back;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Map.Entry;

import org.beetl.core.Configuration;
import org.beetl.core.GroupTemplate;
import org.beetl.core.Template;
import org.beetl.core.resource.FileResourceLoader;

import com.jfinal.kit.PathKit;

import me.huding.luobo.Parameters;
import me.huding.luobo.model.Blog;
import me.huding.luobo.utils.DateStyle;
import me.huding.luobo.utils.DateUtils;
import me.huding.luobo.utils.IOUtils;

/**
 * 
 *  新闻正文静态化工具类
 *
 * @author JianhongHu
 * @version 1.0
 * @date 2016年4月1日
 */
public class StaticsUtils {

	public static final String ROOT_DIR = PathKit.getWebRootPath() + File.separator
			+ "template";
	private static FileResourceLoader resourceLoader = null;
	private static Configuration cfg = null;
	private static GroupTemplate gt = null;
	
	public static final String TEMPLATE_FILE = "/template.html";
	
//	public static final String TEMPLATE_FILE = "/article.html";
	
	static {
		init();
	}
	
	public static void init(){
		try {
			resourceLoader = new FileResourceLoader(ROOT_DIR);
			cfg = Configuration.defaultConfiguration();
			gt = new GroupTemplate(resourceLoader, cfg);
		} catch (Exception e){
			e.printStackTrace();
		}
	}
	
	/**
	 * 生成静态化的HTML的文件路径
	 * @return
	 */
	public static String genHtmlFilePath(String value){
		return Parameters.STATICS_FINAL_PATH + File.separator + value;
	}
	
	private static String genPath(String url){
		return Parameters.STATICS_FINAL_PATH + url;
	}

	/**
	 * 生成静态化的HTML的相对URL
	 * @param value
	 * @return
	 */
	public static String genHtmlURL(String value){
		return Parameters.ARTICLES_PATH + "/" + value;
	}
	
	
	private static Blog findNextBlog(Blog bean){
		String sql = "select title,url from blog where publishTime > ? limit 1";
		Blog nextBlog = Blog.dao.findFirst(sql,bean.getPublishTime());
		if(nextBlog == null){
			sql = "select title,url from blog order by publishTime limit 1";
			nextBlog = Blog.dao.findFirst(sql);
		}
		return nextBlog;
	}
	
    private static Blog findPreBlog(Blog bean){
    	String sql = "select title,url from blog where publishTime < ? limit 1";
    	Blog preBlog = Blog.dao.findFirst(sql,bean.getPublishTime());
		if(preBlog == null){
			sql = "select title,url from blog order by publishTime desc limit 1";
			preBlog = Blog.dao.findFirst(sql);
		}
		return preBlog;
    }
	
	/**
	 * 
	 * @param filePath
	 * @param bean
	 * @return
	 * @throws IOException
	 */
	public static boolean render(Blog bean) throws IOException {
		Template t = gt.getTemplate(TEMPLATE_FILE);
		for(Entry<String, Object> entry : bean._getAttrsEntrySet()){
			String key = entry.getKey();
			if(key.equals("publishTime")){
				String value = DateUtils.DateToString(bean.getPublishTime(), DateStyle.YYYY_MM_DD );
				t.binding(entry.getKey(),value);
			} else {
				t.binding(entry.getKey(),entry.getValue());
			}
		}
		// 查找
		Blog nextBlog = findNextBlog(bean);
		t.binding("nextURL",nextBlog.getUrl());
		t.binding("nextTitle",nextBlog.getTitle());
		Blog preBlog = findPreBlog(bean);
		t.binding("preURL",preBlog.getUrl());
		t.binding("preTitle",preBlog.getTitle());
		
		List<String> blogTags = new ArrayList<String>();
		if(bean.getTags() != null){
			String[] arr = bean.getTags().split(",");
			for(String tag:arr){
				blogTags.add(tag);
			}
		}
		t.binding("blogTags",blogTags);
		
		OutputStream stream = null;
		try {
			stream = new FileOutputStream(new File(genPath(bean.getUrl())));
			t.renderTo(stream);
			stream.close();
		} finally {
			IOUtils.closeQuietly(stream);
		}
		return true;
	}
	
}
