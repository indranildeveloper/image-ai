"use client";

import { FC } from "react";
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
import { Separator } from "@/components/ui/separator";
import { CheckCircle2Icon } from "lucide-react";
import { useSubscriptionModal } from "../store/useSubscriptionModal";
import { useCheckout } from "../api/useCheckout";

const SubscriptionModal: FC = () => {
  const { isModalOpen, onModalClose } = useSubscriptionModal();
  const checkoutMutation = useCheckout();

  return (
    <Dialog open={isModalOpen} onOpenChange={onModalClose}>
      <DialogContent>
        <DialogHeader className="flex items-center space-y-4">
          <Image src="/logo.svg" alt="Logo" width={36} height={36} />
          <DialogTitle className="text-center">
            Upgrade to a paid plan.
          </DialogTitle>
          <DialogDescription className="text-center">
            Upgrade to a paid plan to unlock more features.
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <ul className="space-y-2">
          <li className="flex items-center">
            <CheckCircle2Icon className="fill-primary mr-2 size-5 text-white" />
            <p className="text-muted-foreground text-sm">Unlimited Projects</p>
          </li>
          <li className="flex items-center">
            <CheckCircle2Icon className="fill-primary mr-2 size-5 text-white" />
            <p className="text-muted-foreground text-sm">Unlimited Templates</p>
          </li>
          <li className="flex items-center">
            <CheckCircle2Icon className="fill-primary mr-2 size-5 text-white" />
            <p className="text-muted-foreground text-sm">
              AI Background Removal
            </p>
          </li>
          <li className="flex items-center">
            <CheckCircle2Icon className="fill-primary mr-2 size-5 text-white" />
            <p className="text-muted-foreground text-sm">AI Image Generation</p>
          </li>
        </ul>
        <DialogFooter className="mt-4 gap-y-2">
          <Button
            onClick={() => checkoutMutation.mutate()}
            disabled={checkoutMutation.isPending}
            className="w-full"
          >
            Upgrade
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SubscriptionModal;
