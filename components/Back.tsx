"use client";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

const GoBack = () => {
  const { back } = useRouter();
  return (
    <Button
      onClick={back}
      className="cursor-pointer bg-transparent text-black !px-0 !mx-0 hover:bg-transparent"
    >
      <ArrowLeft size={18} className="mb-1" />
    </Button>
  );
};

export default GoBack;
