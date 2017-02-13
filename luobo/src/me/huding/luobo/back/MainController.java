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


import com.jfinal.aop.Clear;
import com.jfinal.kit.StrKit;

import me.huding.luobo.BaseController;
import me.huding.luobo.IConstants;
import me.huding.luobo.ResConsts;
import me.huding.luobo.interceptor.AuthInterceptor;
import me.huding.luobo.model.User;
import me.huding.luobo.utils.KeyUtils;

/**
 *
 *
 * @author JianhongHu
 * @version 1.0
 * @date 2016年10月28日
 */
public class MainController extends BaseController {
	
	
	@Clear(AuthInterceptor.class)
	public void validateCode() {
		renderCaptcha();
	}
	
	/**
	 * 登录
	 */
	@Clear(AuthInterceptor.class)
	public void login(){
		String username = getPara("username");
		String password = getPara("password");
		if(!validateCaptcha("valicode")){
			render(ResConsts.Code.CODE_ERROR, "验证码错误");
			return;
		}
		if(username == null || username.trim().length() == 0){
			render(ResConsts.Code.USER_ERROR,"用户名不能为空");
			return;
		}
		if(password == null || password.trim().length() == 0){
			render(ResConsts.Code.PASS_ERROR,"密码不能为空");
			return;
		}
		User user = User.findByUsername(username);
		if(user == null){
			render(ResConsts.Code.USER_ERROR,"用户名或密码错误");
			return;
		}
		// 校验密码
		password = KeyUtils.signByMD5(password);
		if(password.equals(user.getPassword())){
			setSessionAttr(IConstants.SESSION_USER_KEY, user);
			setSessionAttr(IConstants.SESSION_USERID_KEY, user.getId());
			render(ResConsts.Code.SUCCESS);
			return;
		} else {
			render(ResConsts.Code.PASS_ERROR,"用户名或密码错误");
		}
	}
	
	/**
	 * 检查登录
	 */
	@Clear(AuthInterceptor.class)
	public void checkLogin(){
		if(getSessionAttr(IConstants.SESSION_USERID_KEY) != null){
			render(ResConsts.Code.SUCCESS);
		} else {
			render(ResConsts.Code.FAILURE);
		}
	}
	
	/**
	 * 退出登录
	 */
	public void logout() {
		getSession().invalidate();
	}
	
	
	public void password(){
		String pass1 = getPara("pass1");
		String pass2 = getPara("pass2");
		if(StrKit.isBlank(pass1)){
			render(ResConsts.Code.FAILURE,"密码不能为空");
			return;
		}
		if(StrKit.isBlank(pass2)){
			render(ResConsts.Code.FAILURE,"密码不能为空");
			return;
		}
		if(!pass1.equals(pass2)){
			render(ResConsts.Code.FAILURE,"两次密码不一致");
			return;
		}
		Integer userID = getSessionAttr(IConstants.SESSION_USERID_KEY);
		User user = User.dao.findById(userID);
		if(user == null){
			render(ResConsts.Code.FAILURE,"用户不存在");
			return;
		} 
		String password = KeyUtils.signByMD5(pass1);
		user.setPassword(password);
		if(user.update()){
			render(ResConsts.Code.SUCCESS,"修改成功");
		} else {
			render(ResConsts.Code.FAILURE,"修改失败");
		}
	}

}
