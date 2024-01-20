import { studentExamState } from "@/atoms/student-exam-state";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useFinishExamMutation, useSubmitQuestionMutation } from "../api";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

function indexToLetter(index: number) {
  // Assuming index starts from 1
  var charCode = 96 + index;
  return String.fromCharCode(charCode);
}

const Mcq = () => {
  const examState = useRecoilValue(studentExamState);
  const setExamState = useSetRecoilState(studentExamState);
  const { mutate: finishExamFn } = useFinishExamMutation();
  const { mutate: submitQuestionFn } = useSubmitQuestionMutation();
  const navigate = useNavigate();
  const { id } = useParams();
  // Other Functions
  const [selectedOption, setSelectedOption] = useState<number[]>([]);
  const curr = examState.currentQuestion ? examState.currentQuestion - 1 : 0;
  const handleOptionSelect = (optionIndex: number) => {
    if (
      examState.questions &&
      examState.questions[curr]?.questionType === "single_select"
    ) {
      setSelectedOption([optionIndex]);
    } else {
      if (!selectedOption.includes(optionIndex)) {
        setSelectedOption((prev) => [...prev, optionIndex]);
      } else {
        setSelectedOption((prev) =>
          prev.filter((option) => option != optionIndex)
        );
      }
    }
  };
  console.log(examState.examInfo?.totalQuestions);
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

  const resetHandler = () => {
    setSelectedOption([]);
  };

  useEffect(() => {
    if (!examState.currentQuestion || !examState.questions) return;
    const userSelectedOptions = examState.questions[
      examState.currentQuestion - 1
    ].options
      ?.filter((option) => option.isCorrect)
      ?.map((option) => option.id);
    setSelectedOption(userSelectedOptions);
  }, [examState.currentQuestion]);

  const handleNext = () => {
    if (!examState.examInfo?.id || !examState.questions) return;
    submitQuestionFn(
      {
        body: {
          examId: +examState.examInfo?.id,
          questionId: examState.questions[curr].id,
          options: selectedOption,
        },
      },
      {
        onSuccess: (data) => {
          console.log(data);
        },
        onError: (error) => {
          console.log(error);
        },
      }
    );
    const updatedQuestions = examState.questions.map((question) => {
      if (examState.questions && question.id === examState.questions[curr].id) {
        return {
          ...question,
          options: question.options?.map((option) => {
            if (selectedOption.includes(option.id)) {
              return {
                ...option,
                isCorrect: true,
              };
            }
            return {
              ...option,
              isCorrect: false,
            };
          }),
        };
      }
      return question;
    });

    setExamState((prev) => ({
      ...prev,
      questions: updatedQuestions,
      currentQuestion: curr + 2,
    }));
  };

  const submitButtonHandler = () => {
    if (!examState.examInfo?.id || !examState.questions) return;
    submitQuestionFn(
      {
        body: {
          examId: +examState.examInfo?.id,
          questionId: examState.questions[curr].id,
          options: selectedOption,
        },
      },
      {
        onSuccess: (data) => {
          console.log(data);
        },
        onError: (error) => {
          console.log(error);
        },
      }
    );
    const updatedQuestions = examState.questions.map((question) => {
      if (examState.questions && question.id === examState.questions[curr].id) {
        return {
          ...question,
          options: question.options?.map((option) => {
            if (selectedOption.includes(option.id)) {
              return {
                ...option,
                isCorrect: true,
              };
            }
            return {
              ...option,
              isCorrect: false,
            };  
          }),
        };
      }
      return question;
    });
    navigate(`/student/exam/${id}/finished`);
  };

  return (
    <div className="p-4 mt-4 bg-white border rounded-lg shadow-md border-1 border-primary">
      <div className={`d-flex flex-column justify-content-center p-4 m-sm-2`}>
        <h4 className="text-xl">
          {examState.questions && examState.questions[curr].question}
        </h4>
        <div className="flex items-center justify-between my-3">
          <h2 className={``}>
            {examState.questions && examState.questions[curr].description}
          </h2>
          <div className={` p-2 bg-muted rounded-md `}>
            {examState.questions && examState.questions[curr].marks} Points
          </div>
        </div>
        <ul className="flex flex-col gap-6 my-8">
          {examState.questions &&
            examState.questions[curr].options?.map((option, index) => (
              <li
                key={option.id}
                className={`${
                  selectedOption.includes(option.id)
                    ? "border-primary border-2"
                    : ""
                }border-gray-300 border border-1 px-4 py-4 rounded-md `}
              >
                <label className={` flex  gap-2`} style={{ cursor: "pointer" }}>
                  <Input
                    type="radio"
                    className="h-4 mt-1 min-w-[16px] max-w-[16px] text-primary"
                    //   name={`${index}`}
                    checked={selectedOption.includes(option.id)}
                    onClick={() => handleOptionSelect(option.id)}
                  />
                  {indexToLetter(index + 1) + ". " + option?.option}
                </label>
              </li>
            ))}
        </ul>

        <div className={` flex gap-6 justify-end align-items-center mt-8 `}>
          <Button className={``} onClick={resetHandler}>
            Clear Selection
          </Button>
          {examState.questions?.length === examState.currentQuestion ? (
            <Button onClick={submitButtonHandler}>Submit</Button>
          ) : (
            <Button onClick={handleNext} className={""}>
              Save & Next
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Mcq;
