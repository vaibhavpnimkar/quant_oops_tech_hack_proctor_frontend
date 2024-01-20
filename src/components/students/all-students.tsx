import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useGetExamByIdMutation } from "../api";
import { IExam } from "../exams/exam-table-config";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Loader from "../ui/loader";
import StudentsTable from "./student-data-table";

const AllStudents = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [examId, setExamId] = useState<string>("");
  const [examData, setExamData] = useState<IExam>();
  const {
    mutate: getExamByIdFn,
    isLoading,
    isError,
  } = useGetExamByIdMutation();

  useEffect(() => {
    if (searchParams.get("examId")) setExamId(searchParams.get("examId")!);
  }, []);

  const getExamById = (body: { examId: number }) => {
    const onSuccess = (data: any) => {
      console.log(data);
      setExamData(data?.data);
      setSearchParams({ examId: examId });
    };
    const onError = (err: any) => {
      console.log(err);
    };
    getExamByIdFn(
      { body },
      {
        onSuccess,
        onError,
      }
    );
  };

  useEffect(() => {
    if (examId) {
      getExamById({
        examId: +examId,
      });
    }
  }, [examId]);

  return (
    <div className="px-12 flex py-12 min-h-[90vh] flex-col  gap-8">
      <div className="flex items-center gap-2 ">
        <Input
          placeholder="Enter the exam id"
          onChange={(e) => setSearchParams({ examId: e.target.value })}
          value={searchParams.get("examId")!}
        />
        <Button
          className="flex gap-3"
          onClick={() => setExamId(searchParams.get("examId")!)}
        >
          <Search />
          <span className="whitespace-nowrap">Exam ID</span>
        </Button>
      </div>
      {isLoading ? (
        <Loader size={24} />
      ) : isError ? (
        <div>Exam Not Found</div>
      ) : (
        <>
          <div className="my-4">
            <div>Exam Details</div>
            <div>ID : {examData?.id}</div>
            <div className="">Name : {examData?.name}</div>
            <div>Duration : {examData?.duration}</div>
            <div>Start Time : {examData?.startTime}</div>
            <div>Total Questions : {examData?.totalQuestions}</div>
          </div>
          {examData && <StudentsTable examData={examData} />}
        </>
      )}
    </div>
  );
};

export default AllStudents;
