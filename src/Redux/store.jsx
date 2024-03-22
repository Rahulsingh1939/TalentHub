import usersSlice from "./userSlice.jsx";
import { configureStore } from "@reduxjs/toolkit";
import loaderSlice  from "./loaderSlice.jsx";

const store = configureStore({
    reducer: {
        users: usersSlice,
        loader : loaderSlice
    }
});

export default store;