import create from "zustand";
import { devtools, persist } from "zustand/middleware";

const useStore = (set) => ({
  currentUser: [],
  isLoading: false,
  error: null,

  loginStart: () => {
    set((state) => ({
      isLoading: true,
    }));
  },
  loginSuccess: (data) => {
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
});

const useAuthStore = create(
  devtools(
    persist(useStore, {
      name: "currentUser",
    })
  )
);

export default useAuthStore;
