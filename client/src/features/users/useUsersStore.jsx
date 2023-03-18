import axios from "axios";
import create from "zustand";

const API_URL = "http://localhost:9999/api/user";

const useUsersStore = create((set) => ({
  users: [],
  isLoading: false,
  error: null,
  loading: () => {
    set((state) => ({
      isLoading: true,
    }));
  },

  getUser: async (data) => {
    set((state) => ({
      isLoading: true,
      users: data,
    }));
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
}));

export default useUsersStore;
