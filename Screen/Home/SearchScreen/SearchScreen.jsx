import {
	KeyboardAvoidingView,
	Platform,
	SafeAreaView,
	StyleSheet,
	TouchableWithoutFeedback,
} from "react-native";
import TextInputSearch from "./TextInputSearch";
import { ScrollView } from "react-native-virtualized-view";
import ListChat from "../Component/ListChat";
import { useEffect, useState } from "react";
import { encode } from "base-64";
import { load } from "../../../lib/async_storage/async_storage";
import axios from "../../../lib/axios/axios-config";
import { useAuth } from "../../../AuthContext";

const ScreenSearch = () => {
	const [valueSearch, setValueSearch] = useState("");
	const [data, setData] = useState([]);
	const [existsValue, setExistsValue] = useState(!1);
	const { setIsLogin } = useAuth();

	const sendRequest = async (point) => {
		const u = await load("u");
		const p = await load("p");

		return axios.get(point, {
			headers: {
				Authorization: `Basic ${encode(`${u}:${p}`)}`,
			},
		});
	};

	useEffect(() => {
		if (valueSearch.trim() !== "") {
			const response = sendRequest(
				`/api/home/search?keyword=${valueSearch}`
			);

			response
				.then((res) => {
					if (res.status === 200) {
						setData(res.data.valueMessage);
						if (res.data.valueMessage.length === 0) {
							setExistsValue(!0);
						} else {
							setExistsValue(!1);
						}
					} else if (res.status !== 200) {
						console.log("Có lỗi khi truy cập tới hệ thống!");
					}
				})
				.catch((err) => {
					setIsLogin(!1);
				});
		} else {
			setData([]);
			setExistsValue(!1);
		}
	}, [valueSearch]);

	return (
		<TouchableWithoutFeedback>
			<SafeAreaView style={styles.androidSafeViewArea}>
				<KeyboardAvoidingView
					behavior={Platform.OS === "ios" ? "padding" : "height"}
					style={styles.container}
				>
					<TextInputSearch
						valueSearch={valueSearch}
						setValueSearch={setValueSearch}
					/>
					<ScrollView style={styles.listUsers}>
						<ListChat
							title="Kết quả"
							existsValue={existsValue}
							data={data}
							type="s"
						/>
					</ScrollView>
				</KeyboardAvoidingView>
			</SafeAreaView>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	container: {
		width: "100%",
		height: "100%",
	},
	androidSafeViewArea: {
		paddingTop: Platform.OS === "android" ? 25 : 0,
	},
	listUsers: {
		paddingLeft: 15,
		paddingRight: 15,
	},
});

export default ScreenSearch;
