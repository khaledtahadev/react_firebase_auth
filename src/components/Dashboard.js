import React, { useState } from "react";
import { Alert, Button, Card } from "react-bootstrap";
import { useAuth } from "../authContext/AuthProvider";
import { Link, useHistory } from "react-router-dom";

const Dashboard = () => {
	const [error, setError] = useState(false);
	const { currentUser, logout } = useAuth();
	const history = useHistory();

	const handleLogout = () => {
		setError("");

		logout()
			.then(() => {
				history.push("/login");
			})
			.catch(() => {
				setError("Failed Log Out");
			});
	};

	return (
		<>
			<Card>
				<Card.Body>
					<h2 className='text-center mb-4'>Profile</h2>
					{error && <Alert variant='danger'>{error}</Alert>}
					<strong>Email:</strong> {currentUser.email}
					<Link to='/updateProfile' className='btn btn-primary w-100 mt-3'>
						Update Profile
					</Link>
				</Card.Body>
				<div className='w-100 text-center mt-2'>
					<Button variant='link' onClick={handleLogout}>
						Log out
					</Button>
				</div>
			</Card>
		</>
	);
};

export default Dashboard;
