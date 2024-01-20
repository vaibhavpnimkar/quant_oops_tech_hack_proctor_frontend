import { Button } from "@/components/ui/button.tsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import { Table } from "@tanstack/react-table";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from "lucide-react";
import React, { Dispatch, SetStateAction } from "react";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  totalRows: number;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  pageSize: number;
  setPageSize: Dispatch<SetStateAction<number>>;
  isSelect?: boolean;
  buttonName?: string;
  buttonOnClick?: ([]: any) => void;
}

const DataTablePagination: React.FC<DataTablePaginationProps<any>> = ({
  table,
  totalRows,
  page,
  setPage,
  pageSize,
  setPageSize,
  isSelect,
  buttonName,
  buttonOnClick,
}) => {
  const totalPages = Math.ceil(totalRows / pageSize);
  return (
    <div className="flex items-center justify-between w-full gap-4 px-4">
      <div className="flex flex-row items-center flex-1 h-10 gap-4 text-sm text-muted-foreground">
        {isSelect ? (
          <div>
            {table.getFilteredSelectedRowModel().rows.length} of {totalRows}{" "}
            row(s) selected.
          </div>
        ) : (
          <div>{totalRows} row(s)</div>
        )}
      </div>
      {isSelect &&
        table.getFilteredSelectedRowModel().rows.length > 0 &&
        buttonOnClick && (
          <div>
            <Button
              onClick={() =>
                buttonOnClick(table.getFilteredSelectedRowModel().rows)
              }
            >
              {buttonName}
            </Button>
          </div>
        )}
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            value={`${pageSize}`}
            onValueChange={(value) => {
              setPage(1);
              table.setPageSize(20);
              setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {page} of {totalPages}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden w-8 h-8 p-0 lg:flex"
            onClick={() => {
              setPage(1);
            }}
            disabled={page === 1}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeftIcon size={16} />
          </Button>
          <Button
            variant="outline"
            className="w-8 h-8 p-0"
            onClick={() => setPage((old) => (old === 1 ? old : old - 1))}
            disabled={page === 1}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeftIcon size={16} />
          </Button>
          <Button
            variant="outline"
            className="w-8 h-8 p-0"
            onClick={() =>
              setPage((old) => (old === totalPages ? old : old + 1))
            }
            disabled={page === totalPages}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRightIcon size={16} />
          </Button>
          <Button
            variant="outline"
            className="hidden w-8 h-8 p-0 lg:flex"
            onClick={() => setPage(totalPages)}
            disabled={page === totalPages}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRightIcon size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DataTablePagination;
