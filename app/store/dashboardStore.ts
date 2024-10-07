import { create } from "zustand";

interface DashboardStore {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}
const useDashboardStore = create<DashboardStore>((set) => ({
  currentTab: "popular",
  setCurrentTab: (tab: string) => set({ currentTab: tab }),
}));

export default useDashboardStore;
