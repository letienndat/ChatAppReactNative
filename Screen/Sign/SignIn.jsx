import {
	Image,
	Keyboard,
	KeyboardAvoidingView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
} from "react-native";
import backgroundSignin from "../../images/background_signin.png";
import { useEffect, useRef, useState } from "react";
import Validate, { isPassword, isUsername } from "../../lib/validate/validate";
import axios from "../../lib/axios/axios-config";
import { useNavigation, useRoute } from "@react-navigation/native";
import { save } from "../../lib/async_storage/async_storage";
import { useAuth } from "../../AuthContext";

export default function SignIn() {
	const [inputUsernameFocus, setInputUsernameFocus] = useState(!1);
	const [inputPasswordFocus, setInputPasswordFocus] = useState(!1);
	const [inputUsernameInvalid, setInputUsernameInvalid] = useState(!1);
	const [inputPasswordInvalid, setInputPasswordInvalid] = useState(!1);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [notifyUsername, setNotifyUsername] = useState("");
	const [notifyPassword, setNotifyPassword] = useState("");
	const [notifyForm, setNotifyForm] = useState(undefined);
	const inputUsername = useRef(null);
	const inputPassword = useRef(null);

	const nav = useNavigation();
	const route = useRoute();

	const {setIsLogin} = useAuth()

	useEffect(() => {
		setUsername(route.params?.username);
		inputUsername.current.value = route.params?.username;
		setPassword(route.params?.password);
		inputPassword.current.value = route.params?.password;
	}, [route.params]);

	const handleFocusUsername = () => {
		setInputUsernameFocus(!0);
	};

	const handleBlurUsername = () => {
		setInputUsernameFocus(!1);
	};

	const handleChangeTextUsername = (text) => {
		inputUsername.current.value = text;
		setUsername(text);
		let resCheck = isUsername(inputUsername.current);
		if (!resCheck.status) {
			setNotifyUsername(resCheck.message);
			setInputUsernameInvalid(!0);
		} else {
			setNotifyUsername("");
			setInputUsernameInvalid(!1);
		}
	};

	const handleFocusPassword = () => {
		setInputPasswordFocus(!0);
	};

	const handleBlurPassword = () => {
		setInputPasswordFocus(!1);
	};

	const handleChangeTextPassword = (text) => {
		inputPassword.current.value = text;
		setPassword(text);
		let resCheck = isPassword(inputPassword.current);
		if (!resCheck.status) {
			setNotifyPassword(resCheck.message);
			setInputPasswordInvalid(!0);
		} else {
			setNotifyPassword("");
			setInputPasswordInvalid(!1);
		}
	};

	const handleClickOption = () => {
		nav.navigate("Đăng ký");
	};

	const sendRequest = async (point, data) => {
		return axios.post(point, data);
	};

	const handleSubmitButton = async () => {
		setNotifyForm("");

		let roles = [
			isUsername(inputUsername.current),
			isPassword(inputPassword.current),
		];

		const resCheck = Validate({ roles });

		if (resCheck.status) {
			setNotifyUsername("");
			setInputUsernameInvalid(!1);
			setNotifyPassword("");
			setInputPasswordInvalid(!1);

			const bodyForm = {
				username: username,
				password: password,
			};

			const response = sendRequest(`/api/auth/signin`, bodyForm);

			response
				.then((res) => {
					if (res.status === 200) {
						setInputUsernameFocus(!1);
						setInputPasswordFocus(!1);
						setInputUsernameInvalid(!1);
						setInputPasswordInvalid(!1);
						setUsername("");
						setPassword("");
						setNotifyUsername("");
						setNotifyPassword("");
						setNotifyForm(undefined);

						save('u', username)
						save('p', password)
						save('i', `${res.data.valueMessage.id}`)

						setIsLogin(!0);
					} else if (res.status !== 200) {
						setNotifyForm("Có lỗi khi truy cập tới hệ thống!");
					}
				})
				.catch((e) => {
					setNotifyForm("Không thể truy cập, vui lòng thử lại!");
				});
		} else {
			setNotifyForm("");
			resCheck.elements.forEach((e) => {
				if (e.element === inputUsername.current) {
					if (!e.status) {
						setNotifyUsername(e.message);
						setInputUsernameInvalid(!0);
					} else {
						setNotifyUsername("");
						setInputUsernameInvalid(!1);
					}
				}
				if (e.element === inputPassword.current) {
					if (!e.status) {
						setNotifyPassword(e.message);
						setInputPasswordInvalid(!0);
					} else {
						setNotifyPassword("");
						setInputPasswordInvalid(!1);
					}
				}
			});
		}
	};

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
		>
			<TouchableWithoutFeedback
				onPress={Keyboard.dismiss}
				accessible={false}
			>
				<View style={styles.container}>
					<Image style={styles.image} source={backgroundSignin} />
					<View style={styles.sign}>
						<View>
							<TextInput
								style={[
									styles.input,
									inputUsernameFocus && styles.inputFocus,
									inputUsernameInvalid && styles.inputInvalid,
								]}
								ref={inputUsername}
								value={username}
								onChangeText={handleChangeTextUsername}
								placeholder="Tên tài khoản"
								keyboardType="default"
								autoCapitalize="none"
								onFocus={handleFocusUsername}
								onBlur={handleBlurUsername}
							/>
							<Text style={styles.notifyInput}>
								{notifyUsername}
							</Text>
						</View>
						<View>
							<TextInput
								style={[
									styles.input,
									inputPasswordFocus && styles.inputFocus,
									inputPasswordInvalid && styles.inputInvalid,
								]}
								ref={inputPassword}
								value={password}
								onChangeText={handleChangeTextPassword}
								placeholder="Mật khẩu"
								keyboardType="default"
								secureTextEntry={true}
								onFocus={handleFocusPassword}
								onBlur={handleBlurPassword}
							/>
							<Text style={styles.notifyInput}>
								{notifyPassword}
							</Text>
						</View>
					</View>
					<View>{notifyForm && <Text>{notifyForm}</Text>}</View>
					<TouchableOpacity
						style={styles.button}
						onPress={handleSubmitButton}
					>
						<Text style={styles.textButton}>Đăng nhập</Text>
					</TouchableOpacity>
					<View style={styles.viewOption}>
						<Text>Chưa có tài khoản?</Text>
						<Text style={styles.option} onPress={handleClickOption}>
							Đăng ký
						</Text>
					</View>
				</View>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		gap: 10,
		height: "100%",
		width: "100%",
		backgroundColor: "#fff",
		paddingTop: 50,
		paddingBottom: 50,
	},
	image: {
		width: 300,
		height: 300,
		borderRadius: 30,
		margin: 10,
	},
	sign: {
		marginTop: 20,
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		gap: 10,
	},
	input: {
		width: 350,
		height: 49,
		borderWidth: 2,
		borderColor: "#d2d6dad3",
		borderRadius: 10,
		paddingLeft: 10,
		paddingRight: 10,
		fontSize: 14,
		lineHeight: 20,
		fontWeight: '400',
	},
	inputFocus: {
		borderColor: "rgb(53, 209, 245)",
	},
	inputInvalid: {
		borderColor: "rgb(245, 112, 103)",
	},
	notifyInput: {
		width: 350,
		paddingLeft: 5,
		fontSize: 13,
		lineHeight: 20,
		fontWeight: '400',
		color: "#4F4A45",
	},
	button: {
		marginTop: 10,
		width: 350,
		height: 45,
		borderRadius: 10,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#0174BE",
	},
	textButton: {
		color: "#fff",
	},
	viewOption: {
		marginTop: 5,
		flexDirection: "row",
		gap: 3,
	},
	option: {
		color: "#00A9FF",
	},
});
