import { XIcon } from "lucide-react";
import React from "react";

interface DataTableFiltersProps {
  filters: {
    name: any;
    onClear: () => void;
  }[];
}

const DataTableFilters: React.FC<DataTableFiltersProps> = ({ filters }) => {
  return (
    <div className={"flex flex-row gap-2"}>
      {filters.map((filter, index) => {
        if (!filter.name) return null;
        return (
          <div
            key={index}
            className={
              "flex flex-row gap-2 items-center bg-slate-200 rounded-full px-3 select-none py-2"
            }
          >
            <span className={"text-slate-500 text-sm font-semibold"}>
              {filter.name}
            </span>
            <div
              className={"rounded-full p-1 bg-slate-500 hover:cursor-pointer"}
              onClick={() => {
                filter.onClear();
              }}
            >
              <XIcon size={12} className={"text-white"} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DataTableFilters;
