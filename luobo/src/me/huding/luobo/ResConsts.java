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

/**
 * 请求响应常量
 * 
 * 包括响应码和响应提示
 *
 * @author JianhongHu
 * @version 1.0
 * @date 2016年10月29日
 */
public class ResConsts {
	/**
	 * 响应码常量
	 */
	public static final String KEY_CODE = "code";
	/**
	 * 响应消息常量
	 */
	public static final String KEY_MSG = "msg";
	/**
	 * 响应结果常量
	 */
	public static final String KEY_DATA = "data";
	
	/**
	 * 响应码常量类
	 *
	 */
	public static class Code {
		/**
		 * 请求成功
		 */
		public static final int SUCCESS = 0;
		/**
		 * 请求失败
		 */
		public static final int FAILURE = 1001;
		/**
		 * 静态化失败
		 */
		public static final int STATICS_ERROR = 1002;
		/**
		 * 已存在
		 */
		public static final int EXISTS = 1003;
		/**
		 * 服务器端异常
		 */
		public static final int SERVER_ERROR = 5000;
		/**
		 * OK
		 */
		public static final int OK = 0;
		
		
		public static final int USER_ERROR = 2000;
		
		public static final int PASS_ERROR = 2001;
		
		public static final int CODE_ERROR = 2002;
		
		
		public static final int NO_AUTH = 3000;
	}
	
	/**
	 * 
	 * 响应消息常量类
	 *
	 */
	public static class Msg {
		
		/**
		 * 服务器端异常提示消息
		 */
		public static final String SERVER_ERROR = "服务器端发生异常....";
	}
	

}
