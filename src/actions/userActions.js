import axios from 'axios';
import { FETCH_USERS_SUCCESS, ADD_USER, EDIT_USER, DELETE_USER } from '../constants/actionTypes';

// Fetch users
export const fetchUsers = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      dispatch({ type: FETCH_USERS_SUCCESS, payload: response.data });
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
};

// Add a new user
export const addUser = (user) => ({
  type: ADD_USER,
  payload: user
});

// Edit a user
export const editUser = (id, updatedUser) => ({
  type: EDIT_USER,
  payload: { id, updatedUser }
});

// Delete a user
export const deleteUser = (id) => ({
  type: DELETE_USER,
  payload: id
});
