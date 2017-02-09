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

import java.util.List;

import me.huding.luobo.BaseController;
import me.huding.luobo.ResConsts;
import me.huding.luobo.model.Notice;

/**
 *
 *
 * @author JianhongHu
 * @version 1.0
 * @date 2017年2月9日
 */
public class NoticeController extends BaseController {
	
	
	
	public void index(){
		List<Notice> data = Notice.showNotices();
		render(ResConsts.Code.SUCCESS, "", data);
	}

}
