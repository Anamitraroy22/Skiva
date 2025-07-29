// src/components/Loader.tsx
import React from "react";

export function Loader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 dark:bg-black/60 backdrop-blur-sm">
      <div className="h-12 w-12 rounded-full animate-spin border-4 border-blue-500 border-t-transparent shadow-inner" />
    </div>
  );
}
