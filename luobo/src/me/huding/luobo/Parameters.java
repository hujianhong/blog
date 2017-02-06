package me.huding.luobo;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

import com.jfinal.kit.PathKit;

/**
 * 相关的配置信息放在一个配置文件里，通过类Parameters来统一访问。
 * Parameters里通过java.util.Properties读取配置文件，然后通过
 * {@link #getParameter(String)}来获得配置信息。系统的各个全局
 * 变量也都放在这个类里面，静态共享。
 * 
 * @author JianhongHu
 * @version 1.0
 * @date 2016年10月30日
 */
public class Parameters {
	/**
	 *  配置文件根目录
	 */
	public static String CONFIG_PATH = PathKit.getRootClassPath()
			+ File.separator + "config.properties";

	/** 
	 * 浏览分页数据时每页大小
	 */
	public static final int  DEFAULT_PAGE_SIZE = 10;

	/**
	 * 博文静态化存储的根目录
	 * 
	 * 例如：/wwwroot/html/
	 * 
	 */
	public static String STATICS_ROOT_PATH = getParameter("STATICS_ROOT_PATH",
			"/wwwroot/html");
	/**
	 * 博文存储目录，例如： articles
	 * 
	 * 和{@link #STATICS_ROOT_PATH}拼接生成博文最终存储目录
	 * 
	 */
//	public static String ARTICLES_PATH = "articles";
	
	public static String ARTICLES_PATH = "";
	
	/**
	 * 博文静态化存储的最终目录
	 * 
	 * 即：{@link #STATICS_ROOT_PATH} + {@link #ARTICLES_PATH} 
	 */
//	public static String STATICS_FINAL_PATH = STATICS_ROOT_PATH + File.separator + ARTICLES_PATH;
	
	public static String STATICS_FINAL_PATH = STATICS_ROOT_PATH;
	

	public static String DB_USERNAME = getParameter("DB_USERNAME", "root");
	public static String DB_PASSWORD = getParameter("DB_PASSWORD", "root");
	public static String DB_URL = getParameter("DB_URL", "root");

	private Parameters() {
		
	}

	public static Properties pro;

	/**
	 * get Object Propeties
	 * 
	 * @return
	 */
	public static Properties getPro() {
		InputStream inputStream = null;
		try {
			inputStream = new FileInputStream(new File(Parameters.CONFIG_PATH));
		} catch (FileNotFoundException e1) {
			e1.printStackTrace();
		}
		pro = new Properties();
		try {
			pro.load(inputStream);
		} catch (IOException e) {
			System.out.println("read config file error.");
			e.printStackTrace();
		}
		return pro;
	}

	/**
	 * get Parameter value by parameter name
	 * 
	 * @param parameterName
	 * @return
	 */
	public static String getParameter(String parameterName) {
		if (null == pro)
			Parameters.getPro();
		return pro.getProperty(parameterName);
	}

	/**
	 * get Parameter value by parameter name,if not configured return
	 * defaultValue
	 * 
	 * @param parameterName
	 * @param defaultValue
	 * @return
	 */
	public static String getParameter(String parameterName, String defaultValue) {
		if (null == pro)
			Parameters.getPro();
		return pro.getProperty(parameterName, defaultValue);
	}

	public static int getParameter(String parameterName, int defaultValue) {
		if (null == pro)
			Parameters.getPro();
		return Integer.parseInt(pro.getProperty(parameterName,
				String.valueOf(defaultValue)).trim());
	}
}
