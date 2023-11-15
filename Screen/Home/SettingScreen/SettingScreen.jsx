import {
	SafeAreaView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { useAuth } from "../../../AuthContext";
import axios from "../../../lib/axios/axios-config";
import { useEffect, useState } from "react";
import { clear, load } from "../../../lib/async_storage/async_storage";
import { encode } from "base-64";
import Spinner from "react-native-loading-spinner-overlay";
import { getCharFromName } from "../../../lib/lib";

const SettingScreen = () => {
	const { setIsLogin } = useAuth();
	const [data, setData] = useState(undefined);
	const [loading, setLoading] = useState(!0);

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
		const response = sendRequest("/api/home/show-setting");

		response
			.then((res) => {
				if (res.status === 200) {
					setData(res.data.valueMessage);
					setLoading(!1);
				} else if (res.status !== 200) {
					console.log("Có lỗi khi truy cập tới hệ thống!");
				}
			})
			.catch(async (err) => {
				setIsLogin(!1)
				await clear()
			});
	}, []);

	const handleSignOut = async () => {
		setIsLogin(!1);
		await clear()
	};

	return (
		<SafeAreaView>
			<View style={styles.container}>
				<Spinner
					visible={loading}
					textContent={"Đang tải..."}
					textStyle={{
						color: "#FFF",
						fontSize: 18,
						fontWeight: "400",
					}}
				/>
				{!loading && (
					<>
						<View style={styles.profile}>
							<View style={styles.avatar}>
								<Text style={styles.innerAvatar}>
									{getCharFromName(data.name)}
								</Text>
							</View>
							<Text
								style={styles.username}
							>{`@${data.username}`}</Text>
							<Text style={styles.name}>{data.name}</Text>
						</View>
						<View style={styles.options}>
							<TouchableOpacity
								style={styles.option}
								onPress={handleSignOut}
							>
								<Text style={styles.valueOption}>
									Đăng xuất
								</Text>
							</TouchableOpacity>
						</View>
					</>
				)}
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "column",
		width: "100%",
		height: "100%",
		paddingLeft: 15,
		paddingRight: 15,
	},
	profile: {
		flexDirection: "column",
		alignItems: "center",
		paddingTop: 60,
		gap: 10,
		flexGrow: 1,
	},
	avatar: {
		width: 100,
		height: 100,
		borderRadius: "50%",
		backgroundColor: "#8EACCD",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	innerAvatar: {
		fontSize: 50,
		fontWeight: "500",
		color: "#fff",
	},
	username: {
		fontSize: 16,
		color: "#7D7C7C",
	},
	name: {
		fontSize: 25,
		fontWeight: "600",
		color: "#1F1717",
	},
	options: {
		flexDirection: "column",
		alignItems: "center",
	},
	option: {
		width: 100,
		marginTop: 60,
		marginBottom: 60,
		flexDirection: "column",
		alignItems: "center",
		gap: 20,
		paddingTop: 10,
		paddingBottom: 10,
	},
	valueOption: {
		fontSize: 16,
		fontWeight: "400",
		color: "#1F1717",
	},
});

export default SettingScreen;
