import { CheckCircle2, LucideAudioLines } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";

interface IProps {
  setPermissionCount: React.Dispatch<React.SetStateAction<number>>;
}

const AudioCheck = ({ setPermissionCount }: IProps) => {
  const [audioPermission, setAudioPermission] = React.useState<boolean | null>(
    false
  );
  const getAdudioPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setAudioPermission(true);
      setPermissionCount((prevState) => prevState + 1);
      stream.getTracks().forEach((track) => track.stop()); // Stop the stream after you're done with it
    } catch (err) {
      setAudioPermission(false);
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-between gap-8 p-4 border rounded-lg border-primary">
      <div className="flex items-center gap-2 ">
        <LucideAudioLines className="text-primary" />
        <h3 className="text-lg">Audio Permission</h3>
      </div>
      {audioPermission === true ? (
        <div className="px-6 py-2 border rounded-lg border-primary">
          <CheckCircle2 className="text-primary" />
        </div>
      ) : (
        <Button className="ml-2" onClick={getAdudioPermission}>
          Allow
        </Button>
      )}
    </div>
  );
};

export default AudioCheck;
