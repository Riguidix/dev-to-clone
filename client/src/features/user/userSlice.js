import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    username: '',
    email: '',
    profilePicture: '',
    website: '',
    bio: '',
    theme: ''
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser: (state, action) => {
            const {
                username,
                email,
                profilePicture,
                website,
                bio,
                theme
            } = action.payload;

            state.username = username;
            state.email = email;
            state.profilePicture = profilePicture;
            state.website = website;
            state.bio = bio;
            state.theme = theme;
        },
        changeTheme: (state, action) => {
            state.theme = action.payload;
        }
    }
});

export const { addUser, changeTheme } = userSlice.actions;
export default userSlice.reducer;