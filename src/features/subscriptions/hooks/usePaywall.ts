import { useSubscriptionModal } from "../store/useSubscriptionModal";

export const usePaywall = () => {
  const subscriptionModal = useSubscriptionModal();

  // TODO: fetch from API
  const shouldBlock = true;

  return {
    // TODO: fetch from react query
    isLoading: false,
    shouldBlock,
    triggerPaywall: () => {
      subscriptionModal.onModalOpen();
    },
  };
};
