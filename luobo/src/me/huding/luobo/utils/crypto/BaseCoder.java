package me.huding.luobo.utils.crypto;

public abstract class BaseCoder {
	private static final char[] hexDigits = { '0', '1', '2', '3', '4', '5',
			'6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F' };

	public static String convert2HexStr(byte[] data) {
		int j = data.length;
		char[] str = new char[j * 2];
		int k = 0;
		for (int i = 0; i < j; i++) {
			byte byte0 = data[i];
			str[(k++)] = hexDigits[(byte0 >>> 4 & 0xF)];
			str[(k++)] = hexDigits[(byte0 & 0xF)];
		}
		return new String(str);
	}
}