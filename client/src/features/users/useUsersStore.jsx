import axios from "axios";
import create from "zustand";
import { devtools, persist } from "zustand/middleware";

const API_URL = "http://localhost:9999/api/user";

const usersStore = (set) => ({
  users: [],
  currentUser: [],
  isLoading: false,
  error: null,

  loginStart: () => {
    set((state) => ({
      isLoading: true,
    }));
  },

  loginSuccess: (data) => {
    console.log(data);
    set((state) => ({
      currentUser: data,
      isLoading: false,
    }));
  },
  loginError: (error) => {
    set((state) => ({
      isLoading: false,
      error: error,
    }));
  },
  logout: () => {
    set((state) => ({
      currentUser: null,
      isLoading: true,
    }));
  },

  getUser: async (user_uid) => {
    set((state) => ({
      isLoading: true,
    }));

    await axios
      .get(`${API_URL}/getUser/${user_uid}`)
      .then((response) => {
        console.log(response.data);

        set((state) => ({
          isLoading: false,
          users: response.data,
        }));
      })
      .catch((err) => {
        set((state) => ({
          error: err,
        }));
      });
  },
  getAllUsers: async (user_uid) => {
    set((state) => ({
      isLoading: true,
    }));

    await axios
      .get(`${API_URL}/users`)
      .then((response) => {
        console.log(response.data);

        set((state) => ({
          isLoading: false,
          users: response.data,
        }));
      })
      .catch((err) => {
        set((state) => ({
          error: err,
        }));
      });
  },
});

const useUsersStore = create(
  devtools(
    persist(usersStore, {
      name: "currentUser",
    })
  )
);

export default useUsersStore;
