import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import Sign from "./Screen/Sign/Sign";
import Home from "./Screen/Home/Home";
import { AuthProvider, useAuth } from "./AuthContext";
import { load } from "./lib/async_storage/async_storage";

export default function App() {
	return (
		<AuthProvider>
			<NavigationContainer>
				<MainApp />
			</NavigationContainer>
		</AuthProvider>
	);
}

const MainApp = () => {
	const { isLogin, setIsLogin } = useAuth();

	const check = async (point) => {
		const u = await load("u");
		const p = await load("p");

		if (u && p) {
			setIsLogin(!0);
		}
	};

	useEffect(() => {
		check();
	}, []);

	return !isLogin ? <Sign /> : <Home />;
};
