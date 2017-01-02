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
package me.huding.qingcai;


/**
 *
 *
 * @author JianhongHu
 * @version 1.0
 * @date 2016年10月31日
 */
public class ExamDataGenerator {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		for(int i = 0;i < 3;i ++){
			print("1", "巡考", "t_kwgl_xkcx");
			print("2", "巡考", "t_kwgl_xkcx");
			print("3", "巡考", "t_kwgl_xkcx");
			
			print("1", "监考", "t_kwgl_jkcx");
			print("2", "监考", "t_kwgl_jkcx");
			print("3", "监考", "t_kwgl_jkcx");
		}
		
		
		
		

	}
	
	public static void print(String bh,String zz,String tablename){
		for(int i = 0;i < 10;i ++){
			StringBuffer buffer = new StringBuffer("insert into " + tablename + " values ( ");
			buffer.append("\'").append("15-16-" + i).append("\'").append(",");
			buffer.append("\'").append("孝陵卫" + i).append("\'").append(",");
			buffer.append("\'").append("教四").append("\'").append(",");
			buffer.append("\'").append(i).append("\'").append(",");
			buffer.append("\'").append("--").append("\'").append(",");
			buffer.append("\'").append("--").append("\'").append(",");
			buffer.append("\'").append("2016-06-21 14:00").append("\'").append(",");
			buffer.append("\'").append(bh).append("\'").append(",");
			buffer.append("\'").append("hh" + i).append("\'").append(",");
			buffer.append("\'").append("各校区" + zz).append("\'").append(",");
			buffer.append("\'").append("123").append("\'").append(",");
			buffer.append("\'").append(bh).append("\'").append(",");
			buffer.append("\'").append("火警时分" + i).append("\'").append(" );");
			System.out.println(buffer.toString());
		}
	}

}
