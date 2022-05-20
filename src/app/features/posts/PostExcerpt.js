import React from "react";
import { Link } from "react-router-dom";
import PostAuthor from "./PostAuthor";
import ReactionButtons from "./ReactionButtons";

let PostExcerpt = ({ post }) => {
	console.log("excerpts =>", post);
	return (
		<article key={post.id}>
			<Link to={`posts/${post.id}`}>
				<h4>{post.title}</h4>
			</Link>
			<p>{post.body}</p>
			<PostAuthor userId={post.userId} />
			<ReactionButtons post={post} />
			<hr />
		</article>
	);
};

export default PostExcerpt = React.memo(PostExcerpt);
