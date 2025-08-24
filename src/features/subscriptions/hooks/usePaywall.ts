import { useSubscriptionModal } from "../store/useSubscriptionModal";
import { useGetSubscription } from "../api/useGetSubscription";

export const usePaywall = () => {
  const subscriptionModal = useSubscriptionModal();
  const { data: subscription, isLoading: isLoadingSubscription } =
    useGetSubscription();

  const shouldBlock = isLoadingSubscription || !subscription?.isActive;

  return {
    isLoading: isLoadingSubscription,
    shouldBlock,
    triggerPaywall: () => {
      subscriptionModal.onModalOpen();
    },
  };
};
