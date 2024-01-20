import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

import { PlusCircleIcon, Search } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { useGetAllExamsMutation } from "../api";
import { Input } from "../ui/input";
import DataTable from "../ui/table/data-table";
import CreateExamModal from "./create-update-exam-modal";
import TableConfig, { IExam } from "./exam-table-config";

export function ExamDataTable() {
  let [searchParams, setSearchParams] = useSearchParams();

  const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);
  const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false);

  const [examList, setExamList] = useState<IExam[]>([]);
  const [totalExams, setTotalExams] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  const columnsConfig = TableConfig({
    setOpenUpdateModal,
  });

  const { mutate: getFilteredExamFn } = useGetAllExamsMutation();

  interface IProps {
    limit: number;
    offset: number;
  }

  const getFilteredExam = (body: IProps) => {
    const onSuccess = (data: any) => {
      setExamList(data?.data?.rows);
      setTotalExams(data?.data?.count);
    };
    const onError = (err: any) => {
      console.log(err);
    };
    getFilteredExamFn(
      { body },
      {
        onSuccess,
        onError,
      }
    );
  };

  const refetchData = () => {
    getFilteredExam({
      limit: 10,
      offset: Number(page) >= 1 ? (page - 1) * pageSize : 0,
    });
  };

  useEffect(() => {
    getFilteredExam({
      limit: pageSize,
      offset: page >= 1 ? (page - 1) * pageSize : 0,
    });
    // setSearchParams({ page: page.toString() });
  }, [page, pageSize]);

  return (
    <div className="w-full">
      <CreateExamModal
        open={openCreateModal ? openCreateModal : openUpdateModal}
        isCreateModal={openCreateModal}
        setOpen={openCreateModal ? setOpenCreateModal : setOpenUpdateModal}
        refetchData={refetchData}
      />
      <div className={"flex gap-8 mb-4"}>
        <span className={"font-semibold text-3xl text-slate-500"}>Exams</span>
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
          <Input className={"w-72"} placeholder={"Search exams..."} />
        </div>
        <Button
          className={"flex flex-row gap-2"}
          variant={"default"}
          onClick={() => {
            setOpenCreateModal(true);
          }}
        >
          <PlusCircleIcon className={"w-6 h-6"} />
          <span>Add Exam</span>
        </Button>
      </div>
      <div className="overflow-auto border rounded-md ">
        <DataTable
          columns={columnsConfig}
          data={examList}
          totalRows={totalExams}
          page={page}
          setPage={setPage}
          pageSize={pageSize}
          setPageSize={setPageSize}
        />
      </div>
    </div>
  );
}
