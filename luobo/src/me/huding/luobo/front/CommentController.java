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

import java.util.Date;

import me.huding.luobo.BaseController;
import me.huding.luobo.IConstants;
import me.huding.luobo.Parameters;
import me.huding.luobo.ResConsts;
import me.huding.luobo.model.Blog;
import me.huding.luobo.model.Comment;
import me.huding.luobo.utils.KeyUtils;

import com.jfinal.kit.StrKit;
import com.jfinal.plugin.activerecord.Page;

/**
 *
 *
 * @author JianhongHu
 * @version 1.0
 * @date 2016年11月2日
 */
public class CommentController extends BaseController {
	
	
	public static final String SPCMT_MSG = "qingcailuobo-msg-cmt";
	
	public static final String SPCMT_DNT = "qingcailuo_donate_cmt";
	

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
		String id = getPara("id");
		boolean ok = getParaToBoolean("ok");
		Comment comment = Comment.dao.findById(id);
		if(comment == null) {
			// 渲染结果
			render(ResConsts.Code.FAILURE, "评论不存在");
			return;
		}
		int num = comment.getHateNum();
		// 取消赞
		if(ok) {
			comment.setHateNum(num - 1);
			if(comment.update()){
				// 渲染结果
				render(ResConsts.Code.SUCCESS, "取消踩成功");
			} else {
				render(ResConsts.Code.FAILURE, "取消踩失败");
			}
			return;
		}
		// 点赞
		comment.setHateNum(num + 1);
		if(comment.update()){
			// 渲染结果
			render(ResConsts.Code.SUCCESS, "踩成功");
		} else {
			render(ResConsts.Code.FAILURE, "踩失败");
		}
	}

	/**
	 * 发表评论
	 */
	public void report(){
		Comment comment = new Comment();
		String blogID = getPara("qingID");
		if(StrKit.isBlank(blogID)){
			render(ResConsts.Code.FAILURE, "评论所属ID不能为空");
			return;
		}
		String content = getPara("content");
		if(StrKit.isBlank(blogID)){
			render(ResConsts.Code.FAILURE, "评论内容不能为空");
			return;
		}
		String email = getPara("email");
		if(StrKit.isBlank(blogID)){
			render(ResConsts.Code.FAILURE, "邮箱不能为空");
			return;
		}
		String nickname = getPara("nickname");
		if(StrKit.isBlank(blogID)){
			render(ResConsts.Code.FAILURE, "昵称不能为空");
			return;
		}
		String parent = getPara("parent");
		
		comment.setContent(content);
		comment.setBlogID(blogID);
		comment.setEmail(email);
		comment.setNickname(nickname);
		comment.setId(KeyUtils.getUUID());
		comment.setLikeNum(0);
		comment.setHateNum(0);
		comment.setReplyNum(0);
		comment.setShareNum(0);
		comment.setParent(parent);
		
		int code = comment.getEmail().hashCode();
		code = Math.abs(code) % IConstants.HEAD_MOD;
		comment.setHeadURL(code +".gif");
		comment.setCdate(new Date(System.currentTimeMillis()));
		
		if(comment.save()) {
			if(!SPCMT_DNT.equals(blogID) && !SPCMT_MSG.equals(blogID)){
				Blog blog = Blog.findById(blogID,"id,commentNum");
				blog.setCommentNum(blog.getCommentNum() + 1);
				blog.update();
			}
			render(ResConsts.Code.SUCCESS,"发表成功");
		} else {
			render(ResConsts.Code.FAILURE,"发表失败");
		}
	}
}
