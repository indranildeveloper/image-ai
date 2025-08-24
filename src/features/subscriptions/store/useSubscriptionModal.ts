import { SubscriptionModalState } from "@/interfaces/SubscriptionModalState";
import { create } from "zustand";

export const useSubscriptionModal = create<SubscriptionModalState>((set) => ({
  isModalOpen: false,
  onModalOpen: () => set({ isModalOpen: true }),
  onModalClose: () => set({ isModalOpen: false }),
}));
