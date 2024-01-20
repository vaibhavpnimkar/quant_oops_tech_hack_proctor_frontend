import { ColumnDef } from "@tanstack/react-table";

import { ChevronsUpDown, GripHorizontal } from "lucide-react";
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

export interface IProctor {
  id: number;
  organizationId: number;
  name: string;
  email: string;
}

interface ITableConfig {
  removeProctor: ({ proctorId }: { proctorId: number }) => void;
}

const TableConfig = ({ removeProctor }: ITableConfig) => {
  const { search } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const columnsConfig: ColumnDef<IProctor>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "email",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Email
            <ChevronsUpDown className="w-4 h-4 ml-2" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("email")}</div>
      ),
    },
    {
      accessorKey: "organizationId",
      header: () => <div className="text-right">organizationId</div>,
      cell: ({ row }) => {
        return (
          <div className="font-medium text-right">
            {row.getValue("organizationId")}
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
              <Button variant="ghost" className="w-8 h-8 p-0">
                <span className="sr-only">Open menu</span>
                <GripHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View customer</DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => removeProctor({ proctorId: row?.original?.id })}
              >
                Remove Proctor
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
