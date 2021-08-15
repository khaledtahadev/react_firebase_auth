import { useRef, useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { useAuth } from "../authContext/AuthProvider";
import { Link, useHistory } from "react-router-dom";

const Login = () => {
	const emailRef = useRef();
	const passwordRef = useRef();
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const { login } = useAuth();
	const history = useHistory();

	//handle submit an account
	const handleSubmit = async e => {
		e.preventDefault();

		setLoading(true);
		setError("");

		try {
			await login(emailRef.current.value, passwordRef.current.value);
			setLoading(false);
			history.push("/");
		} catch (err) {
			console.log(err);
			setLoading(false);
			setError(err.message);
		}
	};

	//Render
	return (
		<>
			<Card>
				<Card.Body>
					<h2 className='text-center mb-4'>Log in</h2>
					{error && <Alert variant='danger'>{error}</Alert>}
					<Form onSubmit={handleSubmit}>
						<Form.Group id='email'>
							<Form.Label>Email</Form.Label>
							<Form.Control type='email' ref={emailRef} required />
						</Form.Group>
						<Form.Group id='password'>
							<Form.Label>Password</Form.Label>
							<Form.Control type='password' ref={passwordRef} required />
						</Form.Group>
						<Button disabled={loading} className='w-100' type='submit'>
							Log in
						</Button>
					</Form>
					<div className='w-100 text-center mt-3'>
						<Link to='/forgotPassword'>Forgot Password?</Link>
					</div>
				</Card.Body>
			</Card>
			<div className='text-center mt-2'>
				Do need account?<Link to='/signup'> Sign up</Link>
			</div>
		</>
	);
};

export default Login;
