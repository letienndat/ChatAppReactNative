import {
	faCircleXmark,
	faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useRef, useState } from "react";
import {
	Dimensions,
	InteractionManager,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
} from "react-native";

const TextInputSearch = (props) => {
	const nav = useNavigation();
	const screenWidth = Dimensions.get("window").width;
	const [isChangeInput, setIsChangeInput] = useState(!1);
	const inputRef = useRef();

	const handleChangTextInput = (text) => {
		props.setValueSearch(text);
		if (text !== "") {
			setIsChangeInput(!0);
		} else {
			setIsChangeInput(!1);
		}
	};

	const handleClearInputSearch = () => {
		props.setValueSearch("");
		setIsChangeInput(!1);
	};

	const handleCancelSearch = () => {
		props.setValueSearch("");
		setIsChangeInput(!1);

		nav.navigate("Trang chủ");
	};

	useFocusEffect(
		useCallback(() => {
			InteractionManager.runAfterInteractions(() => {
				inputRef.current?.focus();
			});
		}, [])
	);

	return (
		<TouchableWithoutFeedback>
			<View
				style={[styles.container, { width: screenWidth - (15 + 15) }]}
			>
				<View style={styles.boxInputSearch}>
					<FontAwesomeIcon
						style={styles.iconSearch}
						size={15}
						color="#333"
						icon={faMagnifyingGlass}
					/>
					<TextInput
						ref={inputRef}
						style={styles.textInputSearch}
						placeholder="Tìm kiếm"
						placeholderTextColor={"#333"}
						value={props.valueSearch}
						onChangeText={handleChangTextInput}
					/>
					{isChangeInput && (
						<TouchableOpacity
							style={styles.iconClear}
							onPress={handleClearInputSearch}
						>
							<FontAwesomeIcon
								size={15}
								color="#7D7C7C"
								icon={faCircleXmark}
							/>
						</TouchableOpacity>
					)}
				</View>
				<TouchableOpacity
					style={styles.cancel}
					onPress={handleCancelSearch}
				>
					<Text>Hủy</Text>
				</TouchableOpacity>
			</View>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		paddingBottom: 5,
		marginLeft: 15,
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
		height: 30,
		fontSize: 15,
	},
	iconClear: {
		position: "absolute",
		right: 0,
		width: 30,
		height: "100%",
		justifyContent: "center",
		alignItems: "center",
	},
	cancel: {
		alignItems: "center",
		justifyContent: "center",
		paddingLeft: 10,
	},
});

export default TextInputSearch;
