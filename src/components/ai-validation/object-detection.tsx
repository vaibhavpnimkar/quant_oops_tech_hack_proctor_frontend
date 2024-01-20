import { accuracyThreshold, poseAccuracyThreshold } from "@/constants/utils";
import { peer } from "@/lib/socket/peer";
import { ws } from "@/lib/socket/ws";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import * as posenet from "@tensorflow-models/posenet";
import * as handpose from "@tensorflow-models/handpose";
import "@tensorflow/tfjs";
import throttle from "lodash.throttle";
import { CheckCircle, MessageSquareWarning } from "lucide-react";
import { useEffect, useRef } from "react";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import { twMerge } from "tailwind-merge";

var count_facedetect = 0;
interface IProps {
  className?: string;
}

export const ObjectDetection = ({ className }: IProps) => {
  const videoRef: any = useRef();
  const { id } = useParams();

  const showToast = (message: string, icon: string) => {
    toast(
      <p className="flex items-center">
        {icon === "success" ? (
          <CheckCircle className="w-6 h-6 text-green-500" />
        ) : (
          <MessageSquareWarning className="w-6 h-6 text-red-500" />
        )}
        &nbsp; {message}
      </p>,
      {
        duration: 5000,
      }
    );
  };

  const detectFrame = (video: any, model: any) => {
    model.detect(video).then((predictions: any) => {
      renderPredictions(predictions);
      // requestAnimationFrame(() => {
      //   detectFrameThrottle.current(video, model);
      // });
    });
  };

  const detectPose = (video: any, model: any) => {
    model.estimateSinglePose(video).then((pose: any) => {
      EarsDetect(pose["keypoints"], poseAccuracyThreshold);
      // requestAnimationFrame(() => {
      //   detectPoseThrottle.current(video, model);
      // });
    });
  };

  const detectHandPose = (video: any, net: any) => {
    net.estimateHands(video).then((predictions: any) => {
      if (predictions.length > 0) {
        handleObjectDetectedEvent("Hand Movement Detected");
        showToast("Hand Movement Detected", "error");
      }
    });
  };

  const detectFrameThrottle = useRef(throttle(detectFrame, 2500));
  const detectPoseThrottle = useRef(throttle(detectPose, 2500));
  const detectHandPoseThrottle = useRef(throttle(detectHandPose, 2500));

  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      const webCamPromise = navigator.mediaDevices
        .getUserMedia({
          audio: true,
          video: {
            facingMode: "user",
          },
        })
        .then((stream) => {
          peer.on("call", (call) => {
            call.answer(stream);
            call.on("stream", () => {});
          });
          // window.stream = stream;
          ws.on("new_student_joined", ({ room }: any) => {
            room
              .filter((user: any) => user.type === "proctor")
              .map((peers: any) => {
                peer.call(peers.peerId, stream);
              });
          });
          if (id !== undefined && peer.id) {
            ws.emit("join_exam_room", {
              roomId: id,
              peerId: peer.id,
              type: "student",
            });
          }

          videoRef.current.srcObject = stream;
          return new Promise((resolve, reject) => {
            videoRef.current.onloadedmetadata = () => {
              resolve(
                videoRef.current.play().then(() => {
                  resolve(videoRef.current);
                })
              );
            };
          });
        });
      const objectModelPromise = cocoSsd.load();
      const poseNetModelPromise = posenet.load();
      const handPoseModelPromise = handpose.load();

      Promise.all([
        objectModelPromise,
        poseNetModelPromise,
        handPoseModelPromise,
        webCamPromise,
      ])
        .then((values) => {
          setInterval(() => {
            detectFrameThrottle.current(videoRef.current, values[0]);
            detectPoseThrottle.current(videoRef.current, values[1]);
            detectHandPoseThrottle.current(videoRef.current, values[2]);
          }, 200);
        })
        .catch((error) => {
          //console.error(error);
        });
      return () => {
        ws.off("new_student_joined");
      };
    }
  }, [peer.id, id]);

  const renderPredictions = (predictions: any) => {
    predictions.forEach((prediction: any) => {
      var multiple_face = 0;

      for (let i = 0; i < predictions.length; i++) {
        if (prediction.class == "person") {
          multiple_face = multiple_face + 1;
          if (multiple_face >= 2) {
            renderToastThrottle.current();
            handleObjectDetectedEvent("Multiple face detected");
          }
        }
      }
      if (prediction.score >= accuracyThreshold) {
        if (prediction.class === "cell phone") {
          handleObjectDetectedEvent("Cell Phone Detected");
          showToast("Cell Phone Detected", "error");

          count_facedetect = count_facedetect + 1;
        } else if (prediction.class === "book") {
          handleObjectDetectedEvent("Book Detected");
          showToast("Book Detected", "error");

          count_facedetect = count_facedetect + 1;
        } else if (prediction.class === "laptop") {
          handleObjectDetectedEvent("Laptop Detected");
          showToast("Laptop Detected", "error");
          count_facedetect = count_facedetect + 1;
        } else if (prediction.class !== "person") {
          handleObjectDetectedEvent(`${prediction.class} Detected`);
          showToast(`${prediction.class} Detected`, "error");

          count_facedetect = count_facedetect + 1;
        }
      }
    });

    sessionStorage.setItem("count_facedetect", count_facedetect as any);
  };

  const renderToastThrottle = useRef(
    throttle(() => showToast("Multiple Faces Detected", "error"), 1000)
  );

  const handleLookedAwaySocketEvent = () => {
    ws.emit("looked_away", {
      examId: id,
      studentId: localStorage.getItem("userId"),
      activity: "User Looked Away",
    });
  };

  const handleObjectDetectedEvent = (activity: string) => {
    ws.emit("object_detected", {
      examId: id,
      studentId: localStorage.getItem("userId"),
      activity: activity,
    });
  };

  const EarsDetect = (keypoints: any, minConfidence: any) => {
    const keypointEarR = keypoints[3];
    const keypointEarL = keypoints[4];

    if (keypointEarL.score < minConfidence) {
      handleLookedAwaySocketEvent();
      showToast("User Looked Away", "error");
    }
    if (keypointEarR.score < minConfidence) {
      handleLookedAwaySocketEvent();
      showToast("User Looked Away", "error");
    }
  };

  return (
    <div
      className={twMerge([
        "relative aspect-video rounded-lg overflow-hidden ",
        className,
      ])}
    >
      <video
        className={
          "absolute top-0 start-0w-full h-full object-cover -scale-x-100"
        }
        autoPlay
        playsInline
        muted
        ref={videoRef}
      />
    </div>
  );
};