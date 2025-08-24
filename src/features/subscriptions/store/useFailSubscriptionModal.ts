import { create } from "zustand";
import { FailSubscriptionModalState } from "@/interfaces/FailSubscriptionModalState";

export const useFailSubscriptionModal = create<FailSubscriptionModalState>(
  (set) => ({
    isModalOpen: false,
    onModalOpen: () => set({ isModalOpen: true }),
    onModalClose: () => set({ isModalOpen: false }),
  }),
);
