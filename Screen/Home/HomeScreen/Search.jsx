import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";
import {
	Dimensions,
	StyleSheet,
	Text,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
} from "react-native";

const Search = () => {
	const nav = useNavigation();
	const screenWidth = Dimensions.get("window").width;

	const handlePressSearch = () => {
		nav.navigate("Tìm kiếm");
	};

	return (
		<TouchableWithoutFeedback>
			<TouchableOpacity
				onPress={handlePressSearch}
				style={[styles.container, { width: screenWidth - (15 + 15) }]}
			>
				<View style={styles.boxInputSearch}>
					<FontAwesomeIcon
						style={styles.iconSearch}
						size={15}
						color="#333"
						icon={faMagnifyingGlass}
					/>
					<Text style={styles.textInputSearch}>Tìm kiếm</Text>
				</View>
			</TouchableOpacity>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
	},
	boxInputSearch: {
		width: 200,
		flexDirection: "row",
		gap: 10,
		alignItems: "center",
		borderRadius: 10,
		height: 35,
		backgroundColor: "#EEEEEE",
		flexGrow: 1,
	},
	iconSearch: {
		position: "absolute",
		left: 12,
	},
	textInputSearch: {
		paddingLeft: 35,
		paddingRight: 30,
		width: "100%",
		fontSize: 15,
		color: "#333",
	},
});

export default Search;
