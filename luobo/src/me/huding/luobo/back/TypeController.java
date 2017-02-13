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

import java.util.Date;
import java.util.List;

import com.jfinal.plugin.activerecord.Page;
import com.jfinal.plugin.activerecord.Record;

import me.huding.luobo.ResConsts;
import me.huding.luobo.model.Category;
import me.huding.luobo.model.Type;
import me.huding.luobo.utils.DBUtils;

/**
 *
 *
 * @author JianhongHu
 * @version 1.0
 * @date 2016年11月2日
 */
public class TypeController extends AbstarctBackController {

	public void display(){
		List<Type> data = DBUtils.findAll(Type.dao);
		render(ResConsts.Code.SUCCESS, null, data);
	}

	@Override
	public void doPage(int pageNum, int pageSize) {
		// 查询数据
		Page<Record> data = Type.paginate(pageNum, pageSize);
		// 渲染结果
		render(ResConsts.Code.SUCCESS, null, data);
	}

	@Override
	public void add() {
		Type type = getModel(Type.class, "type");
		type.setCdate(new Date(System.currentTimeMillis()));
		if(type.save()){
			render(ResConsts.Code.SUCCESS,"保存成功");
		} else {
			render(ResConsts.Code.FAILURE,"保存失败");
		}
	}
	
	public void all(){
		List<Type> data = DBUtils.findAll(Type.dao);
		// 渲染结果
		render(ResConsts.Code.SUCCESS, null, data);
	}
	
	

	@Override
	public void del() {
		String id = getPara("id");
		Category category = Category.dao.findFirst("select id from category where typeID = ? limit 1",id);
		if(category == null){
			if(doDel(id)){
				render(ResConsts.Code.SUCCESS, "删除成功");
			} else {
				render(ResConsts.Code.FAILURE, "删除失败");
			}
		} else {
			render(ResConsts.Code.FAILURE, "存在使用该类型的分类，禁止删除该类型");
		}
	}

	@Override
	protected boolean doDel(String id) {
		return Type.dao.deleteById(id);
	}

	@Override
	protected Object doGet(String id) {
		return Type.dao.findById(id);
	}

	@Override
	public void edit() {
		Type type = getModel(Type.class, "type");
		type.setCdate(new Date(System.currentTimeMillis()));
		if(type.update()){
			render(ResConsts.Code.SUCCESS,"保存成功");
		} else {
			render(ResConsts.Code.FAILURE,"保存失败");
		}
	}
}
