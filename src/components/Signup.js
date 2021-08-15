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
	const { signup } = useAuth();
	const history = useHistory();

	//handle submit an account
	const handleSubmit = e => {
		e.preventDefault();

		if (passwordRef.current.value !== passwordConfirmRef.current.value) {
			return setError("Password does not match");
		}

		setLoading(true);

		signup(emailRef.current.value, passwordRef.current.value)
			.then(() => {
				setError("");
				setLoading(false);
				history.push("/");
			})
			.catch(err => {
				setLoading(false);
				setError(err.message);
			});
	};

	//Render
	return (
		<>
			<Card>
				<Card.Body>
					<h2 className='text-center mb-4'>Sign Up</h2>
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
						<Form.Group id='password-confirm'>
							<Form.Label>Password Confirm</Form.Label>
							<Form.Control type='password' ref={passwordConfirmRef} required />
						</Form.Group>
						<Button disabled={loading} className='w-100' type='submit'>
							Sign Up
						</Button>
					</Form>
				</Card.Body>
			</Card>
			<div className='text-center mt-2'>
				Already have an account? <Link to='/login'>Log in</Link>
			</div>
		</>
	);
};

export default Signup;
