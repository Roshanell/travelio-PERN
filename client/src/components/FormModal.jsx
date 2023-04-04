import Modal from "react-bootstrap/Modal";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

const FormModal = ({ editingtravel, onUpdatetravel, ...props }) => {
	const [travel, setTravel] = useState(
		editingtravel || {
			date: "",
			title: "",
			author: "",
			blog_body: "",
			article_preview: "",
			image_link: "",
		}
	);
	const saveTravel = (newtravel) => {
		//console.log(newtravel, "From the parent - List of travels");
		setTravel((travel) => ({ ...travel, newtravel }));
	};
	const handleDateChange = (event) => {
		const date = event.target.value;
		setTravel((travel) => ({ ...travel, date }));
	};

	const handleTitleChange = (event) => {
		const title = event.target.value;
		setTravel((travel) => ({ ...travel, title }));
	};

	const handleAuthorChange = (event) => {
		const author = event.target.value;
		//console.log(iscurrent);
		setTravel((travel) => ({ ...travel, author }));
	};
	const handleImageLinkChange = (event) => {
		const image_link = event.target.value;
		setTravel((travel) => ({ ...travel, image_link }));
	};

	const handleBlogBodyChange = (event) => {
		const blog_body = event.target.value;
		setTravel((travel) => ({ ...travel, blog_body }));
	};

	const handleArticlePreviewChange = (event) => {
		const article_preview = event.target.value;
		//console.log(iscurrent);
		setTravel((travel) => ({ ...travel, article_preview }));
	};
	const clearForm = () => {
		setTravel({
			date: "",
			title: "",
			author: "",
			blog_body: "",
			article_preview: "",
			image_link: "",
		});
	};

	//A function to handle the post request
	const posttravel = (newtravel) => {
		return fetch("http://localhost:8081/api/travels", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(newtravel),
		})
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				//console.log("From the post ", data);
				//I'm sending data to the List of travels (the parent) for updating the list
				saveTravel(data);
				//this line just for cleaning the form
				clearForm();
			});
	};

	//A function to handle the put request
	const puttravel = (toEdittravel) => {
		return fetch(`http://localhost:8081/api/travels/${toEdittravel.id}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(toEdittravel),
		})
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				onUpdatetravel(data);
				//this line just for cleaning the form
				clearForm();
			});
	};

	//A function to handle the submit in both cases - Post and Put request!
	const handleSubmit = (e) => {
		e.preventDefault();
		if (travel.id) {
			puttravel(travel);
		} else {
			posttravel(travel);
		}
	};

	return (
		<div>
			<Modal
				{...props}
				size="lg"
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<Modal.Header closeButton>
					<Modal.Title id="contained-modal-title-vcenter">
						Add a Destination
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form className="form-travels" onSubmit={handleSubmit}>
						<Form.Group>
							<Form.Label>Title</Form.Label>
							<input
								type="text"
								id="add-title"
								placeholder="Title"
								required
								value={travel.title}
								onChange={handleTitleChange}
							/>
						</Form.Group>
						<Form.Group>
							<Form.Label>Date</Form.Label>
							<input
								type="text"
								id="add-date"
								placeholder="Date"
								required
								value={travel.date}
								onChange={handleDateChange}
							/>
						</Form.Group>
						<Form.Group>
							<Form.Label>Author</Form.Label>
							<input
								type="text"
								id="add-author"
								placeholder="Author"
								required
								value={travel.author}
								onChange={handleAuthorChange}
							/>
						</Form.Group>
						<Form.Group>
							<Form.Label>Blog Body</Form.Label>
							<input
								type="text"
								id="add-blog-body"
								placeholder="Blog Body"
								required
								value={travel.blog_body}
								onChange={handleBlogBodyChange}
							/>
						</Form.Group>
						<Form.Group>
							<Form.Label>Article Preview</Form.Label>
							<input
								type="text"
								id="add-article-preview"
								placeholder="Article Preview"
								required
								value={travel.article_preview}
								onChange={handleArticlePreviewChange}
							/>
						</Form.Group>
						<Form.Group>
							<Form.Label>Image Google Link</Form.Label>
							<input
								type="text"
								id="add-google-link"
								placeholder="Image Link"
								required
								value={travel.image_link}
								onChange={handleImageLinkChange}
							/>
						</Form.Group>

						<Form.Group>
							<Button type="submit" variant="outline-success">
								{travel.id ? "Edit travel" : "Add travel"}
							</Button>
							{travel.id ? (
								<Button
									type="button"
									variant="outline-warning"
									onClick={clearForm}
								>
									Cancel
								</Button>
							) : null}
						</Form.Group>
					</Form>

					<h4>Centered Modal</h4>
					<p>
						Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
						dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
						ac consectetur ac, vestibulum at eros.
					</p>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={props.onHide}>Close</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};

export default FormModal;
