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

import com.jfinal.kit.PathKit;
import com.qiniu.common.QiniuException;
import com.qiniu.http.Response;
import com.qiniu.storage.BucketManager;
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
	private static final String ACCESS_KEY = "32Z6ZkLnHwjnY6z";
	private static final String SECRET_KEY = "HLQmPDKLQ0u4tmy";
	//要上传的空间
	private static final String bucketname = "qingcai";

	//密钥配置
	private static final Auth auth = Auth.create(ACCESS_KEY, SECRET_KEY);
	//创建上传对象
	private static UploadManager uploadManager = new UploadManager();
	
	public static UploadManager getUploadManager(){
		return uploadManager;
	}

	//简单上传，使用默认策略，只需要设置上传的空间名就可以了
	public static String getUpToken() {
		return getUpToken(bucketname);
	}
	
	public static String getUpToken(String bucketname) {
		return auth.uploadToken(bucketname);
	}

	private static String sub(String path,String prefix){
		String dd = path.substring(path.indexOf(prefix));
		if(dd.contains("\\")){
			dd = dd.replaceAll("\\\\", "/");
		}
		return dd;
	}

	public static void uploadFiles(File dir,String prefix){
		if(dir.isDirectory()){
			File[] files = dir.listFiles();
			for(File subFile : files){
				if(subFile.isDirectory()){
					upload(subFile,prefix);
				} else {
					upload(subFile, sub(subFile.getAbsolutePath(),prefix));
				}
			}
		} else {
			upload(dir, sub(dir.getAbsolutePath(),prefix));
		}
	}
	
	public static void download(String key){
		
	}
	
	
	public static void delete(String key){
		delete(bucketname, key);
	}
	
	
	public static void delete(String bucketname,String key){
		try {
			 BucketManager bucketManager = new BucketManager(auth);
			 bucketManager.delete(bucketname, key);
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
	}


	public static boolean upload(File file,String key){
		try {
			//调用put方法上传
			Response res = uploadManager.put(file, key, getUpToken());
			//打印返回的信息
			System.out.println(res.bodyString());
			return true;
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
			return false;
		}
	}
	
	public static void main(String args[]){
		File file = new File(PathKit.getWebRootPath() + "/upload/0.gif");
		
		upload(file, "head/0.gif");
	}

	

}
