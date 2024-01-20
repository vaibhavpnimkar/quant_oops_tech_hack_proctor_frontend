import { ColumnDef } from "@tanstack/react-table";

import { GripHorizontal } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Checkbox } from "../ui/checkbox";

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

export interface IStudent {
  id: number;
  name: string;
  email: string;
  organizationId: string;
}

interface ITableConfig {
  addStudents?: ([]: String[]) => void;
  sendEmail?: (students: IStudent[]) => void;
}

const TableConfig = ({ sendEmail }: ITableConfig) => {
  const columnsConfig: ColumnDef<IStudent>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <div className="flex justify-center">
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
          />
        </div>
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      // enableSorting: true,
      // enableHiding: true,
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => <div className="">{row.getValue("email")}</div>,
    },
    {
      accessorKey: "organizationId",
      header: "Organization Id",
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("organizationId")}</div>
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
                onClick={() => {
                  console.log(row?.original?.id);
                  console.log(sendEmail);
                  row && sendEmail && sendEmail([row.original] as IStudent[]);
                }}
              >
                Send Email
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
