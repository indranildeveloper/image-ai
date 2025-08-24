"use client";

import { FC } from "react";
import { useSession, signOut } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  CreditCardIcon,
  CrownIcon,
  Loader2Icon,
  LogOutIcon,
} from "lucide-react";
import { usePaywall } from "@/features/subscriptions/hooks/usePaywall";
import { useBilling } from "@/features/subscriptions/api/useBilling";

const UserButton: FC = () => {
  const session = useSession();
  const paywall = usePaywall();
  const mutation = useBilling();

  const handleOpenBilling = () => {
    if (paywall.shouldBlock) {
      paywall.triggerPaywall();
      return;
    }

    mutation.mutate();
  };

  if (session.status === "loading") {
    return (
      <div>
        <Loader2Icon className="text-muted-foreground size-4 animate-spin" />
      </div>
    );
  }

  if (session.status === "unauthenticated" || !session.data) {
    return null;
  }

  const name = session.data.user?.name as string;
  const imageUrl = session.data.user?.image;

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="relative outline-none">
        {!paywall.shouldBlock && !paywall.isLoading && (
          <div className="absolute -top-1 -left-1 z-10 flex items-center justify-center">
            <div className="flex items-center justify-center rounded-full bg-white p-1 drop-shadow-sm">
              <CrownIcon className="size-3 fill-yellow-500 text-yellow-500" />
            </div>
          </div>
        )}
        <Avatar className="size-10 transition hover:opacity-75">
          <AvatarImage src={imageUrl ?? ""} alt={name} />
          <AvatarFallback className="bg-primary flex items-center justify-center font-medium text-white">
            {name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-60">
        <DropdownMenuItem
          disabled={mutation.isPending}
          onClick={handleOpenBilling}
          className="h-10"
        >
          <CreditCardIcon className="size-4" />
          Billing
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <DropdownMenuItem className="h-10" onClick={() => signOut()}>
          <LogOutIcon className="size-4" />
          Log Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
