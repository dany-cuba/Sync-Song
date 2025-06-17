"use client";

import { cn } from "@/lib/utils";
import { Check, CopyIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";

const RoomHeader = () => {
  const [isCopied, setIsCopied] = useState(false);

  const { id } = useParams();

  const handleCopy = async () => {
    await navigator.clipboard.writeText(id as string);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    id && (
      <span className="flex items-center text-sm gap-2 text-black bg-purple-200 rounded-lg px-2 py-1">
        Sala: {id}
        <button
          className="rounded bg-purple-900 relative size-6 overflow-hidden"
          onClick={handleCopy}
        >
          <Check
            className={cn(
              "size-4 text-purple-200 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300",
              isCopied ? "opacity-100" : "opacity-0"
            )}
          />
          <CopyIcon
            className={cn(
              "size-4 text-purple-200 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300",
              isCopied ? "opacity-0" : "opacity-100"
            )}
          />
        </button>
      </span>
    )
  );
};

export default RoomHeader;
