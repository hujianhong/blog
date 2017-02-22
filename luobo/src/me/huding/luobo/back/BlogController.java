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
import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.jfinal.kit.StrKit;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.IAtom;
import com.jfinal.plugin.activerecord.Page;
import com.jfinal.plugin.activerecord.Record;

import me.huding.luobo.IConstants;
import me.huding.luobo.ResConsts;
import me.huding.luobo.model.Blog;
import me.huding.luobo.model.BlogTags;
import me.huding.luobo.model.Category;
import me.huding.luobo.model.Tags;
import me.huding.luobo.utils.DBUtils;
import me.huding.luobo.utils.DateStyle;
import me.huding.luobo.utils.DateUtils;
import me.huding.luobo.utils.KeyUtils;


/**
 * 博客管理控制器
 * 
 * 完成博客发表，浏览，编辑，删除等博文管理功能
 *
 * @author JianhongHu
 * @version 1.0
 * @date 2016年10月28日
 */
public class BlogController extends AbstarctBackController {
	/**
	 * 日志记录器
	 */
	public static final Logger LOG = LoggerFactory.getLogger(BlogController.class);
	
	
	@Override
	public void doPage(int pageNum, int pageSize) {
		// 查询数据
		Page<Record> data = Blog.paginate4Back(pageNum, pageSize);
		if(data.getList().size() > 0){
			for(Record record : data.getList()){
				Date date = record.getDate("publishTime");
				if(date != null){
					String d = DateUtils.DateToString(date, DateStyle.YYYY_MM_DD);
					record.set("publishTime", d);
				}
			}
		}
		// 渲染结果
		render(ResConsts.Code.SUCCESS, null, data);
	}
	
	/**
	 * 编辑博文
	 */
	@Override
	public void edit(){
		/* 获取参数  */
		final Blog blog = getModel(Blog.class, "blog");
		final Blog t = Blog.dao.findById(blog.getId());
		if(blog.getCoverURL() == null || blog.getCoverURL().length() < 5){
			blog.setCoverURL(null);
			blog.setType(0);
		}
		if(t== null){
			render(ResConsts.Code.FAILURE,"文章不存在");
			return;
		}
		// 更新流程：1.处理类别：类别中博文数 2.处理标签:解除映射关系 3.更新博客，重新静态化
		boolean editFlag = Db.tx(new IAtom() {
			
			@Override
			public boolean run() throws SQLException {
				// 处理类别
				if(!t.getCategoryID().equals(blog.getCategoryID())){
					Category c1 = Category.dao.findById(t.getCategoryID());
					Category c2 = Category.dao.findById(blog.getCategoryID());
					c1.setBlogNum(c1.getBlogNum() - 1);
					c2.setBlogNum(c2.getBlogNum() + 1);
					c1.update();
					c2.update();
				}
				// 处理标签
				String tags = t.getTags();
				delBlogTag(t.getId(), tags);
				if(!doHandleTag(blog)){
					return false;
				}
				for(Entry<String, Object> entry : blog._getAttrsEntrySet()){
					t.set(entry.getKey(), entry.getValue());
				}
				return t.update();
			}
		});
		if(!editFlag){
			render(ResConsts.Code.FAILURE,"更新失败");
			return;
		}
		if(t.getStatus() == IConstants.REPORT) {
			/* 静态化处理 */
			if(!statics(t)){ // 静态化处理失败
				render(ResConsts.Code.STATICS_ERROR);
				return;
			}
			render(ResConsts.Code.SUCCESS,null,t.getUrl());
		} else {
			File file = new File(StaticsUtils.genPath(t.getUrl()));
			if(file.exists()){
				file.delete();
			} 
			render(ResConsts.Code.SUCCESS,null,t.getUrl());
		}
	}
	
	
	private void delBlogTag(String blogID,String tags){
		if(StrKit.notBlank(tags)){
			String arr[] = tags.split(",");
			for(String key:arr){
				String tagID = KeyUtils.signByMD5(key);
				BlogTags.dao.deleteById(blogID,tagID);
			}
		}
	}
	
	

