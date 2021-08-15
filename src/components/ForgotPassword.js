import { useRef, useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { useAuth } from "../authContext/AuthProvider";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
	const emailRef = useRef();
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const { restPassword } = useAuth();
	const [message, setMessage] = useState("");

	//handle submit an account
	const handleSubmit = e => {
		e.preventDefault();

		setLoading(true);
		setError("");
		setMessage("");

		restPassword(emailRef.current.value)
			.then(() => {
				setLoading(false);
				setMessage("check your inbox for further instructions");
			})
			.catch(() => {
				setLoading(false);
				setError("Failed to rest password");
			});
	};

	//Render
	return (
		<>
			<Card>
				<Card.Body>
					<h2 className='text-center mb-4'>Password Rest</h2>
					{error && <Alert variant='danger'>{error}</Alert>}
					{message && <Alert variant='success'>{message}</Alert>}
					<Form onSubmit={handleSubmit}>
						<Form.Group id='email'>
							<Form.Label>Email</Form.Label>
							<Form.Control type='email' ref={emailRef} required />
						</Form.Group>
						<Button disabled={loading} className='w-100' type='submit'>
							Rest Password
						</Button>
					</Form>
					<div className='w-100 text-center mt-3'>
						<Link to='/login'>Login</Link>
					</div>
				</Card.Body>
			</Card>
			<div className='text-center mt-2'>
				Do need account?<Link to='/signup'> Sign up</Link>
			</div>
		</>
	);
};

export default ForgotPassword;
