import { useSelector, useDispatch } from "react-redux";
import PostExcerpt from "./PostExcerpt";

import {
	selectAllPosts,
	getPostStatus,
	getPostError,
	counterAdded,
	getCounter,
} from "./postSlice";

export default function PostList() {
	const dispatch = useDispatch();

	const posts = useSelector(selectAllPosts);
	const postsStatus = useSelector(getPostStatus);
	const postsError = useSelector(getPostError);
	const counter = useSelector(getCounter);

	return (
		<div>
			<button type="button" onClick={() => dispatch(counterAdded())}>
				{counter}
			</button>

			<br />

			<h3>All Posts -</h3>

			{postsStatus === "loading" ? (
				<h5>Loading...</h5>
			) : postsStatus === "succeeded" ? (
				posts
					?.slice(0)
					.reverse()
					.map((post) => <PostExcerpt post={post} />)
			) : (
				postsStatus === "failed" && <h6>{postsError}</h6>
			)}
		</div>
	);
}
