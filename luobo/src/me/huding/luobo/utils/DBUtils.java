/**
 * Copyright (c) 2015-2017, Silly Boy 胡建洪(1043244432@qq.com).
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
package me.huding.luobo.utils;

import java.util.List;

import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.Table;
import com.jfinal.plugin.activerecord.TableMapping;

/**
 *
 *
 * @author JianhongHu
 * @version 1.0
 * @date 2017年1月14日
 */
public class DBUtils {
	
	
	public static <T extends Model<T>> List<T> findAll(Model<T> model,String... columns){
		StringBuilder builder = new StringBuilder();
		builder.append("select ");
		Table table = TableMapping.me().getTable(model.getClass());
		if(columns == null || columns.length == 0){
			/*Set<String> set = table.getColumnTypeMap().keySet();
			columns = set.toArray(new String[0]);*/
			builder.append(" * ");
		} else {
			for(int i = 0;i <columns.length;i ++){
				builder.append(columns[i]);
				if(i != columns.length - 1){
					builder.append(",");
				}
			}
		}
		
		builder.append(" from ").append(table.getName());
		return model.find(builder.toString());
	}
	
	
	public static <T extends Model<T>> List<T> findAll(Model<T> model){
		StringBuilder builder = new StringBuilder();
		builder.append("select * ");
		Table table = TableMapping.me().getTable(model.getClass());
		builder.append(" from ").append(table.getName());
		return model.find(builder.toString());
	}


}
