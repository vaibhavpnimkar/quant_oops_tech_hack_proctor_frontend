import { useCallback, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { Button } from "../ui/button";

export const WebCamComponent = () => {
  const [deviceId, setDeviceId] = useState({});
  const [show, setShow] = useState(false);
  const [devices, setDevices] = useState([]);
  const webcamRef: any = useRef(null);

  const handleDevices = useCallback(
    (mediaDevices: any) =>
      setDevices(mediaDevices.filter(({ kind }: any) => kind === "videoinput")),
    [setDevices]
  );

  const capture = useCallback(() => {
    const imageSrc = webcamRef?.current?.getScreenshot();
    console.log(imageSrc);
  }, [webcamRef]);

  useEffect(() => {
    navigator?.mediaDevices?.enumerateDevices()?.then(handleDevices);
  }, [handleDevices]);

  return (
    <>
      {show && (
        <Webcam
          className="rounded-lg"
          mirrored={true}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          audio={false}
          allowFullScreen={true}
          videoConstraints={{ deviceId: deviceId, facingMode: "user" }}
        />
      )}
      <Button onClick={capture}>Capture photo</Button>
      <Button onClick={() => setShow(!show)}>Show</Button>
    </>
  );
};
