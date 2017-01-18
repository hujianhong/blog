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
import me.huding.luobo.model.Blog;
import me.huding.luobo.model.Tags;
import me.huding.luobo.model.Timeline;
import me.huding.luobo.utils.DBUtils;

/**
 *
 *
 * @author JianhongHu
 * @version 1.0
 * @date 2017年1月14日
 */
public class BlogController extends BaseController {
	
	
	
	public void lunbo() {
		List<Blog> data = Blog.lunbo();
		render(ResConsts.Code.SUCCESS, null, data);
	}
	
	/**
	 * 热门排行
	 */
	public void hotRank(){
		List<Blog> data = Blog.hotRank(5);
		render(ResConsts.Code.SUCCESS, null, data);
	}
	
	/**
	 * 猜你喜欢
	 * 推荐
	 */
	public void recommend(){
		List<Blog> data = Blog.hotRank(15);
		render(ResConsts.Code.SUCCESS, null, data);
	}
	
	
	public void timeline(){
		List<Timeline> data = DBUtils.findAll(Timeline.dao);
		render(ResConsts.Code.SUCCESS, null, data);
	}
	

	public void blogTags() {
		List<Tags> data = Tags.findAll();
		render(ResConsts.Code.SUCCESS, null, data);
	}
	
	
	

}
