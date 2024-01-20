import React, { useEffect } from "react";

import { Button } from "@/components/ui/button";

import { useGetAllProctorsMutation, useRemoveProctorMutation } from "../api";
import CreateProctorModal from "./CreateProctorModal";
import TableConfig, { IProctor } from "./proctor-table-config";
import { PlusCircleIcon, Search } from "lucide-react";
import { Input } from "../ui/input";
import DataTable from "../ui/table/data-table";

export function DataTableDemo() {
  const [open, setOpen] = React.useState<boolean>(false);

  const [proctorList, setProctorList] = React.useState<IProctor[]>([]);
  const [totalProctors, setTotalProctors] = React.useState<number>(0);
  const [page, setPage] = React.useState<number>(1);
  const [pageSize, setPageSize] = React.useState<number>(10);

  const { mutate: removeProctorFn } = useRemoveProctorMutation();
  const { mutate: getFilteredProductsFn } = useGetAllProctorsMutation();

  const removeProctor = (body: { proctorId: number }) => {
    removeProctorFn(
      { body },
      {
        onSuccess: (data: any) => {
          console.log(data);
          refetchData();
        },
        onError: (err: any) => {
          console.log(err);
        },
      }
    );
  };

  const columnsConfig = TableConfig({
    removeProctor,
  });

  interface IProps {
    limit: number;
    offset: number;
  }

  const getFilteredProctor = (body: IProps) => {
    getFilteredProductsFn(
      { body },
      {
        onSuccess: (data: any) => {
          console.log(data);
          setProctorList(data?.data?.proctors);
          setTotalProctors(data?.data?.count);
        },
        onError: (err: any) => {
          console.log(err);
        },
      }
    );
  };

  const refetchData = () => {
    getFilteredProctor({
      limit: 10,
      offset: Number(page) >= 1 ? (page - 1) * pageSize : 0,
    });
  };

  useEffect(() => {
    getFilteredProctor({
      limit: pageSize,
      offset: page >= 1 ? (page - 1) * pageSize : 0,
    });
    // setSearchParams({ page: page.toString() });
  }, [page, pageSize]);

  return (
    <div className="w-full">
      <CreateProctorModal
        open={open}
        setOpen={setOpen}
        refetchData={refetchData}
      />
      <div className={"flex gap-8 mb-4"}>
        <span className={"font-semibold text-3xl text-slate-500"}>Proctor</span>
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
            setOpen(true);
          }}
        >
          <PlusCircleIcon className={"w-6 h-6"} />
          <span>Add Proctor</span>
        </Button>
      </div>
      <div className="overflow-auto border rounded-md ">
        <DataTable
          columns={columnsConfig}
          data={proctorList}
          totalRows={totalProctors}
          page={page}
          setPage={setPage}
          pageSize={pageSize}
          setPageSize={setPageSize}
        />
      </div>
    </div>
  );
}
