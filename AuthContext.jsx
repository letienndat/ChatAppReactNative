import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [isLogin, setIsLogin] = useState(!1);

	return (
		<AuthContext.Provider value={{ isLogin, setIsLogin }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	return useContext(AuthContext);
};
