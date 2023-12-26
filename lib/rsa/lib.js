export default class RSA {
	p;
	q;
	phi;

	constructor() {
		this.p = this.getRandomPrime(5211, 5250);
		this.q = this.getRandomPrime(5251, 5300);
		this.phi = (this.p - 1) * (this.q - 1);
	}

	// Hàm tìm ước số chung lớn nhất (GCD)
	gcd(a, b) {
		if (b === 0) return a;
		return this.gcd(b, a % b);
	}

	// Hàm tìm số nguyên tố ngẫu nhiên
	getRandomPrime(min, max) {
		const primes = [];
		for (let i = min; i < max; i++) {
			let isPrime = true;
			for (let j = 2; j < i; j++) {
				if (i % j === 0) {
					isPrime = false;
					break;
				}
			}
			if (isPrime) primes.push(i);
		}
		return primes[Math.floor(Math.random() * primes.length)];
	}

	// Hàm tính nghịch đảo modulo
	modInverse(e, phi) {
		let d = 1;
		while ((e * d) % phi !== 1) {
			d++;
		}
		return d;
	}

	n() {
		return this.p * this.q;
	}

	e() {
		let e = 2;
		while (e < this.phi) {
			if (this.gcd(e, this.phi) === 1) break;
			e++;
		}

		return e;
	}

	d() {
		return this.modInverse(this.e(), this.phi);
	}

	publicKey() {
		return {
			e: this.e(),
			n: this.n(),
		};
	}

	privateKey() {
		return {
			d: this.d(),
			n: this.n(),
		};
	}

	// Hàm mã hóa văn bản với khóa công khai (e, n)
	encrypt(text, e, n) {
		let encrypted = [];
		for (let i = 0; i < text.length; i++) {
			let charCode = text.charCodeAt(i);
			let encryptedCharCode = BigInt(Math.pow(charCode, e)) % BigInt(n);
			encrypted.push(Number(encryptedCharCode));
		}
		return encrypted.join("x");
	}

	// Hàm giải mã văn bản với khóa bí mật (d, n)
	decrypt(encryptedText, d, n) {
		let decrypted = "";
		let encryptedCodes = encryptedText.split("x");

		function modPow(base, exponent, modulus) {
			if (modulus === 1n) return 0n;
			let result = 1n;
			base = base % modulus;
			while (exponent > 0n) {
				if (exponent % 2n === 1n) {
					result = (result * base) % modulus;
				}
				exponent = exponent >> 1n;
				base = (base * base) % modulus;
			}
			return result;
		}

		for (let i = 0; i < encryptedCodes.length; i++) {
			let encryptedCharCode = BigInt(encryptedCodes[i]);
			let decryptedCharCode = modPow(encryptedCharCode, BigInt(d), BigInt(n));
			decrypted += String.fromCharCode(Number(decryptedCharCode));
		}
		return decrypted;
	}
}
