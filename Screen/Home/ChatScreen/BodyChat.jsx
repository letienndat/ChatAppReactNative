import { useEffect, useState } from "react";
import InputMessage from "./InputMessage";
import ListMessage from "./ListMessage";
import { StyleSheet, View } from "react-native";
import { load } from "../../../lib/async_storage/async_storage";

const BodyChat = ({ data }) => {
	const [messages, setMessages] = useState([]);
	const [id, setId] = useState();

	const cv = (list) => {
		return list.map((e) => ({
			isMe: id === `${e.idUserCreated}`,
			value: e.value,
		}));
	};

	useEffect(() => {
		load("i")
			.then((res) => {
				setId(res);
			})
			.catch((err) => {
				console.log(err);
			});
		if (data) {
			if (data.lineChats !== null) {
				setMessages(cv(data.lineChats));
			}
		}
	}, [data, id]);

	return (
		<View style={styles.container}>
			<ListMessage messages={messages} id={id} />
			<InputMessage data={data} setMessages={setMessages} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
		paddingBottom: 10,
	},
});

export default BodyChat;
