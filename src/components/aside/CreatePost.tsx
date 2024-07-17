"use client";
import { UploadDropzone } from "@/utils/uploadthing";
import { Textarea } from "../ui/textarea";
import { toast } from "../ui/use-toast";
import { Dispatch, SetStateAction, useState } from "react";
import CreatePostButton from "./CreatePostButton";
import { CreatePosts } from "@/actions/posts";

const CreatePost = ({
  setOpen,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [image, setImage] = useState<string | null>(null);

  const CreatePost = (data: FormData) => {
    const description = data.get("description") as string;

    if (!image) return;

    CreatePosts(image, description)
      .then(() => {
        setOpen(false);
        toast({
          variant: "success",
          description: "Post successfully created :)",
        });
      })
      .catch((err) => {
        toast({
          variant: "destructive",
          description: "Something went wrong, try agin :(",
        });
      });
  };

  return (
    <div className="min-h-[400px] w-full max-w-[1000px] flex items-center justify-center">
      {image ? (
        <form action={CreatePost} className="flex flex-col gap-2 flex-[1]">
          <label
            className="text-xl font-medium uppercase tracking-[1.3px]"
            htmlFor="desc"
          >
            Add description:
          </label>
          <Textarea
            id="desc"
            name="description"
            placeholder="Add description for your post"
            className="min-h-[200px] mb-4"
          />
          <CreatePostButton />
        </form>
      ) : (
        <div className="w-full flex flex-col gap-4">
          <UploadDropzone
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              setImage(res[0].url);
              toast({
                variant: "success",
                description: "Image uploaded successfully :)",
              });
            }}
            onUploadError={(error: Error) => {
              toast({
                variant: "destructive",
                description: "Something went wrong, try agin :(",
              });
            }}
          />
        </div>
      )}
    </div>
  );
};

export default CreatePost;
