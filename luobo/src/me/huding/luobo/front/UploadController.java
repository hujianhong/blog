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
package me.huding.luobo.front;

import com.jfinal.upload.UploadFile;

import me.huding.luobo.BaseController;
import me.huding.luobo.ResConsts;

/**
 *
 *
 * @author JianhongHu
 * @version 1.0
 * @date 2017年1月17日
 */
public class UploadController extends BaseController {

	/**
	 * 上传图片
	 */
	public void uploadImage(){
		UploadFile uploadFile = getFile("editormd-image-file");
		String name = getPara("name");
		System.out.println(name);
		String filename = getPara("filename");
		System.out.println(filename);
		System.out.println(uploadFile.getFileName());
		setAttr("success", 1);
		setAttr("msg", "");
		setAttr("url", "http://static.huding.name/i/f10.jpg");
		render(ResConsts.Code.SUCCESS, "", "http://static.huding.name/i/f10.jpg");
	}
	
	/**
	 * 上传文件
	 */
	public void uploadFile(){
		
	}
}
