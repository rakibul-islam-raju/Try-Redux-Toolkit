import { useDispatch } from "react-redux";
import { reactionAdded } from "./postSlice";

export default function ReactionButtons({ post }) {
	const dispatch = useDispatch();

	const reactionBtns = ["like", "heart", "wow", "cheers"];

	return (
		<div>
			{reactionBtns.map((reaction) => (
				<button
					key={reaction}
					type="button"
					onClick={() =>
						dispatch(
							reactionAdded({
								postId: post.id,
								reaction: reaction,
							})
						)
					}
				>
					{reaction} {post.reactions[reaction]}
				</button>
			))}
		</div>
	);
}
