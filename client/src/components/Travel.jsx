import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import * as ioicons from "react-icons/io5";

const TravelCard = ({ travel, toUpdate, toDelete }) => {
	const onUpdate = (toUpdatetravel) => {
		toUpdate(toUpdatetravel);
	};

	const onDelete = (toDeletetravel) => {
		toDelete(toDeletetravel);
	};

	return (
		// <Card>
		//     <Card.Body>
		//     <Card.Title>{travel.title}</Card.Title>
		//     <Button variant="outline-danger" onClick={()=>{onDelete(travel)}} style={{padding: '0.6em', marginRight:'0.9em'}}><ioicons.IoTrash/></Button>
		//     <Button variant="outline-info" onClick={()=>{onUpdate(travel)}} style={{padding: '0.6em'}}> <ioicons.IoSync/></Button>
		//     </Card.Body>
		// </Card>

		<Card style={{ width: "18rem" }}>
			<Card.Img variant="top" src={travel.image_link} />
			<Card.Body>
				<Card.Title>{travel.title}</Card.Title>
				<Card.Subtitle className="mb-2 text-muted">
					{travel.author}
				</Card.Subtitle>
				<Card.Text>{travel.article_preview}</Card.Text>
				<Button
					variant="outline-danger"
					onClick={() => {
						onDelete(travel);
					}}
					style={{ padding: "0.6em", marginRight: "0.9em" }}
				>
					<ioicons.IoTrash />
				</Button>
				<Button
					variant="outline-info"
					onClick={() => {
						onUpdate(travel);
					}}
					style={{ padding: "0.6em" }}
				>
					{" "}
					<ioicons.IoSync />
				</Button>
			</Card.Body>
		</Card>
	);
};

export default TravelCard;
