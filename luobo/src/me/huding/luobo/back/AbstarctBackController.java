package me.huding.luobo.back;

import me.huding.luobo.BaseController;
import me.huding.luobo.IConstants;
import me.huding.luobo.Parameters;
import me.huding.luobo.ResConsts;

public abstract class AbstarctBackController extends BaseController {
	
	public void index(){
		Integer pageNum = getParaToInt(IConstants.PAGE_NUM);
		if(pageNum == null){
			pageNum = 1;
		}
		Integer pageSize = getParaToInt(IConstants.PAGE_SIZE);
		if(pageSize == null){
			pageSize = Parameters.DEFAULT_PAGE_SIZE;
		}
		this.doPage(pageNum, pageSize);
		
	}
	
	public abstract void doPage(int pageNum,int pageSize);
	
	public abstract void add();
	
	public void del(){
		if(doDel(getPara("id"))){
			render(ResConsts.Code.SUCCESS, "删除成功");
		} else {
			render(ResConsts.Code.FAILURE, "删除失败");
		}
	}
	
	
	protected abstract boolean doDel(String id);
	
	
	public abstract void edit();
	
	public void get(){
		String id = getPara("id");
		Object data = doGet(id);
		if(data == null){
			render(ResConsts.Code.FAILURE, "记录不存在");
		} else {
			render(ResConsts.Code.SUCCESS, "", data);
		}
	}
	
	protected abstract Object doGet(String id);
}
