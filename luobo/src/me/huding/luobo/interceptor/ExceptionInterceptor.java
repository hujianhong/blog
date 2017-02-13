package me.huding.luobo.interceptor;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.jfinal.aop.Interceptor;
import com.jfinal.aop.Invocation;
import com.jfinal.core.Controller;

import me.huding.luobo.ResConsts;

/**
 * 
 * 服务器端统一异常处理拦截器
 *
 */
public class ExceptionInterceptor implements Interceptor {
	/**
	 * 日志记录器
	 */
	public static final Logger LOG = LoggerFactory.getLogger(ExceptionInterceptor.class);
	

	@Override
	public void intercept(Invocation inv) {
		try {
			inv.invoke();
		} catch (Exception e){
			// 记录日志信息
			LOG.error(e.getMessage(), e);
			// 渲染请求响应为服务器端异常
			renderError(inv.getController());
		}
	}
	
	private void renderError(Controller controller){
		controller.setAttr(ResConsts.KEY_CODE, ResConsts.Code.SERVER_ERROR);
		controller.setAttr(ResConsts.KEY_MSG, ResConsts.Msg.SERVER_ERROR);
		controller.renderJson();
	}

}
