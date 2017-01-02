package me.huding.qingcai;
import java.io.File;
import java.io.IOException;

import com.qiniu.common.QiniuException;
import com.qiniu.http.Response;
import com.qiniu.storage.BucketManager;
import com.qiniu.storage.UploadManager;
import com.qiniu.util.Auth;

public class upload {
	//设置好账号的ACCESS_KEY和SECRET_KEY
	String ACCESS_KEY = "32Z6ZkLnHwjnY6zixMguhvDorGvgi8fLbZLjsrZ8";
	String SECRET_KEY = "HLQmPDKLQ0u4tmyvyPcxUcbSuT_CxyH5rCgHXvDf";
	//要上传的空间
	String bucketname = "qingcai";

	//密钥配置
	Auth auth = Auth.create(ACCESS_KEY, SECRET_KEY);
	//创建上传对象
	UploadManager uploadManager = new UploadManager();

	public static void main(String args[]) throws IOException {
		System.out.println(31536000 / 60 / 60/24);
		new upload().upload();
	}

	//简单上传，使用默认策略，只需要设置上传的空间名就可以了
	public String getUpToken() {
		return auth.uploadToken(bucketname);
	}


	public void listFiles(File file){
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


	public void upload(String filePath,String key,String token){
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

	public String pathPrefix = "css";

	public String sub(String path){
		String dd = path.substring(path.indexOf(pathPrefix));
		if(dd.contains("\\")){
			dd = dd.replaceAll("\\\\", "/");
		}
		return dd;
	}

	String token = getUpToken();

	public void upload() throws IOException {
		File file = new File(pathPrefix);
		listFiles(file);
	}

}