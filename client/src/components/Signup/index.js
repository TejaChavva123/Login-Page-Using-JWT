import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import './style.css'

const Signup = () => {
	const [data, setData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
	});
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const ChangeInput = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await axios.post("http://localhost:4000/api/users/register", data);
			navigate("/login");
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.error.msg);
			}
		}
	};

	return (
		<div className="container">
			<div className="signup-form">
				<div className="right">
					<h1>Welcome Back</h1>
					<Link to="/login">
						<button type="button" className="signin-button">Sing in</button>
					</Link>
				</div>
				<div className="left">
					<form className="form_container" onSubmit={handleSubmit}>
						<h1>Create Account</h1>
						<input type="text" placeholder="First Name" name="firstName" onChange={ChangeInput} value={data.firstName} required className="input" autoComplete="off" />
						<input type="text" placeholder="Last Name" name="lastName" onChange={ChangeInput} value={data.lastName} required className="input" autoComplete="off"  />
						<input type="email" placeholder="Email" name="email" onChange={ChangeInput} value={data.email} required className="input" autoComplete="off" />
						<input type="password" placeholder="Password" name="password" onChange={ChangeInput} value={data.password} required className="input" autoComplete="off" />
						{error && <div className="err-msg">{error}</div>}
						<button type="submit" className="grn-button">Sing Up</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Signup;