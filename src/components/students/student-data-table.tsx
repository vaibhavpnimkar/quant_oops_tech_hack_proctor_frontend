import {
  useGetAllStudentsByExamIdMutation,
  useGetStudentsMutation,
  useSendEmailMutation,
} from "@/components/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DataTable from "@/components/ui/table/data-table";
import { PlusCircleIcon, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { IExam } from "../exams/exam-table-config";
import AddStudentModal from "./add-students-modal";
import TableConfig, { IStudent } from "./student-data-table-config";

interface IProps {
  examData: IExam;
}

const StudentsTable = ({ examData }: IProps) => {
  const [studentsList, setStudentsList] = useState<IStudent[]>([]);
  const [totalStudents, setTotalStudents] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);
  const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);

  const { mutate: sendEmailFn } = useSendEmailMutation();
  const { mutate: getAllStudentByExamIdFn } =
    useGetAllStudentsByExamIdMutation();

  // const deleteQuestion = (body) => {
  //   deleteQuestionFn(
  //     { body },
  //     {
  //       onSuccess: (data: any) => {
  //         refetchData();
  //       },
  //       onError: (err: any) => {
  //         console.log(err);
  //       },
  //     }
  //   );
  // };

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
    getAllStudentByExamIdFn(
      {
        body: {
          ...body,
          examId: examData.id,
        },
      },
      {
        onSuccess: (data: any) => {
          console.log(data);
          setStudentsList(
            // spread the internal student object
            data.data.map((student: any) => {
              return {
                ...student,
                ...student.student,
              };
            })
          );
          setTotalStudents(data?.data?.length);
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
    <div className="w-full">
      <AddStudentModal
        open={openCreateModal}
        setOpen={setOpenCreateModal}
        refetchData={refetchData}
        examData={examData}
      />
      <div className={"flex gap-8 mb-4"}>
        <span className={"font-semibold text-3xl text-slate-500"}>
          Students
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
        <Button
          className={"flex flex-row gap-2"}
          variant={"default"}
          onClick={() => {
            setOpenCreateModal(true);
          }}
        >
          <PlusCircleIcon className={"w-6 h-6"} />
          <span>Add Student</span>
        </Button>
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
          buttonOnClick={sendEmail}
          buttonName={"Send Email"}
        />
      </div>
    </div>
  );
};

export default StudentsTable;
