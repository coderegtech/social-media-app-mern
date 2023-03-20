import create from "zustand";

const useUsersStore = create((set) => ({
  users: [],
  isLoading: false,
  error: null,
  loading: () => {
    set((state) => ({
      isLoading: true,
    }));
  },
  isError: (data) => {
    set((state) => ({
      error: data,
    }));
  },
  getUser: async (data) => {
    set((state) => ({
      isLoading: false,
      users: data,
    }));
  },
}));

export default useUsersStore;
