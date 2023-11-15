import {
	Image,
	Keyboard,
	KeyboardAvoidingView,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
} from "react-native";
import backgroundSignup from "../../images/background_signup.png";
import { useEffect, useRef, useState } from "react";
import Validate, {
	isConfirmPassword,
	isName,
	isPassword,
	isUsername,
} from "../../lib/validate/validate";
import axios from "../../lib/axios/axios-config";
import { useNavigation } from "@react-navigation/native";

export default function SignUp() {
	const [inputFullNameFocus, setInputFullNameFocus] = useState(!1);
	const [inputUsernameFocus, setInputUsernameFocus] = useState(!1);
	const [inputPasswordFocus, setInputPasswordFocus] = useState(!1);
	const [inputConfirmPasswordFocus, setInputConfirmPasswordFocus] = useState(
		!1
	);
	const [inputFullNameInvalid, setInputFullNameInvalid] = useState(!1);
	const [inputUsernameInvalid, setInputUsernameInvalid] = useState(!1);
	const [inputPasswordInvalid, setInputPasswordInvalid] = useState(!1);
	const [inputConfirmPasswordInvalid, setInputConfirmPasswordInvalid] =
		useState(!1);
	const [fullName, setFullName] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [notifyFullName, setNotifyFullName] = useState("");
	const [notifyUsername, setNotifyUsername] = useState("");
	const [notifyPassword, setNotifyPassword] = useState("");
	const [notifyConfirmPassword, setNotifyConfirmPassword] = useState("");
	const [notifyForm, setNotifyForm] = useState(undefined);
	const inputFullName = useRef(null);
	const inputUsername = useRef(null);
	const inputPassword = useRef(null);
	const inputConfirmPassword = useRef(null);

	const nav = useNavigation();

	const handleFocusFullName = () => {
		setInputFullNameFocus(!0);
	};

	const handleBlurFullName = () => {
		setInputFullNameFocus(!1);
	};

	const handleChangeTextFullName = (text) => {
		inputFullName.current.value = text;
		setFullName(text);
		let resCheck = isName(inputFullName.current);
		if (!resCheck.status) {
			setNotifyFullName(resCheck.message);
			setInputFullNameInvalid(!0);
		} else {
			setNotifyFullName("");
			setInputFullNameInvalid(!1);
		}
	};

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

	const handleFocusConfirmPassword = () => {
		setInputConfirmPasswordFocus(!0);
	};

	const handleBlurConfirmPassword = () => {
		setInputConfirmPasswordFocus(!1);
	};

	const handleChangeTextConfirmPassword = (text) => {
		inputConfirmPassword.current.value = text;
		setConfirmPassword(text);
		let resCheck = isConfirmPassword(
			inputPassword.current,
			inputConfirmPassword.current
		);
		if (!resCheck.status) {
			setNotifyConfirmPassword(resCheck.message);
			setInputConfirmPasswordInvalid(!0);
		} else {
			setNotifyConfirmPassword("");
			setInputConfirmPasswordInvalid(!1);
		}
	};

	const handleClickOption = () => {
		nav.navigate("Đăng nhập");
	};

	const sendRequest = async (point, data) => {
		return axios.post(point, data);
	};

	const handleSubmitButton = async () => {
		setNotifyForm("");

		let roles = [
			isName(inputFullName.current),
			isUsername(inputUsername.current),
			isPassword(inputPassword.current),
			isConfirmPassword(
				inputPassword.current,
				inputConfirmPassword.current
			),
		];

		const resCheck = Validate({ roles });

		if (resCheck.status) {
			setNotifyFullName("");
			setInputFullNameInvalid(!1);
			setNotifyUsername("");
			setInputUsernameInvalid(!1);
			setNotifyPassword("");
			setInputPasswordInvalid(!1);
			setNotifyConfirmPassword("");
			setInputConfirmPasswordInvalid(!1);

			const bodyForm = {
				username: username,
				name: fullName,
				password: password,
			};

			const response = sendRequest(`/api/auth/signup`, bodyForm);

			response
				.then((res) => {
					if (res.status === 200) {
						const data = res.data;

						if (data.typeMessage === 0) {
							setNotifyForm(data.valueMessage);
						} else if (data.typeMessage === 1) {
							setInputFullNameFocus(!1);
							setInputUsernameFocus(!1);
							setInputPasswordFocus(!1);
							setInputConfirmPasswordFocus(!1);
							setInputFullNameInvalid(!1);
							setInputUsernameInvalid(!1);
							setInputPasswordInvalid(!1);
							setFullName("");
							setUsername("");
							setPassword("");
							setConfirmPassword("");
							setNotifyUsername("");
							setNotifyPassword("");
							setNotifyConfirmPassword("");
							setNotifyForm(undefined);

							nav.navigate("Đăng nhập", {
								username: username,
								password: password,
							});
						}
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
				if (e.element === inputFullName.current) {
					if (!e.status) {
						setNotifyFullName(e.message);
						setInputFullNameInvalid(!0);
					} else {
						setNotifyFullName("");
						setInputFullNameInvalid(!1);
					}
				}
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
				if (e.element === inputConfirmPassword.current) {
					if (!e.status) {
						setNotifyConfirmPassword(e.message);
						setInputConfirmPasswordInvalid(!0);
					} else {
						setNotifyConfirmPassword("");
						setInputConfirmPasswordInvalid(!1);
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
				<ScrollView>
					<View style={styles.container}>
						<Image style={styles.image} source={backgroundSignup} />
						<View style={styles.sign}>
							<View>
								<TextInput
									style={[
										styles.input,
										inputFullNameFocus && styles.inputFocus,
										inputFullNameInvalid &&
											styles.inputInvalid,
									]}
									ref={inputFullName}
									value={fullName}
									onChangeText={handleChangeTextFullName}
									placeholder="Họ tên"
									keyboardType="default"
									autoCapitalize="none"
									onFocus={handleFocusFullName}
									onBlur={handleBlurFullName}
								/>
								<Text style={styles.notifyInput}>
									{notifyFullName}
								</Text>
							</View>
							<View>
								<TextInput
									style={[
										styles.input,
										inputUsernameFocus && styles.inputFocus,
										inputUsernameInvalid &&
											styles.inputInvalid,
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
										inputPasswordInvalid &&
											styles.inputInvalid,
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
							<View>
								<TextInput
									style={[
										styles.input,
										inputConfirmPasswordFocus &&
											styles.inputFocus,
										inputConfirmPasswordInvalid &&
											styles.inputInvalid,
									]}
									ref={inputConfirmPassword}
									value={confirmPassword}
									onChangeText={
										handleChangeTextConfirmPassword
									}
									placeholder="Nhập lại mật khẩu"
									keyboardType="default"
									secureTextEntry={true}
									onFocus={handleFocusConfirmPassword}
									onBlur={handleBlurConfirmPassword}
								/>
								<Text style={styles.notifyInput}>
									{notifyConfirmPassword}
								</Text>
							</View>
						</View>
						<View>{notifyForm && <Text>{notifyForm}</Text>}</View>
						<TouchableOpacity
							style={styles.button}
							onPress={handleSubmitButton}
						>
							<Text style={styles.textButton}>Đăng ký</Text>
						</TouchableOpacity>
						<View style={styles.viewOption}>
							<Text>Đã có tài khoản?</Text>
							<Text
								style={styles.option}
								onPress={handleClickOption}
							>
								Đăng nhập
							</Text>
						</View>
					</View>
				</ScrollView>
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
