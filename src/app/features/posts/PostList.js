import { useSelector } from "react-redux";
import { selectAllPosts } from "./postSlice";

export default function PostList() {
	const posts = useSelector(selectAllPosts);

	return (
		<div>
			<h4>All Posts -</h4>
			{posts?.map((post) => (
				<article key={post.id}>
					<h5>{post.title}</h5>
					<p>{post.content.substring(0, 100)}</p>
					<hr />
				</article>
			))}
		</div>
	);
}
