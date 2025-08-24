"use client";

import { FC, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useFailSubscriptionModal } from "../store/useFailSubscriptionModal";
import { useSuccessSubscriptionModal } from "../store/useSuccessSubscriptionModal";

const SubscriptionAlert: FC = () => {
  const params = useSearchParams();
  const { onModalOpen: onOpenSuccessModal } = useSuccessSubscriptionModal();
  const { onModalOpen: onOpenFailModal } = useFailSubscriptionModal();

  const canceled = params.get("canceled");
  const success = params.get("success");

  useEffect(() => {
    if (success) {
      onOpenSuccessModal();
    }
    if (canceled) {
      onOpenFailModal();
    }
  }, [success, onOpenSuccessModal, canceled, onOpenFailModal]);

  return null;
};

export default SubscriptionAlert;
