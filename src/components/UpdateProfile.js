import { useRef, useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { useAuth } from "../authContext/AuthProvider";
import { Link, useHistory } from "react-router-dom";

const Signup = () => {
	const emailRef = useRef();
	const passwordRef = useRef();
	const passwordConfirmRef = useRef();
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const { currentUser, updateEmail, updatePassword } = useAuth();
	const history = useHistory();

	//handle submit an account
	const handleSubmit = e => {
		e.preventDefault();

		if (passwordRef.current.value !== passwordConfirmRef.current.value) {
			return setError("Password does not match");
		}

		setLoading(true);
		setError("");

		const promises = [];

		if (emailRef.current.value !== currentUser.email) {
			promises.push(updateEmail(emailRef.current.value));
		}
		
		if (passwordRef.current.value) {
			promises.push(updatePassword(passwordRef.current.value));
		}

		Promise.all(promises)
			.then(() => {
				history.push("/");
			})
			.catch(() => {
				setError("Failed to Update Profile");
			})
			.finally(() => {
				setLoading(false);
			});
	};

	//Render
	return (
		<>
			<Card>
				<Card.Body>
					<h2 className="text-center mb-4">Update Profile</h2>
					{error && <Alert variant="danger">{error}</Alert>}
					<Form onSubmit={handleSubmit}>
						<Form.Group id="email">
							<Form.Label>Email</Form.Label>
							<Form.Control
								type="email"
								ref={emailRef}
								required
								defaultValue={currentUser.email}
							/>
						</Form.Group>
						<Form.Group id="password">
							<Form.Label>Password</Form.Label>
							<Form.Control
								type="password"
								ref={passwordRef}
								placeholder="Leave Blank To Keep Same"
							/>
						</Form.Group>
						<Form.Group id="password-confirm">
							<Form.Label>Password Confirm</Form.Label>
							<Form.Control
								type="password"
								ref={passwordConfirmRef}
								placeholder="Leave Blank To Keep Same"
							/>
						</Form.Group>
						<Button disabled={loading} className="w-100" type="submit">
							Update Profile
						</Button>
					</Form>
				</Card.Body>
			</Card>
			<div className="text-center mt-2">
				<Link to="/">Cancel</Link>
			</div>
		</>
	);
};

export default Signup;
