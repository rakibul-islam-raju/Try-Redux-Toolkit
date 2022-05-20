import { createSlice, createAsyncThunk, nanoid } from "@reduxjs/toolkit";
import axios from "axios";

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

const initialState = {
	posts: [],
	status: "idle", // 'loading' || 'succeeded' || 'failed'
	error: null,
	counter: 0,
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
	const response = await axios.get(POSTS_URL);
	return response.data;
});

export const addNewPosts = createAsyncThunk(
	"posts/addNewPosts",
	async (initialPosts) => {
		const response = await axios.post(POSTS_URL, initialPosts);
		return response.data;
	}
);

const postSlice = createSlice({
	name: "posts",
	initialState,
	reducers: {
		postAdded: {
			reducer(state, action) {
				state.posts.push(action.payload);
			},
			prepare(postData) {
				return {
					payload: {
						id: nanoid,
						title: postData.title,
						content: postData.content,
						userId: Number(postData.userId),
						reactions: {
							like: 0,
							heart: 0,
							wow: 0,
							cheers: 0,
						},
					},
				};
			},
		},

		reactionAdded(state, action) {
			const { postId, reaction } = action.payload;
			const existingPost = state.posts.find((post) => post.id === postId);
			if (existingPost) {
				existingPost.reactions[reaction]++;
			}
		},

		counterAdded(state, action) {
			state.counter += 1;
		},
	},
	extraReducers(builder) {
		builder
			.addCase(fetchPosts.pending, (state, action) => {
				state.status = "loading";
			})
			.addCase(fetchPosts.fulfilled, (state, action) => {
				state.status = "succeeded";
				const loadedPosts = action.payload.map((post) => {
					post.reactions = {
						like: 0,
						heart: 0,
						wow: 0,
						cheers: 0,
					};
					return post;
				});

				// add any fatched post to the array
				state.posts = state.posts.concat(loadedPosts);
			})
			.addCase(fetchPosts.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			})
			.addCase(addNewPosts.pending, (state, action) => {
				state.status = "loading";
			})
			.addCase(addNewPosts.fulfilled, (state, action) => {
				state.status = "succeeded";
				action.payload.reactions = {
					like: 0,
					heart: 0,
					wow: 0,
					cheers: 0,
				};
				state.posts.push(action.payload);
			});
	},
});

// selectors
export const selectAllPosts = (state) => state.posts.posts;
export const getPostStatus = (state) => state.posts.status;
export const getPostError = (state) => state.posts.error;
export const getCounter = (state) => state.posts.counter;

export const getPostById = (state, postId) =>
	state.posts.posts.find((post) => post.id === postId);

// actions
export const { postAdded, reactionAdded, counterAdded } = postSlice.actions;

// default reducer
export default postSlice.reducer;
