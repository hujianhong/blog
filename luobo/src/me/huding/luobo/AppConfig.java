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

import me.huding.luobo.back.AdminRoutes;
import me.huding.luobo.front.FrontRoutes;
import me.huding.luobo.interceptor.CrossDomainInterceptor;
import me.huding.luobo.model._MappingKit;

import com.jfinal.config.Constants;
import com.jfinal.config.Handlers;
import com.jfinal.config.Interceptors;
import com.jfinal.config.JFinalConfig;
import com.jfinal.config.Plugins;
import com.jfinal.config.Routes;
import com.jfinal.plugin.activerecord.ActiveRecordPlugin;
import com.jfinal.plugin.druid.DruidPlugin;
import com.jfinal.render.ViewType;

/**
 * 
 *
 *
 * @author JianhongHu
 * @version 1.0
 * @date 2016年10月28日
 */
public class AppConfig extends JFinalConfig {

	@Override
	public void configConstant(Constants me) {
		me.setDevMode(true);
		me.setViewType(ViewType.JSP);
	}

	@Override
	public void configRoute(Routes me) {
		// 后端路由
		me.add(new AdminRoutes());
		// 前端路由
		me.add(new FrontRoutes());
	}

	@Override
	public void configPlugin(Plugins me) {
		DruidPlugin cp = new DruidPlugin(Parameters.DB_URL,
				Parameters.DB_USERNAME, Parameters.DB_PASSWORD);
		me.add(cp);
		ActiveRecordPlugin arp = new ActiveRecordPlugin(cp);
		_MappingKit.mapping(arp);
		me.add(arp);
	}

	@Override
	public void configInterceptor(Interceptors me) {
		me.add(new CrossDomainInterceptor());
	}

	@Override
	public void configHandler(Handlers me) {

	}

}
