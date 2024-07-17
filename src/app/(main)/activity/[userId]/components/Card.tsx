import Image from "next/image";

const Card = ({ image }: { image: string }) => {
  return (
    <Image
      src={image}
      width={400}
      height={400}
      alt="user-posts"
      className="object-contain rounded cursor-pointer max-w-[400px] max-h-[400px] bg-black border border-gray-500 flex-1"
    />
  );
};

export default Card;
