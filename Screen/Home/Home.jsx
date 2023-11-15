import { createStackNavigator } from "@react-navigation/stack";
import ScreenSearch from "./SearchScreen/SearchScreen";
import HomeScreen from "./HomeScreen/HomeScreen";
import SettingScreen from "./SettingScreen/SettingScreen";
import ChatScreen from "./ChatScreen/ChatScreen";

const Stack = createStackNavigator();

export default function Home() {
	return (
		<Stack.Navigator
			initialRouteName="Trang chủ"
			screenOptions={{
				cardStyle: { backgroundColor: "#fff" },
			}}
		>
			<Stack.Screen
				name="Trang chủ"
				children={() => <HomeScreen />}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="Tìm kiếm"
				component={ScreenSearch}
				options={{ headerShown: false }}
			/>
			<Stack.Screen name="Cài đặt" children={() => <SettingScreen />} />
			<Stack.Screen
				name="Chat"
				children={() => <ChatScreen />}
				options={{ headerShown: false }}
			/>
		</Stack.Navigator>
	);
}
