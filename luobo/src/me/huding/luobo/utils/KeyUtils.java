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

import java.util.UUID;

import me.huding.luobo.IConstants;
import me.huding.luobo.utils.crypto.MDCoder;

/**
 *
 *
 * @author JianhongHu
 * @version 1.0
 * @date 2016年10月29日
 */
public class KeyUtils {

	/**
	 * 获取 UUID
	 * 
	 * @return
	 */
	public static String getUUID() {
		return UUID.randomUUID().toString().replaceAll("-", "");
	}

	/**
	 * 对内容进行签名，使用MD5进行哈希
	 * 
	 * @param value
	 * @return
	 */
	public static String signByMD5(String value) {
		// 
		return MDCoder.encodeMD5Hex(value);
	}
	
	
	public static void main(String[] args){
		System.out.println(signByMD5(IConstants.DEFAULT_PASSWORD));
	}

}
