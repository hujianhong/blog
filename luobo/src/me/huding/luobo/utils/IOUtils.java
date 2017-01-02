package me.huding.luobo.utils;

import java.io.Closeable;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

/**
 * IOUtils
 * @author L.cm
 */
public abstract class IOUtils {
	private static final int DEFAULT_BUFFER_SIZE = 1024 * 4;
	
	/**
	 * closeQuietly
	 * @param closeable
	 */
	public static void closeQuietly(Closeable closeable) {
		try {
			if (closeable != null) {
				closeable.close();
			}
		} catch (IOException ioe) {
			// ignore
		}
	}
	
	/**
	 * InputStream to String
	 * 
	 * @param input  the <code>InputStream</code> to read from
	 * @return the requested String
	 * @throws NullPointerException if the input is null
	 * @throws IOException if an I/O error occurs
	 */
	public static String toString(InputStream input) throws IOException {
		StringBuffer out = new StringBuffer();
		byte[] b = new byte[DEFAULT_BUFFER_SIZE];
		for (int n; (n = input.read(b)) != -1;) {
			out.append(new String(b, 0, n));
		}
		IOUtils.closeQuietly(input);
		return out.toString();
	}
	
	/**
	 * InputStream to File
	 * @param input  the <code>InputStream</code> to read from
	 * @param file the File to write
	 * @throws IOException
	 */
	public static void toFile(InputStream input, File file) throws IOException {
		OutputStream os = new FileOutputStream(file);
		int bytesRead = 0;
		byte[] buffer = new byte[DEFAULT_BUFFER_SIZE];
		while ((bytesRead = input.read(buffer, 0, DEFAULT_BUFFER_SIZE)) != -1) {
			os.write(buffer, 0, bytesRead);
		}
		IOUtils.closeQuietly(os);
		IOUtils.closeQuietly(input);
	}
}
