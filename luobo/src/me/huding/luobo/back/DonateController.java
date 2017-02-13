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
package me.huding.luobo.back;

import com.jfinal.plugin.activerecord.Page;

import me.huding.luobo.ResConsts;
import me.huding.luobo.model.Comment;
import me.huding.luobo.utils.DateUtils;
import me.huding.luobo.utils.KeyUtils;

/**
 *
 *
 * @author JianhongHu
 * @version 1.0
 * @date 2017年2月9日
 */
public class DonateController extends AbstarctBackController {
	
	public static final String DONATE_BLOGID = "qingcailuo_donate_cmt";
	
	
	public static final String EMAIL = "1043244432@qq.com";
	
	@Override
	public void add(){
		String content = getPara("content");
		String nickname = getPara("nikename");
		if(nickname == null){
			nickname = "胡建洪";
		}
		Comment comment = new Comment();
		comment.setEmail(EMAIL);
		comment.setHeadURL("author.jpg");
		comment.setBlogID(DONATE_BLOGID);
		comment.setCdate(DateUtils.getCurrentDate());
		comment.setContent(content);
		comment.setNickname(nickname);
		comment.setId(KeyUtils.getUUID());
		comment.setLikeNum(0);
		comment.setHateNum(0);
		comment.setReplyNum(0);
		comment.setShareNum(0);
		if(comment.save()) {
			render(ResConsts.Code.SUCCESS,"发表成功");
		} else {
			render(ResConsts.Code.FAILURE,"发表失败");
		}
	}


	/* (non-Javadoc)
	 * @see me.huding.luobo.back.AbstarctBackController#doPage(int, int)
	 */
	@Override
	public void doPage(int pageNum, int pageSize) {
		String blogID = getPara("id");
		// 查询数据
		Page<Comment> data = Comment.findByBlogID(pageNum, pageSize, blogID);
		// 渲染结果
		render(ResConsts.Code.SUCCESS, null, data);
	}


	@Override
	protected boolean doDel(String id) {
		return Comment.dao.deleteById(id);
	}

	@Override
	protected Object doGet(String id) {
		return Comment.dao.findById(id);
	}


	/* (non-Javadoc)
	 * @see me.huding.luobo.back.AbstarctBackController#edit()
	 */
	@Override
	public void edit() {
		Comment comment = getModel(Comment.class,"donate");
		if(comment.update()){
			render(ResConsts.Code.SUCCESS,"保存成功");
		} else {
			render(ResConsts.Code.FAILURE,"保存失败");
		}
		
	}

}
