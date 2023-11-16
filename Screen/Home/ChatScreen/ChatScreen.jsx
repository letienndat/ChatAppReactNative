import {
	KeyboardAvoidingView,
	Platform,
	SafeAreaView,
	StyleSheet,
} from "react-native";
import HeaderChat from "./HeaderChat";
import BodyChat from "./BodyChat";
import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { load } from "../../../lib/async_storage/async_storage";
import { encode } from "base-64";
import axios from "../../../lib/axios/axios-config";
import { useAuth } from "../../../AuthContext";

const ChatScreen = () => {
	const route = useRoute();
	const [data, setData] = useState(undefined);
	const { setIsLogin } = useAuth();

	const sendRequest = async (point) => {
		const u = await load("u");
		const p = await load("p");

		return axios.get(`${point}/${route.params.idRoom}`, {
			headers: {
				Authorization: `Basic ${encode(`${u}:${p}`)}`,
			},
		});
	};

	useEffect(() => {
		const response = sendRequest("/api/room/show");

		response
			.then((res) => {
				if (res.status === 200) {
					setData(res.data.valueMessage);
				} else if (res.status !== 200) {
					console.log("Có lỗi khi truy cập tới hệ thống!");
				}
			})
			.catch((err) => {
				console.log(err);
				setIsLogin(!1);
			});
	}, []);

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
		>
			<SafeAreaView style={styles.container}>
				<HeaderChat data={data?.users} />
				<BodyChat data={data} />
			</SafeAreaView>
		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	container: {
		height: "100%",
		width: "100%",
		flexDirection: "column",
		paddingTop: Platform.OS === "android" ? 25 : 0,
	},
});

export default ChatScreen;
