import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { fetchUsers } from "./app/features/users/userSlice";
import SinglePostPage from "./app/features/posts/SinglePostPage";
import { fetchPosts } from "./app/features/posts/postSlice";

store.dispatch(fetchUsers());
store.dispatch(fetchPosts());

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<Provider store={store}>
		<BrowserRouter>
			<Routes>
				<Route index element={<App />} />
				<Route path="posts/:postId" element={<SinglePostPage />} />
			</Routes>
		</BrowserRouter>
	</Provider>
);

reportWebVitals();
