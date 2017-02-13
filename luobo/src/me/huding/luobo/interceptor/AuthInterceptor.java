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
package me.huding.luobo.interceptor;

import com.jfinal.aop.Interceptor;
import com.jfinal.aop.Invocation;
import com.jfinal.core.Controller;

import me.huding.luobo.IConstants;
import me.huding.luobo.ResConsts;
import me.huding.luobo.back.AdminRoutes;

/**
 * 
 * 权限拦截器
 * 
 * 只有合法的访问才能得到响应
 *
 * @author JianhongHu
 * @version 1.0
 * @date 2016年10月29日
 */
public class AuthInterceptor implements Interceptor {

	/* (non-Javadoc)
	 * @see com.jfinal.aop.Interceptor#intercept(com.jfinal.aop.Invocation)
	 */
	@Override
	public void intercept(Invocation inv) {
		String actionKey = inv.getActionKey();
		if(actionKey.startsWith(AdminRoutes.PREFIX)){
			Controller controller = inv.getController();
			Object object = controller.getSessionAttr(IConstants.SESSION_USER_KEY);
			if(object == null){
				controller.setAttr(ResConsts.KEY_CODE, ResConsts.Code.NO_AUTH);
				controller.setAttr(ResConsts.KEY_MSG, "没有访问权限");
				controller.renderJson();
				return;
			} else {
				inv.invoke();
			}
		} else {
			inv.invoke();
		}
	}

}
