const encrypt = (m, e, n) => {
	let encrypted_text = 1;
	while (e > 0) {
		encrypted_text *= m;
		encrypted_text %= n;
		--e;
	}

	return encrypted_text;
};

exports.encryptMessage = (message, e, n) => {
	return message
		.split("")
		.map((i) => encrypt(i.charCodeAt(i), e, n))
		.join("x");
};

// const text_plant = "letiendat";
// console.log(this.encryptMessage(text_plant, e, n));
