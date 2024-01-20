import {
  useGetStudentsMutation,
  useStudentLogsMutation,
  useVerifyStudentMutation,
} from "@/components/api";
import { Input } from "@/components/ui/input";
import DataTable from "@/components/ui/table/data-table";
import { PlusCircleIcon, X } from "lucide-react";
import { showToast } from "@/lib/showToast";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { IExam } from "../exams/exam-table-config";
import { IStudent } from "../students/student-data-table-config";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import TableConfig from "./approvalsTableConfig";

interface IProps {
  examData: IExam;
}

const StudentApprovals = () => {
  const [studentsList, setStudentsList] = useState<IStudent[]>([]);
  const [totalStudents, setTotalStudents] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);
  const { mutate: verifyStudentFn } = useVerifyStudentMutation();
  const { mutate: getAllStudents } = useGetStudentsMutation();
  const { mutate: viewLogsFn } = useStudentLogsMutation();
  const [open, setOpen] = useState<boolean>(false);
  const [logData, setLogData] = useState<any>();
  const [showImage, setShowImage] = useState<string>("");
  interface IProps {
    limit: number;
    offset: number;
  }
  const verifyStudent = (studentId: number) => {
    verifyStudentFn(
      { body: { studentId } },
      {
        onSuccess: (data: any) => {
          showToast("Student has been verified successfully", "success");

          refetchData();
        },
        onError: (err: any) => {
          console.log(err);
        },
      }
    );
  };

  const viewLogs = (studentId: number, examId: number) => {
    viewLogsFn(
      { body: { studentId, examId } },
      {
        onSuccess: (data: any) => {
          setLogData(data?.data?.[0]?.activities?.activities);
          setOpen(true);
          showToast("Logs have been fetched successfully", "success");
        },
        onError: (err: any) => {
          console.log(err);
        },
      }
    );
  };

  const columnsConfig = TableConfig({
    verifyStudent,
    viewLogs,
    showImage,
    setShowImage,
  });

  const getFilteredStudents = (body: any) => {
    getAllStudents(
      { body },
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
  const refetchData = () => {
    getFilteredStudents({
      limit: 10,
      offset: Number(page) >= 1 ? (page - 1) * pageSize : 0,
    });
  };

  useEffect(() => {
    getFilteredStudents({
      limit: pageSize,
      offset: page >= 1 ? (page - 1) * pageSize : 0,
    });
    // setSearchParams({ page: page.toString() });
  }, [page, pageSize]);

  return (
    <div className="px-12 flex py-12 min-h-[90vh] flex-col  gap-8">
      <Dialog open={showImage !== ""} onOpenChange={() => setShowImage("")}>
        <DialogContent className="max-w-[800px]">
          <DialogHeader className="flex flex-row items-center justify-center mt-4">
            <DialogTitle>Document</DialogTitle>
          </DialogHeader>
          <DialogDescription className="flex flex-row items-center justify-center">
            <img
              className=" max-w-[600px] max-h-[600px]

            "
              src={showImage}
            />
          </DialogDescription>
        </DialogContent>
      </Dialog>
      <div className="w-full">
        <div className={"flex gap-8 mb-4"}>
          <span className={"font-semibold text-3xl text-slate-500"}>
            Students Logs and Details
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
            isSelect={true}
            buttonOnClick={() => {}}
            buttonName={"Send Email"}
          />
        </div>
      </div>
      <Dialog
        open={open}
        onOpenChange={() => {
          setOpen(false);
        }}
      >
        <DialogContent className="max-w-[600px]">
          <DialogHeader className="">
            <DialogTitle>Student Logs</DialogTitle>
          </DialogHeader>
          {//write in bullet points
          // iterate over the array
          // and display the logs

          logData?.map((log: any, index: number) => {
            return (
              <div className="flex flex-col gap-2">
                <span className="font-light text-lg">
                  <span className="font-semibold">{index + 1}.&nbsp;</span>
                  {log?.activity}
                </span>
                <span className="text-sm">{log?.timestamp}</span>
              </div>
            );
          })}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StudentApprovals;
