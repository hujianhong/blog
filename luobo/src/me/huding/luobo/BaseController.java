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
package me.huding.luobo;

import com.jfinal.core.Controller;

/**
 * 基本控制器，其他控制器的基类
 *
 * @author JianhongHu
 * @version 1.0
 * @date 2016年10月29日
 */
public class BaseController extends Controller {
	
	
	protected Integer getPageSize(){
		Integer pageSize = getParaToInt(IConstants.PAGE_SIZE);
		if(pageSize == null){
			pageSize = Parameters.DEFAULT_PAGE_SIZE;
		}
		return pageSize;
	}
	
	protected Integer getPageNum(){
		Integer pageNum = getParaToInt(IConstants.PAGE_NUM);
		if(pageNum == null){
			pageNum = 1;
		}
		return pageNum;
	}
	
	/**
	 * 设置响应码
	 * @param code
	 */
	protected Controller setCode(int code){
		return setAttr(ResConsts.KEY_CODE, code);
	}

	/**
	 * 设置响应消息提示
	 * @param msg
	 */
	protected Controller setMsg(String msg){
		if(msg == null){
			return this;
		}
		return setAttr(ResConsts.KEY_MSG, msg);
	}

	/**
	 * 设置响应数据
	 * @param value
	 */
	protected Controller setData(Object value) {
		if(value == null){
			return this;
		}
		return setAttr(ResConsts.KEY_DATA, value);
	}

	/**
	 * 渲染响应结果
	 * <p>
	 * 渲染结果时必须保证包含响应码
	 * </p>
	 * <p>
	 * 因此首先校验响应码是否设置，若无，则添加默认响应码{@link me.huding.luobo.ResConsts.Code#SUCCESS}
	 * </P>
	 */
	protected void render() {
		// 如果没有设置响应码，则添加默认响应码
		if(getAttr(ResConsts.KEY_CODE) == null){
			// 添加默认响应码
			setAttr(ResConsts.KEY_CODE, ResConsts.Code.SUCCESS);
		}
		// 渲染JSON数据
		renderJson();
	}
	
	
	/**
	 * 渲染响应结果
	 * 
	 * @param code
	 */
	protected void render(int code) {
		setCode(code);
		// 渲染JSON数据
		renderJson();
	}
	
	/**
	 * 渲染响应结果
	 * 
	 * @param code
	 */
	protected void render(int code,String msg) {
		setCode(code);
		setMsg(msg);
		// 渲染JSON数据
		renderJson();
	}
	
	/**
	 * 渲染响应结果
	 * 
	 * @param code
	 */
	protected void render(int code,String msg,Object data) {
		setCode(code);
		setMsg(msg);
		setData(data);
		// 渲染JSON数据
		renderJson();
	}

}
