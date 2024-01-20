import { CheckCircle2, Tv2 } from "lucide-react";
import React, { useRef, useState } from "react";
import { Button } from "../ui/button";

interface IProps {
  setPermissionCount: React.Dispatch<React.SetStateAction<number>>;
}

const ScreenRecordingCheck = ({ setPermissionCount }: IProps) => {
  const [screenPermission, setScreenPermission] = useState<boolean | null>(
    null
  );
  const videoRef = useRef<HTMLVideoElement>(null);
  const getScreenPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
      });
      setPermissionCount((prevState) => prevState + 1);
      setScreenPermission(true);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      setScreenPermission(false);
      console.error(err);
    }
  };
  //   useEffect(() => {
  //     getScreenPermission();
  //     return () => {
  //       if (videoRef.current && videoRef.current.srcObject) {
  //         let stream = videoRef.current.srcObject as MediaStream;
  //         stream.getTracks().forEach((track) => track.stop());
  //       }
  //     };
  //   }, []);

  return (
    <div className="flex items-center justify-between gap-12 p-4 border rounded-lg border-primary">
      <div className="flex items-center gap-2 ">
        <Tv2 className="text-primary" />
        <h3 className="text-lg">Screen Recording Permission</h3>
      </div>
      {screenPermission === true ? (
        <div className="px-6 py-2 border rounded-lg border-primary">
          <CheckCircle2 className="text-primary" />
        </div>
      ) : (
        <Button className="ml-2" onClick={getScreenPermission}>
          Allow
        </Button>
      )}
      {/* <video ref={videoRef} autoPlay /> */}
    </div>
  );
};

export default ScreenRecordingCheck;
