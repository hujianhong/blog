package me.huding.luobo.back;

import me.huding.luobo.BaseController;
import me.huding.luobo.IConstants;
import me.huding.luobo.Parameters;

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
	
	public abstract void del();
	
	public abstract void edit();
}
