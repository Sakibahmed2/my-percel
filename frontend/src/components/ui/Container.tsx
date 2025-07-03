import { cn } from "@/utils/cn";
import React from "react";

const Container = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("w-full max-w-[1400px] mx-auto px-4", className)}>
      {children}
    </div>
  );
};

export default Container;
