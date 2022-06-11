import './style.css'
const Body = () => {
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

	return (
		<div className="container">
			<div className="body">
				<button className="btn" onClick={handleLogout}>
					Logout
				</button>
			</div>
		</div>
	);
};

export default Body;