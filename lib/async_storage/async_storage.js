import AsyncStorage from "@react-native-async-storage/async-storage";

const save = async (key, value) => {
	try {
		await AsyncStorage.setItem(key, value);
	} catch (error) {
		console.error("Có lỗi khi lưu vào AsyncStorage:", error);
	}
};

const load = async (key) => {
	try {
		const data = await AsyncStorage.getItem(key);
		if (data !== null) {
			return data;
		}
	} catch (error) {
		console.error("Có lỗi khi đọc từ AsyncStorage:", error);
	}

	return undefined;
};

const remove = async (key) => {
	try {
		await AsyncStorage.removeItem(key);
	} catch (error) {
		console.error("Có lỗi khi giao tiếp với AsyncStorage:", error);
	}
};

const clear = async (key) => {
	try {
		await AsyncStorage.clear();
	} catch (error) {
		console.error("Có lỗi khi giao tiếp với AsyncStorage:", error);
	}
};

export { save, load, remove, clear };
