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
import java.util.Date;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.jfinal.kit.StrKit;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.IAtom;
import com.jfinal.plugin.activerecord.Page;
import com.jfinal.plugin.activerecord.Record;

import me.huding.luobo.Parameters;
import me.huding.luobo.ResConsts;
import me.huding.luobo.model.Blog;
import me.huding.luobo.model.BlogTags;
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

	}
	
	

	@Override
	public void add() {
		/* 获取参数  */
		final Blog blog = getModel(Blog.class, "blog");
		final String[] tags = blog.getTags().split(",");
		/* 校验参数 */
		// TODO validate params

		String signature = KeyUtils.signByMD5(blog.getTitle());
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

		/* 静态化处理 */
		
		boolean st = statics(blog);
		// 静态化处理失败
		if(!st){
			render(ResConsts.Code.STATICS_ERROR);
			return;
		}
		// 持久化到数据库
		boolean flag = Db.tx(new IAtom() {
			@Override
			public boolean run() throws SQLException {
				boolean f1 = blog.save();
				boolean f2 = true;
				for(String tagID : tags){
					BlogTags blogTags = new BlogTags();
					blogTags.setBlogID(blogID);
					blogTags.setTagID(tagID);
					if(!(f2 = blogTags.save())){
						break;
					}
				}
				return f1 && f2;
			}
		});
		
		// 
		if(!flag){
			render(ResConsts.Code.FAILURE);
		} else {
			render(ResConsts.Code.SUCCESS,null,blog.getUrl());
		}
	}

	@Override
	public void del() {
		// TODO Auto-generated method stub
		
	}

	/**
	 * 使用时间生成博文的文件名，精确到秒
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
	 * 检查文章是否重复
	 */
	public void checkDuplicate(){
		String value = getPara(PARAM_CHECK);
		// 校验参数
		if(StrKit.isBlank(value)){

			return;
		}

		String signature = KeyUtils.signByMD5(value);
		// 查询签名是否已经存在
		Blog blog = Blog.findBySignature(signature);
		// 文章不存在
		if(blog == null){

		} 
		// 文章已存在
		else {

		}
	}


	/**
	 * 将所有的博文重新静态化
	 */
	public void reStaticsAll(){
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

	




}
