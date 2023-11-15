import { useNavigation } from "@react-navigation/native";
import {
	Dimensions,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { getCharFromName } from "../../../lib/lib";
import { useAuth } from "../../../AuthContext";
import { load } from "../../../lib/async_storage/async_storage";
import axios from "../../../lib/axios/axios-config";
import { encode } from "base-64";

const ItemChat = ({ data, type }) => {
	const screenWidth = Dimensions.get("window").width;
	const nav = useNavigation();
	const { setIsLogin } = useAuth();

	const sendRequest = async (point) => {
		const u = await load("u");
		const p = await load("p");

		return axios.get(`${point}/${data.id}`, {
			headers: {
				Authorization: `Basic ${encode(`${u}:${p}`)}`,
			},
		});
	};

	const handleClickItemChat = () => {
		if (type === "s") {
			const response = sendRequest("/api/room/from-search");

			response
				.then((res) => {
					if (res.status === 200) {
						nav.replace("Trang chủ");
						nav.navigate("Chat", {
							idRoom: res.data.valueMessage.id,
						});
					} else if (res.status !== 200) {
						console.log("Có lỗi khi truy cập tới hệ thống!");
					}
				})
				.catch((err) => {
					console.log(err);
					setIsLogin(!1);
				});
		} else if (type === "h") {
			nav.navigate("Chat", {
				idRoom: data.id,
			});
		}
	};

	return (
		<TouchableOpacity
			style={styles.container}
			onPress={handleClickItemChat}
		>
			<View style={styles.avatar}>
				<Text style={styles.innerAvatar}>
					{getCharFromName(data.name)}
				</Text>
			</View>
			<View style={styles.content}>
				<Text
					numberOfLines={1}
					ellipsizeMode="tail"
					style={[
						styles.name,
						{ maxWidth: screenWidth - (60 + 15 + 15 + 15 + 5) },
					]}
				>
					{data.name}
				</Text>
				<Text
					numberOfLines={1}
					ellipsizeMode="tail"
					style={[
						styles.option,
						{ maxWidth: screenWidth - (60 + 15 + 15 + 15 + 5) },
					]}
				>
					Nhấn để trò chuyện
				</Text>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		gap: 15,
		height: 60,
	},
	avatar: {
		backgroundColor: "#8EACCD",
		width: 60,
		height: 60,
		borderRadius: "50%",
		alignItems: "center",
		justifyContent: "center",
	},
	innerAvatar: {
		color: "#fff",
		fontSize: 30,
	},
	content: {
		flexDirection: "column",
		justifyContent: "center",
		gap: 3,
	},
	name: {
		fontSize: 14,
		fontWeight: "400",
		color: "#000",
	},
	option: {
		fontSize: 14,
		color: "#7D7C7C",
	},
});

export default ItemChat;
