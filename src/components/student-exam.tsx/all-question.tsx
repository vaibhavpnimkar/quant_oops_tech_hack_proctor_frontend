import { studentExamState } from "@/atoms/student-exam-state";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { twMerge } from "tailwind-merge";

const AllQuestion = () => {
  const examState = useRecoilValue(studentExamState);
  const setExamState = useSetRecoilState(studentExamState);
  return (
    <div className="flex flex-wrap gap-4">
      {examState.questions?.map((question, index) => (
        <div
          key={question.id}
          className={twMerge([
            "p-3 px-5 rounded-lg cursor-pointer",
            examState.currentQuestion === index + 1
              ? "bg-primary text-white"
              : "bg-white border border-primary",
          ])}
          onClick={() =>
            setExamState((prev) => ({ ...prev, currentQuestion: index + 1 }))
          }
        >
          {index + 1}
        </div>
      ))}
    </div>
  );
};

export default AllQuestion;
