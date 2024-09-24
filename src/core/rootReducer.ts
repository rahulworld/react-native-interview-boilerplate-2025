import { createSlice } from "@reduxjs/toolkit";

const randomUserSlice = createSlice({
    name: "users",
    initialState: {
            randomUsers: [],
            page: 1,
    },
    reducers: {
        setRandomUsers: (state, action) => {
            let users: any = [];
            users = [...state.randomUsers, ...action.payload]
            state.randomUsers = users;
        },
        setPage: (state, action) => {
            state.page = action.payload;
        }
    }
});

// export { setRandomUsers } = randomUserSlice.actions;
export const {setRandomUsers, setPage} = randomUserSlice.actions;

export default randomUserSlice.reducer;