// Hàm mã hóa văn bản với khóa công khai (e, n)
exports.encrypt = (text, e, n) => {
	let encrypted = [];
	for (let i = 0; i < text.length; i++) {
		let charCode = text.charCodeAt(i);
		let encryptedCharCode = BigInt(Math.pow(charCode, e)) % BigInt(n);
		encrypted.push(Number(encryptedCharCode));
	}
	return encrypted.join("x");
};
