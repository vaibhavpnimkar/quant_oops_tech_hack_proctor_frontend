import { useGetStudentsMutation, useSendEmailMutation } from "@/components/api";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { showToast } from "@/lib/showToast";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { IExam } from "../exams/exam-table-config";
import { Input } from "../ui/input";
import DataTable from "../ui/table/data-table";
import TableConfig, { IStudent } from "./student-data-table-config";

interface IProps {
  open: boolean;
  setOpen: (x: boolean) => any;
  refetchData: () => any;
  examData: IExam;
}

export type QuestionsTableType = {
  id: number;
  question: string;
  question_type: string;
  marks: number;
  options: [{ option: string; is_correct: boolean }];
  negativeMarks: number;
  description: string;
  examId: number;
};

const AddStudentModal = ({ open, setOpen, examData, refetchData }: IProps) => {
  const [studentsList, setStudentsList] = useState<IStudent[]>([]);
  const [totalStudents, setTotalStudents] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);
  const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);
  const { mutate: sendEmailFn } = useSendEmailMutation();
  const { mutate: getFilteredStudentsFn } = useGetStudentsMutation();
  // const { mutate: addStudentsFn } = useDeleteQuestionMutation();

  const sendEmail = (students: IStudent[]) => {
    const body = {
      examId: examData.id,
      studentIds: students.map((student) => +student.id),
    };
    sendEmailFn(
      { body },
      {
        onSuccess: (data: any) => {
          console.log(data);
          showToast("Email sent successfully", "success");
        },
        onError: (err: any) => {
          console.log(err);
        },
      }
    );
  };
  const columnsConfig = TableConfig({
    // deleteQuestion,
    sendEmail,
  });

  interface IProps {
    limit: number;
    offset: number;
  }

  const getFilteredStudents = (body: any) => {
    getFilteredStudentsFn(
      {
        body,
      },
      {
        onSuccess: (data: any) => {
          setStudentsList(data.data.rows);
          setTotalStudents(data?.data?.count);
        },
        onError: (err: any) => {
          console.log(err);
        },
      }
    );
  };

  useEffect(() => {
    getFilteredStudents({
      limit: pageSize,
      offset: page >= 1 ? (page - 1) * pageSize : 0,
    });
    // setSearchParams({ page: page.toString() });
  }, [page, pageSize]);

  return (
    <>
      <Dialog
        open={open}
        onOpenChange={() => {
          setOpen(false);
        }}
      >
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader className="flex flex-row items-center justify-between mt-4">
            <DialogTitle>Add Student</DialogTitle>
          </DialogHeader>
          <div className={"flex gap-8 mb-4"}>
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
              <Input className={"w-72"} placeholder={"Search students..."} />
            </div>
          </div>
          <div className="overflow-auto border rounded-md ">
            <DataTable
              columns={columnsConfig}
              data={studentsList}
              totalRows={totalStudents}
              page={page}
              setPage={setPage}
              pageSize={pageSize}
              setPageSize={setPageSize}
              buttonOnClick={sendEmail}
              buttonName={"Send Email"}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddStudentModal;
