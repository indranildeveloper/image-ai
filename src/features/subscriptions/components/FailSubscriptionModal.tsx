"use client";

import { FC } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useFailSubscriptionModal } from "../store/useFailSubscriptionModal";

const FailSubscriptionModal: FC = () => {
  const router = useRouter();
  const { isModalOpen, onModalClose } = useFailSubscriptionModal();

  const handleModalClose = () => {
    router.replace("/");
    onModalClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleModalClose}>
      <DialogContent>
        <DialogHeader className="flex items-center space-y-4">
          <Image src="/logo.svg" alt="Logo" width={36} height={36} />
          <DialogTitle className="text-center">
            Something went Wrong.
          </DialogTitle>
          <DialogDescription className="text-center">
            We could not process your payment.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4 gap-y-2">
          <Button onClick={handleModalClose} className="w-full">
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FailSubscriptionModal;
