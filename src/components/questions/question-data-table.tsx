import {
  useDeleteQuestionMutation,
  useGetAllExamQuestionsMutation,
} from "@/components/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DataTable from "@/components/ui/table/data-table";
import { PlusCircleIcon, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { IExam } from "../exams/exam-table-config";
import CreateQuestionModal from "./create-question-modal";
import TableConfig, { IQuestion } from "./question-data-table-config";

interface IProps {
  examData: IExam;
}

const QuestionTable = ({ examData }: IProps) => {
  const [questionList, setQuestionList] = useState<IQuestion[]>([]);
  const [totalQuestions, setTotalQuestions] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);

  const { mutate: getFilteredQuestionsFn } = useGetAllExamQuestionsMutation();
  const { mutate: deleteQuestionFn } = useDeleteQuestionMutation();

  const deleteQuestion = (body: { questionId: number }) => {
    deleteQuestionFn(
      { body },
      {
        onSuccess: (data: any) => {
          refetchData();
        },
        onError: (err: any) => {
          console.log(err);
        },
      }
    );
  };
  const columnsConfig = TableConfig({
    deleteQuestion,
  });

  interface IProps {
    limit: number;
    offset: number;
    examId: number;
  }

  const getFilteredQuestions = (body: IProps) => {
    getFilteredQuestionsFn(
      { body },
      {
        onSuccess: (data: any) => {
          setQuestionList(data?.data?.rows);
          setTotalQuestions(data?.data?.count);
        },
        onError: (err: any) => {
          console.log(err);
        },
      }
    );
  };
  const refetchData = () => {
    getFilteredQuestions({
      limit: 10,
      offset: Number(page) >= 1 ? (page - 1) * pageSize : 0,
      examId: examData.id,
    });
  };

  useEffect(() => {
    getFilteredQuestions({
      limit: pageSize,
      offset: page >= 1 ? (page - 1) * pageSize : 0,
      examId: examData.id,
    });
    // setSearchParams({ page: page.toString() });
  }, [page, pageSize]);

  return (
    <div className="w-full">
      <CreateQuestionModal
        open={openCreateModal}
        setOpen={setOpenCreateModal}
        refetchData={refetchData}
        examData={examData}
      />
      <div className={"flex gap-8 mb-4"}>
        <span className={"font-semibold text-3xl text-slate-500"}>
          Questions
        </span>
        <div className={"flex-1"} />
        {/* <DataTableFilters
            filters={[
              { name: roleFilter, onClear: () => setRoleFilter(null) },
              { name: genderFilter, onClear: () => setGenderFilter(null) },
              { name: statusFilter, onClear: () => setStatusFilter(null) },
            ]}
          /> */}
        <div className="flex items-center justify-center gap-4">
          <Search size={20} className={"text-slate-500"} />
          <Input className={"w-72"} placeholder={"Search questions..."} />
        </div>
        <Button
          className={"flex flex-row gap-2"}
          variant={"default"}
          onClick={() => {
            setOpenCreateModal(true);
          }}
        >
          <PlusCircleIcon className={"w-6 h-6"} />
          <span>Add Question</span>
        </Button>
      </div>
      <div className="overflow-auto border rounded-md ">
        <DataTable
          columns={columnsConfig}
          data={questionList}
          totalRows={totalQuestions}
          page={page}
          setPage={setPage}
          pageSize={pageSize}
          setPageSize={setPageSize}
        />
      </div>
    </div>
  );
};

export default QuestionTable;
