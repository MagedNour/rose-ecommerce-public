import { Spinner } from "@/components/common/spinner";
import React from "react";

export default function loading() {
  return <Spinner className="size-20 min-h-screen text-custom-rose-900" show={true} />;
}
