const getCharFromName = (name) => {
	if (name === undefined) return "";
	const names = name.split(/\s+/);
	return names[names.length - 1].charAt(0);
};

export { getCharFromName };
