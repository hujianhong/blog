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

import com.jfinal.upload.UploadFile;

import me.huding.luobo.BaseController;
import me.huding.luobo.ResConsts;
import me.huding.luobo.utils.KeyUtils;
import me.huding.luobo.utils.QiniuUtils;

/**
 * 上传文件控制器
 *
 * @author JianhongHu
 * @version 1.0
 * @date 2016年10月29日
 */
public class UploadController extends BaseController {
	
	public static final String HOST = "http://static.huding.name/";
	
	public static final String IMAGE_BUKECT = "image/";
	
	public static final String FILE_BUKECT = "file/";
	
	public static final String PARA_FILE_KEY = "editormd-image-file";
	
	/**
	 * 上传图片
	 */
	public void uploadImage(){
		UploadFile uploadFile = getFile(PARA_FILE_KEY);
		upload(uploadFile, IMAGE_BUKECT);
	}
	
	/**
	 * 上传文件
	 */
	public void uploadFile(){
		UploadFile uploadFile = getFile(PARA_FILE_KEY);
		upload(uploadFile, FILE_BUKECT);
	}
	
	private void upload(UploadFile uploadFile,String bucket){
		if(uploadFile != null){
			File file = uploadFile.getFile();
			String fileName = file.getName();
			int index = fileName.lastIndexOf('.');
			String suffix = fileName.substring(index);
			String key = bucket + KeyUtils.getUUID() + suffix;
			if(QiniuUtils.upload(file, key)){
				String url = HOST + key;
				setAttr("success", 1);
				setAttr("msg", "");
				setAttr("url", url);
				render(ResConsts.Code.SUCCESS, "",url);
			} else {
				setAttr("success", 0);
				setAttr("msg", "上传失败");
				setAttr("url", "");
				render(ResConsts.Code.FAILURE, "上传失败");
			}
		} else {
			setAttr("success", 0);
			setAttr("msg", "上传失败");
			setAttr("url", "");
			render(ResConsts.Code.FAILURE, "文件为空");
		}
	}

}
