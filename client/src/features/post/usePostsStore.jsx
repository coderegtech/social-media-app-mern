import create from "zustand";
import { devtools } from "zustand/middleware";

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
    fetchUserPost: (data) => {
      set((state) => ({
        isLoading: false,
        posts: data,
      }));
    },
    deletePost: (id) => {
      set((state) => ({
        isLoading: false,
        posts: state.posts.filter((post) => post._id != id),
      }));
    },
  }))
);

export default usePostsStore;