	@Override
	public void add() {
		/* 获取参数  */
		final Blog blog = getModel(Blog.class, "blog");
		/* 校验参数 */
		// TODO validate params
		
		String signature = KeyUtils.signByMD5(blog.getContent() + blog.getTitle());
		// 查询签名是否已经存在
		if(Blog.findBySignature(signature) != null){
			render(ResConsts.Code.EXISTS);
			return;
		} 
		blog.setSignature(signature);

		final String blogID = KeyUtils.getUUID();
		/* 数据处理 */
		blog.setId(blogID);
		Date curDate = DateUtils.getCurrentDate();
		blog.setPublishTime(curDate);
		blog.setLastUpdateTime(curDate);

		String fileName = genHtmlFileName(curDate);
		blog.setPath(StaticsUtils.genHtmlFilePath(fileName));
		blog.setUrl(StaticsUtils.genHtmlURL(fileName));
		blog.setReadNum(0);
		blog.setCommentNum(0);
		blog.setHeartNum(0);
		
		if(blog.getStatus() == IConstants.REPORT) {
			/* 静态化处理 */
			if(!statics(blog)){ // 静态化处理失败
				render(ResConsts.Code.STATICS_ERROR);
				return;
			}
		}
		// 持久化到数据库
		if(!storage(blog)){
			render(ResConsts.Code.FAILURE);
		} else {
			render(ResConsts.Code.SUCCESS,null,blog.getUrl());
		}
	}
	
	
	
	private boolean storage(final Blog blog){
		return Db.tx(new IAtom() {
			@Override
			public boolean run() throws SQLException {
				// 保存博客
				if(!blog.save()){
					return false;
				}
				// 修改类别中的博文数
				Category category = Category.dao.findByIdLoadColumns(blog.getCategoryID(),"id,blogNum");
				category.setBlogNum(category.getBlogNum() + 1);
				if(!category.update()){
					return false;
				}
				// 保存标签
				return doHandleTag(blog);
			}
		});
	}
	
	
	
	private boolean doHandleTag(Blog blog){
		List<Tags> tags = new ArrayList<Tags>();
		if(blog.getTags() != null){
			String[] arr = blog.getTags().split(",");
			for(String tag : arr){
				if(StrKit.isBlank(tag)){
					continue;
				}
				String tagID = KeyUtils.signByMD5(tag);
				Tags ttag = Tags.dao.findById(tagID);
				if(ttag == null){
					ttag = new Tags();
					ttag.setId(tagID);
					ttag.setName(tag);
					ttag.setCdate(DateUtils.getCurrentDate());
					if(!ttag.save()){
						return false;
					}
				}
				tags.add(ttag);
			}
		}
		// 保存博客与标签的映射
		for(Tags tag : tags){
			BlogTags blogTags = new BlogTags();
			blogTags.setBlogID(blog.getId());
			blogTags.setTagID(tag.getId());
			if(!blogTags.save()){
				return false;
			}
		}
		return true;
	}


	/**
	 * 使用时间生成博文的文件名，精确到秒
	 * 
	 * 
	 * @param date
	 * @return
	 */
	private String genHtmlFileName(Date date){
		if(date == null){
			date = DateUtils.getCurrentDate();
		}
		String prefix = "B" + DateUtils.DateToString(date, DateStyle.YYYYMMDDHHMMSS);
		return prefix + ".html";
	}

	/**
	 * 
	 */
	public static final String PARAM_CHECK = "validateValue";

	

	/**
	 * 将所有的博文重新静态化
	 */
	public void restaticsAll(){
		List<Blog> blogs = DBUtils.findAll(Blog.dao);
		for(Blog blog : blogs){
			statics(blog);
		}
		render(ResConsts.Code.SUCCESS);
	}
	
	/**
	 * 
	 * @param blog
	 * @return
	 */
	private boolean statics(Blog blog){
		boolean st = false;
		try {
			st = StaticsUtils.render(blog);
		} catch(IOException e){
			LOG.error(e.getMessage(),e);
		}
		return st;
	}

	@Override
	protected boolean doDel(String id) {
		// 删除流程：1.删除磁盘文件，2.类别数减1 3.博客的标签映射关系删除，4.删除博文
		final Blog blog = Blog.dao.findById(id);
		if(blog== null){
			return false;
		}
		
		boolean delFlag = Db.tx(new IAtom() {
			
			@Override
			public boolean run() throws SQLException {
				Category category = Category.dao.findById(blog.getCategoryID());
				category.setBlogNum(category.getBlogNum() - 1);
				if(!category.update()){
					return false;
				}
				delBlogTag(blog.getId(), blog.getTags());
				return blog.delete();
			}
		});
		if(!delFlag){
			return false;
		}
		File file = new File(StaticsUtils.genPath(blog.getUrl()));
		if(file.exists()){
			file.delete();
		} 
		return true;
	}

	@Override
	protected Object doGet(String id) {
		Blog blog = Blog.dao.findById(id);
		if(blog == null){
			return null;
		}
		List<Category> categories = Category.findAll();
		Map<String, Object> data = new HashMap<String,Object>();
		data.put("category", categories);
		data.put("blog", blog);
		return data;
	}
}
