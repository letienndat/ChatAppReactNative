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
import { load, save } from "../../../lib/async_storage/async_storage";
import { encode } from "base-64";
import axios from "../../../lib/axios/axios-config";
import { useAuth } from "../../../AuthContext";
import RSA from "../../../lib/rsa/lib";

const ChatScreen = () => {
	const route = useRoute();
	const [data, setData] = useState(undefined);
	const { setIsLogin } = useAuth();
	const rsa = new RSA();

	const savePublicKey = async (point) => {
		save("r_id", route.params.idRoom.toString());

		const u = await load("u");
		const p = await load("p");

		const publicKey = rsa.publicKey();
		const privateKey = rsa.privateKey();

		save("pk", `${privateKey.d}x${privateKey.n}`);

		console.log(`Lưu Private Key thành công: ${privateKey.d}x${privateKey.n}`);

		return axios.post(
			`${point}`,
			{
				idRoom: route.params.idRoom,
				publicKey: `${publicKey.e}x${publicKey.n}`,
			},
			{
				headers: {
					Authorization: `Basic ${encode(`${u}:${p}`)}`,
				},
			}
		);
	};

	useEffect(() => {
		const response = savePublicKey("/api/public-key/save");

		response
			.then((res) => {
				if (res.status === 200) {
					console.log("Lưu key thành công:", res.data.valueMessage);
				} else if (res.status !== 200) {
					console.log("Có lỗi khi truy cập tới hệ thống!");
				}
			})
			.catch((err) => {
				console.log(err);
				setIsLogin(!1);
			});
	}, []);

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
