import { useSelector } from "react-redux";
import PostAuthor from "./PostAuthor";
import { selectAllPosts } from "./postSlice";
import ReactionButtons from "./ReactionButtons";

export default function PostList() {
	const posts = useSelector(selectAllPosts);

	return (
		<div>
			<h4>All Posts -</h4>
			{posts?.map((post) => (
				<article key={post.id}>
					<h5>{post.title}</h5>
					<p>{post.content.substring(0, 100)}</p>
					<PostAuthor userId={post.userId} />
					<ReactionButtons post={post} />
					<hr />
				</article>
			))}
		</div>
	);
}
