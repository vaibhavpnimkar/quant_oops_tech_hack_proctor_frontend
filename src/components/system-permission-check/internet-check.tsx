import { CheckCircle2, Gauge } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../ui/button";

interface IProps {
  setPermissionCount: React.Dispatch<React.SetStateAction<number>>;
}

const InternetCheck = ({ setPermissionCount }: IProps) => {
  const [speedCheck, setSpeedCheck] = useState<boolean | null>(null);
  const [speed, setSpeed] = useState<number | null>(null);

  const checkInternetSpeed = async () => {
    const fileSizeInBytes = 11000000; // Size of file in bytes (7MB)
    const url =
      "https://drive.google.com/file/d/1TVAzEcOyKvMMSn9mG6dQ7rgdLV0m-m56/view?usp=sharing"; // URL of a test file of known size

    const startTime = Date.now();
    await fetch(url);
    const endTime = Date.now();

    const durationInSeconds = (endTime - startTime) / 1000;
    const bitsLoaded = fileSizeInBytes * 8;
    const speedMbps = Number(
      (bitsLoaded / durationInSeconds / (1024 * 1024)).toFixed(2)
    );

    if (speedMbps < 8) {
      setSpeedCheck(false);
    } else {
      setPermissionCount((prevState) => prevState + 1);
      setSpeedCheck(true);
    }
    setSpeed(Number(speedMbps));
  };
  //   useEffect(() => {
  //     checkInternetSpeed();
  //   }, []);

  return (
    <div className="flex items-center justify-between gap-8 p-4 border rounded-lg border-primary">
      <div className="flex items-center gap-2">
        <Gauge className="text-primary" />
        <h3 className="text-lg">Internet Speed Check</h3>
      </div>
      {speedCheck === true ? (
        <div className="px-6 py-2 border rounded-lg border-primary">
          <CheckCircle2 className="text-primary" />
        </div>
      ) : (
        <Button className="ml-2" onClick={checkInternetSpeed}>
          Allow
        </Button>
      )}
    </div>
  );
};

export default InternetCheck;
