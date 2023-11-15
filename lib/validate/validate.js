const Validate = (obj) => {
	let res = {
		status: !0,
		elements: [],
	};
	obj.roles.forEach((role) => {
		if (!role.status) {
			res.status = !1;
		}
		res.elements.push(role);
	});

	return res;
};

const isRequired = (element) => {
	const res = {
		element,
		message: "Không được bỏ trống",
	};
	if (element.value) {
		res.status = /^.+$/.test(element.value.trim());
	} else {
		res.status = !1;
	}

	return res;
};

const isName = (element) => {
	const res = {
		element,
		message: "Yêu cầu chỉ chứa chữ cái",
	};
	if (element.value) {
		res.status = /^[a-zA-ZÀ-ỹ ]+$/.test(element.value.trim());
	} else {
		res.status = !1;
	}

	return res;
};

const isUsername = (element) => {
	const res = {
		element,
		message: "Yêu cầu a-z, A-Z, 0-9",
	};
	if (element.value) {
		res.status = /^[a-zA-Z0-9_]+$/.test(element.value.trim());
	} else {
		res.status = !1;
	}

	return res;
};

const isEmail = (element) => {
	const res = {
		element,
		message: "Yêu cầu đúng định dạng email (example@email.com)",
	};
	if (element.value) {
		res.status = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
			element.value.trim()
		);
	} else {
		res.status = !1;
	}

	return res;
};

const isPassword = (element) => {
	const res = {
		element,
		message: "Yêu cầu lớn hơn 7 ký tự, chứa chữ hoa, thường, số và ký tự",
	};
	if (element.value) {
		res.status = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/.test(
			element.value.trim()
		);
	} else {
		res.status = !1;
	}

	return res;
};

const isConfirmPassword = (element1, element2) => {
	const res = {
		element: element2,
		message: "Không được bỏ trống và phải trùng với mật khẩu",
	};
	if (element2.value && element1.value) {
		res.status =
			isRequired(element2).status && element1.value === element2.value;
	} else {
		res.status = !1;
	}

	return res;
};

export {
	isRequired,
	isName,
	isUsername,
	isEmail,
	isPassword,
	isConfirmPassword,
};
export default Validate;
