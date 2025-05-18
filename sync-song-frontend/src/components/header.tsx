import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="container mx-auto py-6">
      <div className="flex items-center justify-between">
        <Link className="flex items-center gap-2" href={"/"}>
          <div className="relative h-10 w-10">
            <div className="absolute h-full w-full animate-pulse rounded-full bg-white/20"></div>
            <div className="absolute inset-1 rounded-full bg-white"></div>
            <div className="absolute inset-2 rounded-full bg-purple-600"></div>
            <div className="absolute inset-4 rounded-full bg-white"></div>
          </div>
          <h1 className="text-2xl font-bold text-white">Sync Song</h1>
        </Link>
      </div>
    </header>
  );
};

export default Header;
