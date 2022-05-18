import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = [
	{
		id: 1,
		title: "lorem ipsum dolor amet.",
		content: "asdf as df sadf asd fasd fas df asdf sad f sadf",
		reactions: {
			like: 0,
			heart: 0,
			wow: 0,
			cheers: 0,
		},
	},
	{
		id: 2,
		title: "amet ipsum dolor lorem.",
		content: "asdf as df sadf asd fasd fas df asdf sad f sadf",
		reactions: {
			like: 0,
			heart: 0,
			wow: 0,
			cheers: 0,
		},
	},
];

const postSlice = createSlice({
	name: "posts",
	initialState,
	reducers: {
		postAdded: {
			reducer(state, action) {
				state.push(action.payload);
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
			const existingPost = state.find((post) => post.id === postId);
			if (existingPost) {
				existingPost.reactions[reaction]++;
			}
		},
	},
});

// selectors
export const selectAllPosts = (state) => state.posts;

// actions
export const { postAdded, reactionAdded } = postSlice.actions;

// default reducer
export default postSlice.reducer;
