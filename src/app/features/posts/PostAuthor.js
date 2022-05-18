import { useSelector } from "react-redux";
import { selectAllUsers } from "../users/userSlice";

export default function PostAuthor({ userId }) {
	const users = useSelector(selectAllUsers);

	const author = users.find((user) => user.id === Number(userId));

	console.log("author", author);

	return <span>by {author ? author.name : "unknown author"}</span>;
}
