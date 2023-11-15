const { encryptMessage } = require("./encrypt");
const { d, n, e } = require("./lib");

const decrypt = (c, d, n) => {
	let decrypted = 1;
	while (d > 0) {
		decrypted *= c;
		decrypted %= n;
		--d;
	}

	return decrypted;
};

const decryptText = (text, d, n) => {
	let arr = text.split("x");
	return arr
		.map((i) => String.fromCharCode(decrypt(parseInt(i), d, n)))
		.join("");
};

console.log(decryptText(encryptMessage("letiendat", e, n), d, n));
