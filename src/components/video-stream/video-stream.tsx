import { twMerge } from "tailwind-merge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface IProps {
  name: string;
  iconUrl: string;
  setCurrentSelectedStream: React.Dispatch<React.SetStateAction<number>>;
  index: number;
  currentSelectedStream: number;
}

const VideoStream = ({
  name,
  iconUrl,
  setCurrentSelectedStream,
  index,
  currentSelectedStream,
}: IProps) => {
  return (
    <div
      className={twMerge([
        "h-[8rem] flex transition-all duration-300 ease-in-out cursor-pointer hover:shadow-md rounded-lg",
        currentSelectedStream === index + 1
          ? "border p-1.5 border-primary"
          : null,
      ])}
    >
      <div
        className="flex flex-col items-center justify-center flex-1 p-4 rounded-lg cursor-pointer bg-secondary "
        onClick={() => setCurrentSelectedStream(index + 1)}
      >
        <Avatar className="">
          <AvatarImage src={iconUrl} alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <h4 className="text-lg">{name}</h4>
      </div>
    </div>
  );
};

export default VideoStream;
