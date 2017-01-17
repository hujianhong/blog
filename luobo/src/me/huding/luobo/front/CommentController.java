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
package me.huding.luobo.front;

import me.huding.luobo.BaseController;
import me.huding.luobo.IConstants;
import me.huding.luobo.Parameters;
import me.huding.luobo.ResConsts;
import me.huding.luobo.model.Comment;

import com.jfinal.plugin.activerecord.Page;

/**
 *
 *
 * @author JianhongHu
 * @version 1.0
 * @date 2016年11月2日
 */
public class CommentController extends BaseController {


	/**
	 * 显示评论
	 */
	public void show(){
		Integer pageNum = getParaToInt(IConstants.PAGE_NUM);
		if(pageNum == null){
			pageNum = 1;
		}
		Integer pageSize = getParaToInt(IConstants.PAGE_SIZE);
		if(pageSize == null){
			pageSize = Parameters.DEFAULT_PAGE_SIZE;
		}
		String blogID = getPara("id");
		// 查询数据
		Page<Comment> data = Comment.findByBlogID(pageNum, pageSize, blogID);
		// 渲染结果
		render(ResConsts.Code.SUCCESS, null, data);
	}
	
	
	public void like() {
		String id = getPara("id");
		boolean ok = getParaToBoolean("ok");
		Comment comment = Comment.dao.findById(id);
		if(comment == null) {
			// 渲染结果
			render(ResConsts.Code.FAILURE, "评论不存在");
			return;
		}
		int num = comment.getLikeNum();
		// 取消赞
		if(ok) {
			comment.setLikeNum(num - 1);
			if(comment.update()){
				// 渲染结果
				render(ResConsts.Code.SUCCESS, "取消赞成功");
			} else {
				render(ResConsts.Code.FAILURE, "取消赞失败");
			}
			return;
		}
		// 点赞
		comment.setLikeNum(num + 1);
		if(comment.update()){
			// 渲染结果
			render(ResConsts.Code.SUCCESS, "点赞成功");
		} else {
			render(ResConsts.Code.FAILURE, "点赞失败");
		}
	}
	
	public void hate() {
		
	}
	
	
	public void reply() {
		
	}

	/**
	 * 发表评论
	 */
	public void post(){

	}

}
