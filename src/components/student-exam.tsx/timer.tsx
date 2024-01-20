import { studentExamState } from "@/atoms/student-exam-state";
import { Pause, TimerIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { useFinishExamMutation } from "../api";
import { Button } from "../ui/button";

const findTimeString = (timer: number) => {
  const seconds = timer % 60 < 10 ? `0${timer % 60}` : `${timer % 60}`;
  const minutes =
    Math.floor(timer / 60) % 60 < 10
      ? `0${Math.floor(timer / 60) % 60}`
      : `${Math.floor(timer / 60) % 60}`;

  const hours =
    Math.floor(timer / 3600) < 10
      ? `0${Math.floor(timer / 3600)}`
      : `${Math.floor(timer / 3600)}`;

  return `${hours}:${minutes}:${seconds}`;
};

const Timer = ({}) => {
  const [timer, setTimer] = useState<number | null>(null);
  const timerRef = useRef<{ id: NodeJS.Timeout | null }>({ id: null });
  const { mutate: finishExamFn } = useFinishExamMutation();
  const navigate = useNavigate();
  const examState = useRecoilValue(studentExamState);
  const endExamAttempt = () => {
    finishExamFn(
      {
        body: { examId: examState.examInfo?.id },
      },
      {
        onSuccess: (data) => {
          console.log(data);
          navigate("/student/account/profile");
        },
        onError: (error) => {
          console.log(error);
        },
      }
    );
  };

  useEffect(() => {
    if (!examState.examInfo) return;
    let end_date = new Date(examState.examInfo?.startTime).getTime();
    end_date += examState.examInfo?.duration * 60 * 1000;
    console.log(end_date, Date.now());

    if (end_date <= Date.now()) {
      // endExamAttempt();
      return;
    }
    setTimer(Math.floor((end_date - Date.now()) / 1000));
    timerRef.current.id = setInterval(() => {
      setTimer((prev) => {
        if (prev === null) return null;
        return prev - 1;
      });
    }, 1000);
    return () => {
      if (timerRef.current.id) clearInterval(timerRef.current.id);
    };
  }, [examState.examInfo]);

  useEffect(() => {
    if (timer == 0) {
      endExamAttempt();
    }
  }, [timer]);

  // Event Handlers

  return (
    <>
      <div className="flex items-center gap-4 p-4 bg-white border rounded-lg shadow-md border-1 border-primary">
        <div className="flex items-center gap-1">
          <h4 className="text-lg">{examState.examInfo?.name}</h4>
          <span className="">•</span>
          {timer !== null && (
            <>
              <TimerIcon className="" />
              <p className="w-[8rem]">
                Ends in <span>{findTimeString(timer)}</span>
              </p>
            </>
          )}
        </div>
        <div className="items-center flex-1 h-2 bg-gray-200 rounded-full ">
          {timer !== null && (
            <div
              className="h-2 rounded-md bg-primary"
              style={{
                width: `${
                  100 - (timer / (60 * examState.examInfo?.duration!)) * 100
                }%`,
              }}
            ></div>
          )}
        </div>
        <Button className={`ms-3`} onClick={endExamAttempt}>
          <Pause className="" />
          End Test
        </Button>
      </div>
    </>
  );
};

export default Timer;
