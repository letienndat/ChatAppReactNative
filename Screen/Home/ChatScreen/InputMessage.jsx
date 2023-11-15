import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useEffect, useState } from "react";
import { API_URL } from "@env";
import {
	Dimensions,
	StyleSheet,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { encode } from "base-64";
import { load } from "../../../lib/async_storage/async_storage";
import { TextEncoder, TextDecoder } from "text-encoding";
const StompJs = require("@stomp/stompjs");

const InputMessage = ({ setMessages, data }) => {
	const screenWidth = Dimensions.get("window").width;

	const [message, setMessage] = useState("");
	const [existsValueMessage, setExistsValueMessage] = useState(!1);
	const [connection, setConnection] = useState(null);
	const [u, setU] = useState("");
	const [p, setP] = useState("");
	const [i, setI] = useState("");

	useEffect(() => {
		const fetchData = async () => {
			try {
				const resU = await load("u");
				setU(resU);

				const resP = await load("p");
				setP(resP);

				const resI = await load("i");
				setI(resI);
			} catch (error) {
				console.error("Có lỗi khi truy cập AsyncStorage:", error);
			}
		};

		fetchData();
	}, []);

	useEffect(() => {
		const stompClient = new StompJs.Client({
			brokerURL: `wss://${API_URL.substr(8)}/ws`,
		});

		stompClient.onConnect = (frame) => {
			console.log("Connected: " + frame);
			stompClient.subscribe(`/topic/messages/${data?.id}`, (greeting) => {
				const { idUserCreated, value } = JSON.parse(greeting.body);
				setMessages((prev) => [
					...prev,
					{
						isMe: idUserCreated === parseInt(i),
						value: value,
					},
				]);
			});
		};

		stompClient.onWebSocketError = (error) => {
			console.error("Error with websocket", error);
		};

		stompClient.onStompError = (frame) => {
			console.error("Broker reported error: " + frame.headers["message"]);
			console.error("Additional details: " + frame.body);
		};

		setConnection(stompClient);

		return () => {
			stompClient.deactivate();
		};
	}, [data]);

	useEffect(() => {
		if (connection) {
			connection.activate();
		}
	}, [connection]);

	const handleChangeMessage = (text) => {
		setMessage(text);
		if (text !== "") {
			setExistsValueMessage(!0);
		} else {
			setExistsValueMessage(!1);
		}
	};

	const sendMessage = () => {
		if (connection && message.trim()) {
			connection.publish({
				destination: `/chat/${data.id}`,
				body: JSON.stringify({
					idRoom: data.id,
					text: message,
					auth: `Basic ${encode(`${u}:${p}`)}`,
				}),
			});

			setMessage("");
		}
	};

	return (
		<View style={styles.container}>
			<TextInput
				autoFocus={true}
				style={[
					styles.inputMessage,
					{ width: screenWidth - (10 + 10 + 50 + 8 + 5) },
				]}
				value={message}
				onChangeText={handleChangeMessage}
				multiline={true}
				numberOfLines={4}
				placeholder="Nhắn tin..."
				placeholderTextColor={"#7D7C7C"}
			/>
			{existsValueMessage && (
				<View style={styles.viewSend}>
					<TouchableOpacity style={styles.send} onPress={sendMessage}>
						<FontAwesomeIcon
							icon={faPaperPlane}
							size={18}
							color="#fff"
						/>
					</TouchableOpacity>
				</View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		minHeight: 40,
		maxHeight: 95,
		borderWidth: 0.745,
		borderRadius: 25,
		borderColor: "#7D7C7C",
		flexDirection: "row",
		marginLeft: 10,
		marginRight: 10,
		backgroundColor: "#fff",
	},
	inputMessage: {
		flexGrow: 1,
		paddingTop: 0,
		paddingLeft: 15,
		paddingRight: 13,
		marginTop: 12,
		marginBottom: 12,
		fontSize: 16,
		fontWeight: "400",
		lineHeight: 18,
	},
	viewSend: {
		flexDirection: "column",
		justifyContent: "flex-end",
		alignItems: "flex-end",
		paddingBottom: 4,
		paddingRight: 8,
		marginLeft: 5,
	},
	send: {
		backgroundColor: "#000",
		borderRadius: 20,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		height: 32,
		width: 50,
	},
});

export default InputMessage;
