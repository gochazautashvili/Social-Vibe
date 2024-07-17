"use client";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

const CreatePostButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} className="flex">
      {pending ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin mr-3" /> Loading...
        </>
      ) : (
        "Share"
      )}
    </Button>
  );
};

export default CreatePostButton;
