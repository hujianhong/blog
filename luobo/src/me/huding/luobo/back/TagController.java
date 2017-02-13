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

import java.sql.SQLException;

import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.IAtom;
import com.jfinal.plugin.activerecord.Page;
import com.jfinal.plugin.activerecord.Record;

import me.huding.luobo.ResConsts;
import me.huding.luobo.model.Tags;
import me.huding.luobo.utils.DateUtils;
import me.huding.luobo.utils.KeyUtils;

/**
 *
 *
 * @author JianhongHu
 * @version 1.0
 * @date 2016年11月2日
 */
public class TagController extends AbstarctBackController {


	@Override
	public void doPage(int pageNum, int pageSize) {
		// 查询数据
		Page<Record> data = Tags.paginate(pageNum, pageSize);
		// 渲染结果
		render(ResConsts.Code.SUCCESS, null, data);
	}

	@Override
	public void add() {
		Tags tags = getModel(Tags.class, "tag");
		tags.setCdate(DateUtils.getCurrentDate());
		String id = KeyUtils.signByMD5(tags.getName());
		if(Tags.dao.findById(id) != null){
			render(ResConsts.Code.FAILURE,"标签已存在");
			return;
		}
		tags.setId(id);
		if(tags.save()){
			render(ResConsts.Code.SUCCESS,"保存成功");
		} else {
			render(ResConsts.Code.FAILURE,"保存失败");
		}
	}
	
	
	public void queryBlogNum(){
		String id = getPara("id");
		Integer data = Db.queryInt("select count(*) from blog_tags where tagID = ?",id);
		render(ResConsts.Code.SUCCESS,"",data);
	}
	

	@Override
	protected boolean doDel(final String id) {
		return Db.tx(new IAtom() {
			
			@Override
			public boolean run() throws SQLException {
				
				Db.update("delete from blog_tags where tagID = ?",id);
				
				return Tags.dao.deleteById(id);
			}
		});
	}

	@Override
	protected Object doGet(String id) {
		return Tags.dao.findById(id);
	}

	@Override
	public void edit() {
		Tags tags = getModel(Tags.class, "tag");
		if(tags.update()){
			render(ResConsts.Code.SUCCESS,"保存成功");
		} else {
			render(ResConsts.Code.FAILURE,"保存失败");
		}
	}
}
