import { Camera, CheckCircle2 } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";

interface IProps {
  setPermissionCount: React.Dispatch<React.SetStateAction<number>>;
}

const VideoCheck = ({ setPermissionCount }: IProps) => {
  const [videoPermission, setVideoPermission] = React.useState<boolean | null>(
    null
  );
  const getVideoPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setVideoPermission(true);
      stream.getTracks().forEach((track) => track.stop()); // Stop the stream after you're done with it
      setPermissionCount((prevState) => prevState + 1);
    } catch (err) {
      setVideoPermission(false);
      console.error(err);
    }
  };
  // useEffect(() => {
  //   getVideoPermission();
  // }, []);

  return (
    <div className="flex items-center justify-between gap-8 p-4 border rounded-lg border-primary">
      <div className="flex items-center gap-2 ">
        <Camera className="text-primary" />
        <h3 className="text-lg">Video Permission</h3>
      </div>
      {videoPermission === true ? (
        <div className="px-6 py-2 border rounded-lg border-primary">
          <CheckCircle2 className="text-primary" />
        </div>
      ) : (
        <Button className="ml-2 rounded-lg" onClick={getVideoPermission}>
          Allow
        </Button>
      )}
    </div>
  );
};

export default VideoCheck;
