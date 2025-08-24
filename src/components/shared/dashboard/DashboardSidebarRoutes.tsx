"use client";

import { FC } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  CreditCardIcon,
  CrownIcon,
  HomeIcon,
  MessageCircleQuestionIcon,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import DashboardSidebarItem from "./DashboardSidebarItem";
import { usePaywall } from "@/features/subscriptions/hooks/usePaywall";
import { useCheckout } from "@/features/subscriptions/api/useCheckout";

const DashboardSidebarRoutes: FC = () => {
  const pathname = usePathname();
  const mutation = useCheckout();
  const paywall = usePaywall();

  return (
    <div className="flex flex-1 flex-col gap-y-4">
      {paywall.shouldBlock && !paywall.isLoading && (
        <>
          <div className="px-3">
            <Button
              variant="outline"
              size="lg"
              className="w-full cursor-pointer border-none transition hover:bg-white hover:opacity-75"
              disabled={mutation.isPending}
              onClick={() => mutation.mutate()}
            >
              <CrownIcon className="size-4 fill-yellow-500 text-yellow-500" />
              Upgrade to Image AI Pro
            </Button>
          </div>
          <div className="px-3">
            <Separator />
          </div>
        </>
      )}
      <ul className="flex flex-col gap-y-1 px-3">
        <DashboardSidebarItem
          href="/"
          icon={HomeIcon}
          label="Home"
          isActive={pathname === "/"}
        />
      </ul>
      <div className="px-3">
        <Separator />
      </div>
      <ul className="flex flex-col gap-y-1 px-3">
        <DashboardSidebarItem
          href={pathname}
          icon={CreditCardIcon}
          label="Billing"
          onClick={() => {}}
        />
        <DashboardSidebarItem
          href="mailto:indranilhalder.dev@gmail.com"
          icon={MessageCircleQuestionIcon}
          label="Get Help"
          onClick={() => {}}
        />
      </ul>
    </div>
  );
};

export default DashboardSidebarRoutes;
