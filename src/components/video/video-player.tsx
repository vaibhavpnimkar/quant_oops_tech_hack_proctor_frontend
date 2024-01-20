import { useEffect, useRef } from "react";

export const VideoPlayer: React.FC<{
  stream?: MediaStream;
  className: string;
}> = ({ stream, className }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && stream) videoRef.current.srcObject = stream;
  }, [stream]);
  return (
    <video
      data-testid="peer-video"
      className={`${className} -scale-x-100`}
      ref={videoRef}
      autoPlay
    />
  );
};
