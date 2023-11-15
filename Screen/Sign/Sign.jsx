import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import {
	faGem as faGemFocus,
	faHandshake as faHandshakeFocus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faGem, faHandshake } from "@fortawesome/free-regular-svg-icons";

const Tab = createBottomTabNavigator();

const TabBarIcon = ({ focused, focusedIcon, regularIcon }) => {
	return (
		<FontAwesomeIcon
			icon={focused ? focusedIcon : regularIcon}
			color={focused ? "#0174BE" : "gray"}
			size={22}
		/>
	);
};

export default function Sign(props) {
	return (
		<Tab.Navigator
			initialRouteName="Đăng nhập"
			screenOptions={{ headerShown: false }}
		>
			<Tab.Screen
				name="Đăng nhập"
				children={() => <SignIn />}
				options={() => ({
					tabBarLabel: "Đăng nhập",
					tabBarIcon: ({ focused }) => (
						<TabBarIcon
							focused={focused}
							focusedIcon={faGemFocus}
							regularIcon={faGem}
						/>
					),
				})}
			/>
			<Tab.Screen
				name="Đăng ký"
				component={SignUp}
				options={() => ({
					tabBarLabel: "Đăng ký",
					tabBarIcon: ({ focused }) => (
						<TabBarIcon
							focused={focused}
							focusedIcon={faHandshakeFocus}
							regularIcon={faHandshake}
						/>
					),
				})}
			/>
		</Tab.Navigator>
	);
}
