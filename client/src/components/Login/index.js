import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './style.css'

const Login = () => {
	const [data, setData] = useState({ email: "", password: "" });
	const [error, setError] = useState("");

	const changeInput = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		setError("");
		e.preventDefault();
		try {
			const res = await axios.post("http://localhost:4000/api/users/authentication", data);
			localStorage.setItem("token", res.data.access_token);
			setError(res.data.msg);
			window.location = "/";
		} 
		catch (error) {
			if (error) 
			{
				setError(error.response.data.error.msg);
			}
		}
	};

	return (
		<div className="container">
			<div className="login-form">
				<div className="left">
					<form className="form_container" onSubmit={handleSubmit}>
						<h1>Login to Your Account</h1>
						<input type="email" placeholder="Email" name="email" onChange={changeInput} value={data.email} required className= "input" autoComplete="off"/>
						<input type="password" placeholder="Password" name="password" onChange={changeInput} value={data.password} required className="input" autoComplete="off"/>
						{error && <div className="err-msg">{error}</div>}
						<button type="submit" className="grn-button">Sing In</button>
					</form>
				</div>
				<div className="right">
					<h1>Are you New to Here ?</h1>
					<Link to="/signup">
						<button type="button" className="signup-button">Sing Up</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Login;