import "./App.css";
import Home from "./components/HomePage/Home";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Patients from "./components/Patients";
function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route exact path="/" element={<Patients />}></Route>
				<Route exact path="/patient/:patientID" element={<Home />}></Route>

				<Route path="*" element={<Navigate to="/" replace />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
