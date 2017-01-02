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
package me.huding.luobo.front;

import java.util.Date;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.jfinal.plugin.activerecord.Page;
import com.jfinal.plugin.activerecord.Record;

import me.huding.luobo.BaseController;
import me.huding.luobo.IConstants;
import me.huding.luobo.Parameters;
import me.huding.luobo.ResConsts;
import me.huding.luobo.model.Blog;
import me.huding.luobo.model.BlogTags;
import me.huding.luobo.utils.DateStyle;
import me.huding.luobo.utils.DateUtils;

/**
 *
 *
 * @author JianhongHu
 * @version 1.0
 * @date 2016年10月28日
 */
public class MainController extends BaseController {
	/**
	 * 日志记录器
	 */
	public static final Logger LOG = LoggerFactory.getLogger(MainController.class);

	/**
	 * 
	 */
	public void index(){
		
	}
	
	/**
	 * 显示标签
	 */
	public void showTags(){
		List<Record> data = BlogTags.queryCount();
		render(ResConsts.Code.SUCCESS, null, data);
	}
	
	
	
	public void queryPages(){
		Map<String, String[]> params = getParaMap();
		int data = Blog.count(params);
		render(ResConsts.Code.SUCCESS, null,data);
	}
	
	

	
	/**
	 * 显示博文列表
	 */
	public void showBlogs(){
		
		Integer pageNum = getParaToInt(IConstants.PAGE_NUM);
		if(pageNum == null){
			pageNum = 1;
		}
		Integer pageSize = getParaToInt(IConstants.PAGE_SIZE);
		if(pageSize == null){
			pageSize = Parameters.DEFAULT_PAGE_SIZE;
		}
		
		// 查询数据
		Page<Record> data = Blog.paginate(pageNum, pageSize);
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
	 * 增加阅读数, 同时返回博文现有阅读数
	 * 
	 */
	public void readNum(){
		String blogKey = getPara("blogKey");
		if(blogKey == null){
			return;
		}
		Blog blog = Blog.dao.findByIdLoadColumns(blogKey, "id,readNum");
		int readNum = 0;
		if(blog != null){
			readNum = blog.getReadNum() + 1;
			blog.setReadNum(readNum);
			blog.update();
		}
		render(ResConsts.Code.SUCCESS, null, readNum);
	}
}
