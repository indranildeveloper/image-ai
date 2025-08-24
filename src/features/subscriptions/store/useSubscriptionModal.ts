import { create } from "zustand";
import { SubscriptionModalState } from "@/interfaces/SubscriptionModalState";

export const useSubscriptionModal = create<SubscriptionModalState>((set) => ({
  isModalOpen: false,
  onModalOpen: () => set({ isModalOpen: true }),
  onModalClose: () => set({ isModalOpen: false }),
}));
