import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

interface IProps {
  name: string;
  iconUrl: string;
}

const MainVideoStream = ({ name, iconUrl }: IProps) => {
  const [isScreenStream, setIsScreenStream] = useState(false);
  
  return (
    <div className="p-4 mt-8 border rounded-lg border-1 border-primary">
      <div className="flex flex-col items-center justify-center p-4 rounded-lg h-[24rem] bg-secondary">
        <Avatar className="">
          <AvatarImage src={iconUrl} alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <h4 className="text-lg">{name}</h4>
      </div>
      <div className="flex items-center justify-center mt-4">
        {isScreenStream ? (
          <Button
            className="my-auto "
            onClick={() => setIsScreenStream((prev) => !prev)}
          >
            Show Video
          </Button>
        ) : (
          <Button
            className="my-auto "
            onClick={() => setIsScreenStream((prev) => !prev)}
          >
            Show Screen
          </Button>
        )}
      </div>
    </div>
  );
};

export default MainVideoStream;
