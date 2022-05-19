import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

import { addNewPosts } from "./postSlice";
import { selectAllUsers } from "../users/userSlice";

const initialPostData = {
	title: "",
	body: "",
	userId: 0,
};

export default function AddPostForm() {
	const dispatch = useDispatch();

	const [postData, setPostData] = useState(initialPostData);
	const [addRequestStateus, setAddRequestStateus] = useState("idle");

	const users = useSelector(selectAllUsers);

	const canSave =
		[postData.title, postData.body, postData.userId].every(Boolean) &&
		addRequestStateus === "idle";

	const handleChange = (e) => {
		setPostData({
			...postData,
			[e.target.name]: e.target.value,
		});
	};

	const handleCreatePost = (e) => {
		e.preventDefault();

		if (canSave) {
			try {
				setAddRequestStateus("pending");
				dispatch(addNewPosts(postData));
				setPostData(initialPostData);
			} catch (error) {
				console.log("Faild to save the post", error);
			} finally {
				setAddRequestStateus("idle");
			}
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

				<label htmlFor="body">Body</label>
				<textarea
					name="body"
					id="body"
					cols="30"
					rows="5"
					value={postData.body}
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
