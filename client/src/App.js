import logo from './logo.svg';
import './App.css';
import { Route, Routes, Navigate,BrowserRouter } from "react-router-dom";
import Login from './components/Login';
import Signup from './components/Signup';
import Body from './components/Body';

function App() {
  const user = localStorage.getItem("token");

	return (
    <BrowserRouter>
      <Routes>
        {user && <Route path="/" exact element={<Body />} />}
        <Route path="/login" exact element={<Login />} />
        <Route path="/signup" exact element={<Signup />} />
        <Route path="/" element={<Navigate replace to="/login" />} />
		  </Routes>
    </BrowserRouter>
		
	);
}

export default App;
