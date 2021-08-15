import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";
import Dashboard from "./components/Dashboard";
import Signup from "./components/Signup";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import ForgotPassword from "./components/ForgotPassword";
import UpdateProfile from "./components/UpdateProfile";

function App() {
	return (
		<Container
			className="d-flex align-items-center justify-content-center"
			style={{ minHeight: "100vh" }}
		>
			<div className="w-100" style={{ maxWidth: "400px" }}>
				<Router>
					<Switch>
						<Route path="/signup" component={Signup} />
						<Route path="/login" component={Login} />
						<PrivateRoute exact path="/" component={Dashboard} />
						<Route path="/updateProfile" component={UpdateProfile} />
						<Route path="/forgotPassword" component={ForgotPassword} />
					</Switch>
				</Router>
			</div>
		</Container>
	);
}

export default App;
