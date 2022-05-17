import { useSelector, useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { useState } from "react";
import { postAdded } from "./postSlice";

export default function AddPostForm() {
	const dispatch = useDispatch();

	const initialPostData = {
		title: "",
		content: "",
	};

	const [postData, setPostData] = useState(initialPostData);

	const handleChange = (e) => {
		setPostData({
			...postData,
			[e.target.name]: e.target.value,
		});
	};

	const handleCreatePost = (e) => {
		e.preventDefault();

		if (postData.title && postData.content) {
			dispatch(postAdded(postData));
			setPostData(initialPostData);
		}
	};

	return (
		<div>
			<h4>Create New Post</h4>
			<form onSubmit={handleCreatePost}>
				<label htmlFor="title">Title</label>
				<input
					type="text"
					name="title"
					id="title"
					value={postData.title}
					onChange={handleChange}
				/>
				<br />
				<label htmlFor="content">Content</label>
				<textarea
					name="content"
					id="content"
					cols="30"
					rows="5"
					value={postData.content}
					onChange={handleChange}
				></textarea>
				<br />
				<button type="submit">Save Post</button>
			</form>
		</div>
	);
}
