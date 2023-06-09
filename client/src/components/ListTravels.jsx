import React, { useState, useEffect } from "react";
import * as ioicons from "react-icons/io5";
import MyForm from "./Form";
import Travel from "./Travel";

const ListTravels = () => {
	// this is my original state with an array of travels
	const [travels, settravels] = useState([]);

	//this is the state needed for the UpdateRequest
	const [editingtravel, setEditingtravel] = useState(null);

	const loadtravels = () => {
		// A function to fetch the list of travels that will be load anytime that list change
		fetch("http://localhost:8081/api/travels")
			.then((response) => response.json())
			.then((travels) => {
				settravels(travels);
			});
	};

	useEffect(() => {
		loadtravels();
	}, [travels]);

	const onSavetravel = (newtravel) => {
		//console.log(newtravel, "From the parent - List of travels");
		settravels((travels) => [...travels, newtravel]);
	};

	//A function to control the update in the parent (travel component)
	const updatetravel = (savedtravel) => {
		// console.log("Line 29 savedtravel", savedtravel);
		// This function should update the whole list of travels -
		loadtravels();
	};

	//A function to handle the Delete funtionality
	const onDelete = (travel) => {
		//console.log(travel, "delete method")
		return fetch(`http://localhost:8081/api/travels/${travel.id}`, {
			method: "DELETE",
		}).then((response) => {
			//console.log(response);
			if (response.ok) {
				loadtravels();
			}
		});
	};

	//A function to handle the Update functionality
	const onUpdate = (toUpdatetravel) => {
		//console.log(toUpdatetravel);
		setEditingtravel(toUpdatetravel);
	};

	return (
		<div className="mybody">
			<div className="list-travels">
				<h2>Techtonica Participants </h2>
				<ul>
					{travels.map((travel) => {
						return (
							<li key={travel.id}>
								{" "}
								<Travel
									travel={travel}
									toDelete={onDelete}
									toUpdate={onUpdate}
								/>
							</li>
						);
					})}
				</ul>
			</div>
			<MyForm
				key={editingtravel ? editingtravel.id : null}
				onSavetravel={onSavetravel}
				editingtravel={editingtravel}
				onUpdatetravel={updatetravel}
			/>
		</div>
	);
};

export default ListTravels;
