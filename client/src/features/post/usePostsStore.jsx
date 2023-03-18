import axios from "axios";
import create from "zustand";
import { devtools } from "zustand/middleware";

const API_URL = "http://localhost:9999/api/post";

const usePostsStore = create(
  devtools((set) => ({
    posts: [],
    isLoading: false,
    error: null,
    fetchAllPost: async () => {
      try {
        set((state) => ({
          isLoading: true,
        }));

        const response = await axios.get(`${API_URL}/getAllPosts`);
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
    addPost: async (post) => {
      try {
        set((state) => ({
          isLoading: true,
        }));

        const response = await axios.post(`${API_URL}/addPost`, post);
        console.log(response.data);
        set((state) => ({
          isLoading: false,
          posts: response.data,
        }));
      } catch (err) {
        set((state) => ({
          error: err,
        }));
      }
    },
  }))
);

export default usePostsStore;
