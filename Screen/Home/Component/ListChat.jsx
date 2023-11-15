import { FlatList, StyleSheet, Text, View } from "react-native";
import ItemChat from "./ItemChat";

const ListChat = ({ title, data, type, existsValue }) => {
	return (
		<View style={styles.container}>
			<View style={styles.viewTitle}>
				<Text style={styles.title}>{title}</Text>
			</View>
			<FlatList
				style={styles.listItem}
				data={data}
				renderItem={({ item }) => <ItemChat data={item} type={type} />}
			/>
			{existsValue && (
				<View style={styles.notifySearch}>
					<Text>{`${
						type === "h"
							? "Chưa có tin nhắn nào!"
							: type === "s"
							? "Không tồn tại kết quả"
							: "Không có kết quả"
					}`}</Text>
				</View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "column",
		paddingBottom: 10,
	},
	viewTitle: {
		marginTop: 15,
		flexDirection: "row",
	},
	title: {
		fontSize: 16,
		fontWeight: "600",
	},
	listItem: {
		marginTop: 20,
		gap: 15,
	},
	notifySearch: {
		alignItems: "center",
	},
});

export default ListChat;
