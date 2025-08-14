"use client";

import { FC } from "react";
import QueryProvider from "./QueryProvider";
import { ProvidersProps } from "@/interfaces/ProvidersProps";

const Providers: FC<ProvidersProps> = ({ children }) => {
  return <QueryProvider>{children}</QueryProvider>;
};

export default Providers;
