import AddPostForm from "./app/features/posts/AddPostForm";
import PostList from "./app/features/posts/PostList";

export default function App() {
	return (
		<div className="App">
			<AddPostForm />
			<br />
			<PostList />
		</div>
	);
}
