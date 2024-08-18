import create from 'zustand';

const useSpaceStore = create((set) => ({
  refresh: false,
  toggleRefresh: () => set((state) => ({refresh: !state.refresh})),
}));

export default useSpaceStore;
