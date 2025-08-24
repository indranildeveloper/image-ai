import { create } from "zustand";
import { SuccessSubscriptionModalState } from "@/interfaces/SuccessSubscriptionModalState";

export const useSuccessSubscriptionModal =
  create<SuccessSubscriptionModalState>((set) => ({
    isModalOpen: false,
    onModalOpen: () => set({ isModalOpen: true }),
    onModalClose: () => set({ isModalOpen: false }),
  }));
