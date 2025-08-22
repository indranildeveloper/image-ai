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
import { CreditCardIcon, Loader2Icon, LogOutIcon } from "lucide-react";

const UserButton: FC = () => {
  const session = useSession();

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
      <DropdownMenuTrigger>
        {/* TODO: Add crown if user is premium */}
        <Avatar className="size-10 transition hover:opacity-75">
          <AvatarImage src={imageUrl ?? ""} alt={name} />
          <AvatarFallback className="bg-primary flex items-center justify-center font-medium text-white">
            {name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-60">
        <DropdownMenuItem disabled={false} onClick={() => {}} className="h-10">
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
