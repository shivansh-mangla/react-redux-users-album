import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const removeUser = createAsyncThunk('users/delete', async (user) => {
    const response = await axios.delete(`http://localhost:3005/users/${user.id}`);

    // DEV ONLY!!!

  await pause(2000);

    return user;
})


// DEV ONLY!!!
const pause = (duration) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};

export { removeUser }