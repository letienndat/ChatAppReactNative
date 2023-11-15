import { FlatList, StyleSheet, View } from "react-native";
import LineChat from "../Component/LineChat";

const ListMessage = ({ messages, id }) => {
	return (
		<View style={styles.container}>
			<FlatList
				inverted={true}
				style={styles.listLineChat}
				data={messages.filter(() => !0).reverse()}
				renderItem={({ item }) => <LineChat item={item} id={id} />}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginBottom: 10,
	},
	listLineChat: {
		flexDirection: "column",
	},
});

export default ListMessage;
