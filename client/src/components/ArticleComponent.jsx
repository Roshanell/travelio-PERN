import Accordion from "react-bootstrap/Accordion";
import { Card } from "react-bootstrap";

const ArticleComponent = ({ travel, toUpdate, toDelete }) => {
	// console.log(travel.author)
	return (
		<div>

			<Accordion>
				<Accordion.Item eventKey="0">
					<Accordion.Header>{travel.title}</Accordion.Header>
					<Accordion.Body>
						{travel.date}
						<br></br>
						{travel.author}
						<br></br>
						<Card.Img variant="top" src={travel.image_link} />

						<br></br>
						{travel.blog_body}
					</Accordion.Body>
				</Accordion.Item>
			</Accordion>
		</div>
	);
};
export default ArticleComponent;
