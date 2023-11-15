const isPrime = (n) => {
	for (let i = 2; i <= Math.sqrt(n); ++i) {
		if (n % i === 0) return false;
	}
	return n > 1;
};

const gererateListPrime = () => {
	let number = new Set();

	for (let i = 330; i <= 420; ++i) {
		if (isPrime(i) && !number.has(i)) {
			number.add(i);
		}
	}

	return number;
};

const randomPrime = () => {
	let numbers = gererateListPrime();
	let res = [];

	for (let i1 = 0; i1 < 2; ++i1) {
		let i = Math.floor(Math.random() * numbers.size);
		let e = numbers.values();

		while (--i >= 0) {
			e.next();
		}
		res.push(e.next().value);
	}

	return {
		p: res[0],
		q: res[1],
	};
};

const gcd = (n1, n2) => {
	for (let i = Math.min(n1, n2); i > 1; --i) {
		if (n1 % i === 0 && n2 % i === 0) {
			return false;
		}
	}

	return true;
};

const find_e = () => {
	for (let i = 2; i < this.n; ++i) {
		if (gcd(i, phi_n)) return i;
	}
};

const find_d = () => {
	for (let i = 2; ; ++i) {
		if ((i * this.e) % phi_n === 1) {
			return i;
		}
	}
};

const { p, q } = randomPrime();
const phi_n = (p - 1) * (q - 1);
exports.n = p * q;
exports.e = find_e();
exports.d = find_d();
