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

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;

/**
 *
 *
 * @author JianhongHu
 * @version 1.0
 * @date 2016年11月10日
 */
public class Reverse {

	/**
	 * @param args
	 */
	public static void main(String[] args) throws IOException {
		File dir = new File("data");
		File[] files = dir.listFiles();
		for(File file : files){
			String fileName = file.getName();
			String of = "out/" + fileName.substring(0, fileName.lastIndexOf(".")) + ".sql";
			System.out.println(fileName);
			BufferedReader reader = new BufferedReader(new FileReader(file));
			BufferedWriter writer = new BufferedWriter(new FileWriter(of));
			String key = reader.readLine();
			String keys[] = key.split(",");
			System.out.println(keys.length);
			String value = null;
			int s = fileName.indexOf("T_");
			s = s > -1 ? s : fileName.indexOf("V_");
			int e = fileName.indexOf(".");
			String tableName = fileName.substring(s, e);
			System.out.println(tableName);
			tableName = tableName.replace("V_", "T_");
			boolean b = true;
			while((value = reader.readLine()) != null){
				StringBuffer buffer = new StringBuffer();
				buffer.append("insert into ").append(tableName);
				buffer.append("(");
				String values[] = value.split(",");
				for(int i = 2;i < values.length;i ++){
					buffer.append(keys[i]);
					if(i != values.length - 1){
						buffer.append(",");
					}
				}
				buffer.append(") values (");
				if(b){
					System.out.println(values.length);
					b = false;
				}
				
				for(int i = 2;i < values.length;i ++){
					String v = values[i];
					if(v.contains("/")){
						v = v.replace("/", "-");
					}
					buffer.append("\'").append(v).append("\'");
					if(i != values.length - 1){
						buffer.append(",");
					}
				}
				buffer.append(");");
				writer.write(buffer.toString() + "\r\n");
			}
			reader.close();
			writer.close();
		}
	}
}
