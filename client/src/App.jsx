import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import MyNavBar from "./components/Navbar";
import ListTravels from "./components/ListTravels";
import FormModal from "./components/Module";
import React from "react";
import { Button } from "react-bootstrap";


function App() {
	const [modalShow, setModalShow] = React.useState(false);

	return (
		<div className="App">
			<MyNavBar />
			<ListTravels />
			<Button variant="primary" onClick={() => setModalShow(true)}>
				Launch vertically centered modal
			</Button>

			<FormModal show={modalShow} onHide={() => setModalShow(false)} />
		</div>
	);
}

export default App;
