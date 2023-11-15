import { SafeAreaView, StyleSheet, View } from "react-native";
import HeaderHomeChat from "./HeaderHomeChat";
import BodyHomeChat from "./BodyHomeChat";
import { useEffect, useState } from "react";
import axios from "../../../lib/axios/axios-config";
import { load } from "../../../lib/async_storage/async_storage";
import { encode } from "base-64";
import Spinner from "react-native-loading-spinner-overlay";
import { useAuth } from "../../../AuthContext";

const HomeScreen = () => {
	const [data, setData] = useState(undefined);
	const [loading, setLoading] = useState(!0);
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
		const response = sendRequest("/api/home/load");

		response
			.then((res) => {
				if (res.status === 200) {
					setData(res.data.valueMessage);
					if (res.data.valueMessage.formRoomHomes.length === 0) {
						setExistsValue(!0);
					} else {
						setExistsValue(!1);
					}
					setLoading(!1);
				} else if (res.status !== 200) {
					setNotifyForm("Có lỗi khi truy cập tới hệ thống!");
				}
			})
			.catch((err) => {
				setIsLogin(!1);
			});
	}, []);

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
						<HeaderHomeChat name={data.name} />
						<BodyHomeChat
							existsValue={existsValue}
							data={data.formRoomHomes}
							type="h"
						/>
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
		backgroundColor: "#fff",
	},
});

export default HomeScreen;
