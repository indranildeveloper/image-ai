"use client";

import { FC, useEffect, useState } from "react";
import SubscriptionModal from "@/features/subscriptions/components/SubscriptionModal";

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
    </>
  );
};

export default Modals;
