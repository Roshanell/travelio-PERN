import React, { useState, useEffect } from "react";
import * as ioicons from "react-icons/io5";

import TravelCard from "./TravelCard";
import ArticleComponent from "./ArticleComponent";

const ListTravels = ({ setEditingtravel }) => {
	// this is my original state with an array of travels
	const [travels, settravels] = useState([]);

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

	const saveTravel = (newtravel) => {
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
				<ul>
					{travels.map((travel) => {
						return (
							<li key={travel.id}>
								{" "}
								<TravelCard
									travel={travel}
									toDelete={onDelete}
									toUpdate={onUpdate}
								/>
							</li>
						);
					})}
				</ul>
				<ul>
					{travels.map((travel) => {
						return (
							<li key={travel.id}>
								<ArticleComponent
									travel={travel}
									
								/>
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
};

export default ListTravels;
