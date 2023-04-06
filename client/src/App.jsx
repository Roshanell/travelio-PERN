import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import MyNavBar from "./components/Navbar";
import ListTravels from "./components/ListTravels";
import FormModal from "./components/FormModal";
import React from "react";
import { Button } from "react-bootstrap";
import { useState } from "react";
import ArticleComponent from "./components/ArticleComponent";

function App() {
	const [modalShow, setModalShow] = useState(false);
	const [editingtravel, setEditingtravel] = useState(null);

	//A function to control the update in the parent (travel component)
	const updatetravel = (savedtravel) => {
		// console.log("Line 29 savedtravel", savedtravel);
		// This function should update the whole list of travels -
		loadtravels();
	};
	return (
		<div className="App">
			<MyNavBar />
			<div className="article-container">
				<ListTravels setEditingtravel={setEditingtravel} />
				{/* <ArticleComponent /> */}
			</div>

			<Button variant="primary" onClick={() => setModalShow(true)}>
				Add A Destination
			</Button>

			<FormModal
				key={editingtravel ? editingtravel.id : null}
				editingtravel={editingtravel}
				onUpdatetravel={updatetravel}
				show={modalShow}
				onHide={() => setModalShow(false)}
			/>
		</div>
	);
}

export default App;
