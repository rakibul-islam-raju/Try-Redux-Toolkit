import { useSelector } from "react-redux";
import PostAuthor from "./PostAuthor";
import ReactionButtons from "./ReactionButtons";
import { getPostById, getPostStatus } from "./postSlice";
import { useParams } from "react-router-dom";

export default function SinglePostPage() {
	const { postId } = useParams();

	const post = useSelector((state) => getPostById(state, Number(postId)));
	const postsStatus = useSelector(getPostStatus);

	return (
		<article>
			{postsStatus === "loading" ? (
				<h4>Loading...</h4>
			) : (
				<>
					<h4>{post?.title}</h4>
					<p>{post?.body}</p>
					<PostAuthor userId={post?.userId} />
					<ReactionButtons post={post} />
					<hr />
				</>
			)}
		</article>
	);
}
