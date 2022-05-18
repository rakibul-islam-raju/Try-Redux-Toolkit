import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

import { postAdded } from "./postSlice";
import { selectAllUsers } from "../users/userSlice";

const initialPostData = {
	title: "",
	content: "",
	userId: 0,
};

export default function AddPostForm() {
	const dispatch = useDispatch();

	const [postData, setPostData] = useState(initialPostData);

	const users = useSelector(selectAllUsers);

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

	const canSave =
		Boolean(postData.title) &&
		Boolean(postData.userId) &&
		Boolean(postData.content);

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

				<label htmlFor="userId">Author</label>
				<select
					name="userId"
					id="userId"
					value={postData.userId}
					onChange={handleChange}
				>
					<option defaultChecked>Select Author</option>
					{users?.map((user) => (
						<option key={user.id} value={user.id}>
							{user.name}
						</option>
					))}
				</select>
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

				<button type="submit" disabled={!canSave}>
					Save Post
				</button>
			</form>
		</div>
	);
}
