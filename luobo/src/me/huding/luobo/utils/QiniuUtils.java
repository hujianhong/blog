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
package me.huding.luobo.utils;

import java.io.File;
import java.io.IOException;

import com.qiniu.common.QiniuException;
import com.qiniu.http.Response;
import com.qiniu.storage.UploadManager;
import com.qiniu.util.Auth;

/**
 *
 * 七牛云存储文件管理工具类
 * 
 * 实现文件的上传下载等管理操作
 *
 * @author JianhongHu
 * @version 1.0
 * @date 2016年11月4日
 */
public class QiniuUtils {

	//设置好账号的ACCESS_KEY和SECRET_KEY
	private static final String ACCESS_KEY = "32Z6ZkLnHwjnY6zixMguhvDorGvgi8fLbZLjsrZ8";
	private static final String SECRET_KEY = "HLQmPDKLQ0u4tmyvyPcxUcbSuT_CxyH5rCgHXvDf";
	//要上传的空间
	private static final String bucketname = "qingcai";

	//密钥配置
	private static final Auth auth = Auth.create(ACCESS_KEY, SECRET_KEY);
	//创建上传对象
	static UploadManager uploadManager = new UploadManager();

	public static void main(String args[]) throws IOException {
		System.out.println(31536000 / 60 / 60/24);
		upload();
	}

	//简单上传，使用默认策略，只需要设置上传的空间名就可以了
	public static String getUpToken() {
		return auth.uploadToken(bucketname);
	}


	public static void listFiles(File file){
		if(file.isDirectory()){
			File[] file2 = file.listFiles();
			for(File file3 : file2){
				if(file3.isDirectory()){
					listFiles(file3);
				} else {
					String path = file3.getAbsolutePath();
					upload(path, sub(path), token);
				}
			}
		} else {
			String path = file.getAbsolutePath();
			upload(path, sub(path), token);
		}
	}


	public static void upload(String filePath,String key,String token){
		try {
			// BucketManager bucketManager = new BucketManager(auth);
			//bucketManager.delete(bucketname, key);
			//调用put方法上传
			Response res = uploadManager.put(filePath, key, getUpToken());
			//打印返回的信息
			System.out.println(res.bodyString());
		} catch (QiniuException e) {
			Response r = e.response;
			// 请求失败时打印的异常的信息
			System.out.println(r.toString());
			try {
				//响应的文本信息
				System.out.println(r.bodyString());
			} catch (QiniuException e1) {
				//ignore
			}
		}
		System.out.println(filePath);
		System.out.println(key);
	}

	public static String pathPrefix = "css";

	public static String sub(String path){
		String dd = path.substring(path.indexOf(pathPrefix));
		if(dd.contains("\\")){
			dd = dd.replaceAll("\\\\", "/");
		}
		return dd;
	}

	private static String token = getUpToken();

	public static void upload() throws IOException {
		File file = new File(pathPrefix);
		listFiles(file);
	}

}
