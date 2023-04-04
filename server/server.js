const express = require("express");
const cors = require("cors");
require("dotenv").config();
const path = require("path");
const db = require("./db/db-connection.js");

const app = express();
const PORT = process.env.PORT || 8081;
app.use(cors());
app.use(express.json());

// creates an endpoint for the route "/""
app.get("/", (req, res) => {
	res.json({ message: "Hola, from My template ExpressJS with React-Vite" });
});

// create the get request for travels in the endpoint '/api/travels'
app.get("/api/travels", async (req, res) => {
	try {
		const { rows: travels } = await db.query("SELECT * FROM travels");
		res.send(travels);
	} catch (e) {
		return res.status(400).json({ e });
	}
});

// create the POST request
app.post("/api/travels", async (req, res) => {
	try {
		const newtravel = {
			date: req.body.date,
			title: req.body.title,
			author: req.body.author,
			blog_body: req.body.blog_body,
			article_preview: req.body.article_preview,
			image_link: req.body.image_link,
		};
		//console.log([newtravel.firstname, newtravel.lastname, newtravel.iscurrent]);
		const result = await db.query(
			"INSERT INTO travels(date, title, author,blog_body, article_preview,image_link) VALUES($1, $2, $3, $4, $5, $6) RETURNING *",
			[
				newtravel.date,
				newtravel.title,
				newtravel.author,
				newtravel.blog_body,
				newtravel.article_preview,
				newtravel.image_link,
			]
		);
		console.log(result.rows[0]);
		res.json(result.rows[0]);
	} catch (e) {
		console.log(e);
		return res.status(400).json({ e });
	}
});

// delete request for travels
app.delete("/api/travels/:travelId", async (req, res) => {
	try {
		const travelId = req.params.travelId;
		await db.query("DELETE FROM travels WHERE id=$1", [travelId]);
		console.log("From the delete request-url", travelId);
		res.status(200).end();
	} catch (e) {
		console.log(e);
		return res.status(400).json({ e });
	}
});

//A put request - Update a travel
app.put("/api/travels/:travelId", async (req, res) => {
	//console.log(req.params);
	//This will be the id that I want to find in the DB - the travel to be updated
	const travelId = req.params.travelId;
	const updatedtravel = {
		id: req.body.id,
		date: req.body.date,
		title: req.body.title,
		author: req.body.author,
		blog_body: req.body.blog_body,
		article_preview: req.body.article_preview,
		image_link: req.body.image_link,
	};
	console.log("In the server from the url - the travel id", travelId);
	console.log(
		"In the server, from the react - the travel to be edited",
		updatedtravel
	);
	// UPDATE travels SET lastname = "something" WHERE id="16";
	const query = `UPDATE travels SET date=$1, title=$2, blog_body=$4,article_preview=$5, image_link=$6, author=$3 WHERE id=${travelId} RETURNING *`;
	const values = [
		updatedtravel.date,
		updatedtravel.title,
		updatedtravel.author,
		updatedtravel.blog_body,
		updatedtravel.article_preview,
		updatedtravel.image_link,
	];
	try {
		const updated = await db.query(query, values);
		console.log(updated.rows[0]);
		res.send(updated.rows[0]);
	} catch (e) {
		console.log(e);
		return res.status(400).json({ e });
	}
});

// console.log that your server is up and running
app.listen(PORT, () => {
	console.log(`Hola, Server listening on ${PORT}`);
});
