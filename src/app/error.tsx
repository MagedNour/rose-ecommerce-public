"use client";

import { ErrorProps } from "@/lib/types/route-props";
import { useEffect } from "react";

export default function Error({ error, reset }: ErrorProps) {
  // Log the error to the console
  useEffect(() => {
    console.error("An error occurred:", error);
  }, [error]);

  return (
    <html>
      <body>
        <main className="h-screen flex flex-col items-center justify-center bg-gray-100 text-center">
          {/* Headline */}
          <h1 className="text-3xl font-bold text-red-600">Something went wrong!</h1>

          {/* Message */}
          <p className="text-lg text-gray-700 mt-4">{error.message}</p>

          {/* Try again */}
          <button
            className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => reset()}
          >
            Try Again
          </button>
        </main>
      </body>
    </html>
  );
}
