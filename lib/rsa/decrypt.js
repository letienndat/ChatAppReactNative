// Hàm giải mã văn bản với khóa bí mật (d, n)
exports.decrypt = (encryptedText, d, n) => {
	let decrypted = "";
	let encryptedCodes = encryptedText.split("x");
	for (let i = 0; i < encryptedCodes.length; i++) {
		let encryptedCharCode = BigInt(encryptedCodes[i]);
		let decryptedCharCode =
			BigInt(encryptedCharCode) ** BigInt(d) % BigInt(n);
		decrypted += String.fromCharCode(Number(decryptedCharCode));
	}
	return decrypted;
}
