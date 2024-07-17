import Image from "next/image";

const Card = ({
  image,
  description,
}: {
  image: string;
  description: string;
}) => {
  return (
    <div className="flex-1 h-[200px] md:h-[260px] basis-[200px] max-w-[400px]">
      <Image
        width={400}
        height={400}
        src={image}
        alt={description}
        className="bg-black dark:bg-slate-900 rounded cursor-pointer h-full w-full object-contain"
      />
    </div>
  );
};

export default Card;
