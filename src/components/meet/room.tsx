import { ws } from "@/lib/socket/ws";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { VideoPlayer } from "../video/video-player";
import { peer } from "@/lib/socket/peer";

const Room = () => {
  const { id } = useParams();
  const [stream, setStream] = useState<MediaStream>();
  const [streams, setStreams] = useState<any>({});
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    if (id !== undefined) {
      ws.emit("join-exam-room", {
        roomId: id,
        peerId: peer.id,
        type: "student",
      });
    }
  }, [id, peer.id]);

  const fillStreams = (data: any, stream: any) => {
    setFlag(!flag);
    data.map((peers: any) => {
      if (peers.peerId === peer.id) return;
      const call = peer.call(peers.peerId, stream);
      call.on("stream", (remoteStream) => {
        setStreams((prev: any) => {
          return {
            ...prev,
            [peers.peerId]: remoteStream,
          };
        });
      });
    });
  };
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
        peer.on("call", (call) => {
          call.answer(stream);
          call.on("stream", (remoteStream) => {
            setStreams((prev: any) => {
              return {
                ...prev,
                [call.peer]: remoteStream,
              };
            });
          });
        });

        ws.on("joined-exam-room", (data: any) => {
          setFlag(!flag);
          fillStreams(data, stream);
        });

        ws.on("leave-exam-room", (data: any) => {
          setFlag(!flag);
          setStreams({});
          fillStreams(data, stream);
        });
      });
  }, [id, flag]);

  return (
    <div>
      Room Id : {id}
      <div>
        <div>
          <div>Me</div>
          <div>{peer.id}</div>
        </div>
        <VideoPlayer classNames="" stream={stream} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        {/* <VideoPlayer classNames="" stream={remoteStream} /> */}
        {/* {streams.map((stream: any) => (
          <div key={stream.id}>
            <div className="">{stream.id}</div>
            <VideoPlayer classNames="" stream={stream.stream} />
          </div>
        ))} */}
        {Object.keys(streams).map((key) => (
          <div key={key}>
            {streams[key] == undefined || streams[key] == null ? (
              <></>
            ) : (
              <>
                <div className="">{key}</div>
                <VideoPlayer classNames="" stream={streams[key]} />
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Room;
