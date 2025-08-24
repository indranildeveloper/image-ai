"use client";

import { FC, useEffect, useState } from "react";
import SubscriptionModal from "@/features/subscriptions/components/SubscriptionModal";
import SuccessSubscriptionModal from "@/features/subscriptions/components/SuccessSubscriptionModal";
import FailSubscriptionModal from "@/features/subscriptions/components/FailSubscriptionModal";

const Modals: FC = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <SubscriptionModal />
      <SuccessSubscriptionModal />
      <FailSubscriptionModal />
    </>
  );
};

export default Modals;
