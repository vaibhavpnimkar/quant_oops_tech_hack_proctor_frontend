import { ColumnDef } from "@tanstack/react-table";

import { ChevronsUpDown, GripHorizontal } from "lucide-react";
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

export interface IQuestion {
  id: number;
  question: string;
  questionType: string;
  marks: number;
  options: { option: string; is_correct: boolean }[];
  negativeMarks: number;
  description: string;
  examId: number;
}

interface ITableConfig {
  deleteQuestion: ({}: { questionId: number }) => void;
}

const TableConfig = ({ deleteQuestion }: ITableConfig) => {
  const columnsConfig: ColumnDef<IQuestion>[] = [
    {
      accessorKey: "question",
      header: "Question",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("question")}</div>
      ),
    },
    {
      accessorKey: "questionType",
      header: "Question Type",
      cell: ({ row }) => <div className="">{row.getValue("questionType")}</div>,
    },
    {
      accessorKey: "marks",
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
        <div className="lowercase">{row.getValue("marks")}</div>
      ),
    },
    {
      accessorKey: "negativeMarks",
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
        <div className="capitalize">{row.getValue("negativeMarks")}</div>
      ),
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
                onClick={() =>
                  deleteQuestion({ questionId: row?.original?.id })
                }
              >
                Delete
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
