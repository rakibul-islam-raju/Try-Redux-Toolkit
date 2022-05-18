import { createSlice } from "@reduxjs/toolkit";

const initialState = [
	{ id: 1, name: "John Doe" },
	{ id: 2, name: "Mike Tyson" },
	{ id: 3, name: "Tylor Durden" },
];

const userSlice = createSlice({
	name: "users",
	initialState,
	reducers: {},
});

// selectors
export const selectAllUsers = (state) => state.users;

// actions
// ---

// defaulr reducer
export default userSlice.reducer;
