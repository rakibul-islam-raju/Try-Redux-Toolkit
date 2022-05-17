import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = [
	{
		id: 1,
		title: "lorem ipsum dolor amet.",
		content: "asdf as df sadf asd fasd fas df asdf sad f sadf",
	},
	{
		id: 2,
		title: "amet ipsum dolor lorem.",
		content: "asdf as df sadf asd fasd fas df asdf sad f sadf",
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
					},
				};
			},
		},
	},
});

// selectors
export const selectAllPosts = (state) => state.posts;

// actions
export const { postAdded } = postSlice.actions;

// default reducer
export default postSlice.reducer;
