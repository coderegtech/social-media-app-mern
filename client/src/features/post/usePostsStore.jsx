import axios from "axios";
import create from "zustand";
import { devtools } from "zustand/middleware";

const API_URL = "http://localhost:9999/api/post";

const usePostsStore = create(
  devtools((set) => ({
    posts: [],
    isLoading: false,
    error: null,
    fetching: () => {
      set((state) => ({
        isLoading: true,
      }));
    },
    isError: (errorText) => {
      set((state) => ({
        isLoading: true,
        error: errorText,
      }));
    },
    fetchAllPost: (data) => {
      console.log(data);
      set((state) => ({
        isLoading: false,
        posts: data,
      }));
    },
    addPost: (data) => {
      set((state) => ({
        isLoading: false,
        posts: data,
      }));
    },
    fetchUserPost: async (user_uid) => {
      try {
        set((state) => ({
          isLoading: true,
        }));

        const response = await axios.get(`${API_URL}/getUserPost/${user_uid}`);
        console.log(response.data);
        set((state) => ({
          isLoading: false,
          posts: response.data,
        }));
      } catch (err) {
        set((state) => ({
          error: err,
          isLoading: false,
        }));
      }
    },
  }))
);

export default usePostsStore;
