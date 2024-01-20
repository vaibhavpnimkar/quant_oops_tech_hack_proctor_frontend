import { ColumnDef } from "@tanstack/react-table";

import { EXAM_TYPE_MAPPING } from "@/constants/ExamType";
import { SDFormat } from "@/helper/DateHelper";

import { ChevronsUpDown, CopyIcon, GripHorizontal } from "lucide-react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export enum StatusFilter {
  Pending = "pending",
  Approved = "approved",
  Rejected = "rejected",
  ModificationRequired = "modification_requested",
}

export enum StateFilter {
  Active = "active",
  Inactive = "inactive",
}

export interface IExam {
  id: number;
  name: string;
  duration: number;
  startTime: string;
  totalQuestions: number;
  examType: string;
  description: string;
  passingMarks: number;
}

interface ITableConfig {
  setOpenUpdateModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const TableConfig = ({ setOpenUpdateModal }: ITableConfig) => {
  const { search } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const columnsConfig: ColumnDef<IExam>[] = [
    {
      accessorKey: "id",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Id
            <ChevronsUpDown className="w-4 h-4 ml-2" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="flex gap-2">
          <div className="lowercase">{row.getValue("id")}</div>
          <button
            className={
              "text-slate-400 hover:text-slate-800 active:text-slate-400"
            }
            onClick={() => navigator.clipboard.writeText(row.getValue("id"))}
          >
            <CopyIcon size={16} />
          </button>
        </div>
      ),
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "duration",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Duration
            <ChevronsUpDown className="w-4 h-4 ml-2" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("duration")}</div>
      ),
    },
    {
      accessorKey: "startTime",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Start Time
            <ChevronsUpDown className="w-4 h-4 ml-2" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="capitalize">{SDFormat(row.getValue("startTime"))}</div>
      ),
    },
    {
      accessorKey: "totalQuestions",
      header: () => <div className="">Total Questions</div>,
      cell: ({ row }) => {
        return (
          <div className="font-medium">{row.getValue("totalQuestions")}</div>
        );
      },
    },
    {
      accessorKey: "examType",
      header: () => <div className="">Exam Type</div>,
      cell: ({ row }) => {
        return (
          <div className="font-medium ">
            {
              EXAM_TYPE_MAPPING[
                row.getValue("examType") as keyof typeof EXAM_TYPE_MAPPING
              ]
            }
          </div>
        );
      },
    },
    {
      id: "actions",
      accessorKey: "Actions",
      enableHiding: false,
      cell: ({ row }) => {
        //   console.log(row?.original?.id);
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-8 h-8 p-0 ">
                <span className="sr-only">Open menu</span>
                <GripHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  navigate(
                    `/organization/questions?examId=${row?.original?.id}`
                  );
                }}
              >
                Add Questions
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  navigate(
                    `/organization/students?examId=${row?.original?.id}`
                  );
                }}
              >
                Add Students
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setSearchParams((prev) => {
                    prev.set("examId", String(row?.original?.id));
                    return prev;
                  });
                  setOpenUpdateModal(true);
                }}
              >
                Update Exam
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return columnsConfig;
};

export default TableConfig;
