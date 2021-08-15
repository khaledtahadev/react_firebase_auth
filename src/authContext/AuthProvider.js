import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../firebase";

const AuthContext = createContext();

export const useAuth = () => {
	return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState();
	const [loading, setLoading] = useState(true);

	// Sign Up
	const signup = (email, password) => {
		return auth.createUserWithEmailAndPassword(email, password);
	};

	// log in
	const login = (email, password) => {
		return auth.signInWithEmailAndPassword(email, password);
	};

	// logout
	const logout = () => {
		return auth.signOut();
	};

	// Rest Password
	const restPassword = email => {
		return auth.sendPasswordResetEmail(email);
	};

	//update email
	const updateEmail = email => {
		return currentUser.updateEmail(email);
	};

	//update password
	const updatePassword = password => {
		return currentUser.updatePassword(password);
	};

	//Listener User State
	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(user => {
			setCurrentUser(user);
			setLoading(false);
		});

		return unsubscribe;
	}, []);

	const value = {
		currentUser,
		signup,
		login,
		logout,
		restPassword,
		updateEmail,
		updatePassword,
	};

	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
