import PostAuthor from "./PostAuthor";
import ReactionButtons from "./ReactionButtons";

export default function PostExcerpt({ post }) {
	return (
		<article key={post.id}>
			<h4>{post.title}</h4>
			<p>{post.body}</p>
			<PostAuthor userId={post.userId} />
			<ReactionButtons post={post} />
			<hr />
		</article>
	);
}
