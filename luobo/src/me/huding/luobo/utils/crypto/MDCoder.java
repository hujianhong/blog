package me.huding.luobo.utils.crypto;

import java.security.MessageDigest;

public abstract class MDCoder extends BaseCoder {
	private static final String MD5 = "MD5";

	public static byte[] encodeMD5(byte[] data) {
		try {
			MessageDigest md = MessageDigest.getInstance(MD5);
			return md.digest(data);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	public static byte[] encodeMD5(String data) {
		try {
			return encodeMD5(data.getBytes());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	public static String encodeMD5Hex(String data) {
		try {
			return convert2HexStr(encodeMD5(data));
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
}