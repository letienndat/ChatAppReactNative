import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { getCharFromName } from "../../../lib/lib";
import { load } from "../../../lib/async_storage/async_storage";
import { useEffect, useState } from "react";

const HeaderChat = ({ data }) => {
	const nav = useNavigation();
	const [user, setUser] = useState({
		name: "",
	});

	const handleBackToHome = () => {
		nav.navigate("Trang chủ");
	};

	const getUserOther = async (data) => {
		if (data) {
			const u = await load("u");
			return data.find((user) => user.username !== u);
		}
		return {
			name: "",
		};
	};

	useEffect(() => {
		getUserOther(data)
			.then((res) => {
				setUser(res);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [data]);

	return (
		<View style={styles.container}>
			<TouchableOpacity onPress={handleBackToHome}>
				<FontAwesomeIcon size={22} icon={faAngleLeft} />
			</TouchableOpacity>
			<View style={styles.headerRight}>
				<View style={styles.avatar}>
					<Text style={styles.innerAvatar}>
						{getCharFromName(user.name)}
					</Text>
				</View>
				<View style={styles.nameAndStatus}>
					<Text style={styles.name}>{user.name}</Text>
					<Text style={styles.status}>Hoạt động bây giờ</Text>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#fff",
		height: 60,
		borderBottomWidth: 1,
		borderBottomColor: "#EBF3E8",
		flexDirection: "row",
		alignItems: "center",
		paddingLeft: 15,
		paddingRight: 15,
		gap: 16,
	},
	headerRight: {
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
	},
	avatar: {
		width: 40,
		height: 40,
		borderRadius: "50%",
		backgroundColor: "#333",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	},
	innerAvatar: {
		fontSize: 22,
		fontWeight: "400",
		color: "#fff",
	},
	nameAndStatus: {
		flexDirection: "column",
	},
	name: {
		fontSize: 17,
		fontWeight: "500",
		lineHeight: 20,
		color: "#000",
	},
	status: {
		fontSize: 13,
		fontWeight: "400",
		lineHeight: 16,
		color: "#7D7C7C",
	},
});

export default HeaderChat;
