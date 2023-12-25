import { faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const HeaderHomeChat = ({ name }) => {
	const nav = useNavigation();

	const handlePressSetting = () => {
		nav.navigate("Cài đặt");
	};

	return (
		<View style={styles.container}>
			<Text style={styles.name}>{name}</Text>
			<TouchableOpacity onPress={handlePressSetting}>
				<FontAwesomeIcon size={20} style={styles.setting} icon={faGear} />
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: 10,
		marginBottom: 13,
		paddingLeft: 15,
		paddingRight: 15,
	},
	name: {
		flexGrow: 1,
		fontSize: 24,
		fontWeight: "bold",
	},
	setting: {
		// fontSize: 24
	},
});

export default HeaderHomeChat;
