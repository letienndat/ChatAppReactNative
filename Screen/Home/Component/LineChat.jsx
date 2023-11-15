import { StyleSheet, Text, View } from "react-native";

const LineChat = ({ item }) => {
	return (
		<View
			style={[
				styles.container,
				{ justifyContent: item.isMe ? "flex-end" : "flex-start" },
			]}
		>
			<View
				style={[
					styles.lineChat,
					item.isMe ? styles.lineChatMe : styles.lineChatOther,
				]}
			>
				<Text style={styles.value}>{item.value}</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		paddingLeft: 15,
		paddingRight: 15,
		marginBottom: 5,
	},
	lineChat: {
		paddingTop: 11,
		paddingLeft: 13,
		paddingBottom: 11,
		paddingRight: 13,
		borderRadius: "20%",
	},
	lineChatMe: {
		backgroundColor: "#F1EFEF",
	},
	lineChatOther: {
		borderWidth: 1,
		borderColor: "#F1EFEF",
	},
	value: {
		fontSize: 15,
		fontWeight: "400",
		lineHeight: 20,
		color: "#000",
	},
});

export default LineChat;
