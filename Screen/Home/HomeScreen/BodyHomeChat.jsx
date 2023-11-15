import { StyleSheet } from "react-native";
import ListChat from "../Component/ListChat";
import { ScrollView } from "react-native-virtualized-view";
import Search from "./Search";

const BodyHomeChat = ({ existsValue, data, type }) => {
	return (
		<ScrollView style={styles.container}>
			<Search />
			<ListChat
				title="Tin nhắn"
				existsValue={existsValue}
				data={data}
				type={type}
			/>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "column",
		paddingLeft: 15,
		paddingRight: 15,
	},
});

export default BodyHomeChat;
