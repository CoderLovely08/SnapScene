import React, { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, ChevronLeft, ChevronRight, Menu } from "lucide-react";
import LoadingSpinner from "./LoadingSpiner";
import { useExport } from "@/hooks/core/useExport";
import { useSearchParams } from "react-router-dom";

export const GenericTableWithParams = ({
  title = "Data Table",
  data = [],
  columns = [],
  searchFields = [],
  filterField = null,
  rowActions = null,
  additionalElement = null,
  exportableColumns = null,
  isExportable = false,
  isLoading = false,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;
  const currentRecordCount = Number(searchParams.get("limit")) || 10;
  const searchTerm = searchParams.get("search") || "";
  const selectedFilter = searchParams.get("filter") || "all";

  const ALLOWED_RECORD_COUNTS = [10, 20, 50, 100];

  const updateParams = (newParams) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(newParams).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        params.set(key, String(value));
      } else {
        params.delete(key);
      }
    });
    setSearchParams(params);
  };

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      if (selectedFilter !== "all" && filterField) {
        if (item[filterField] !== selectedFilter) return false;
      }
      return searchFields.some((field) => {
        const fieldParts = field.split(".");
        const fieldValue = fieldParts.reduce(
          (obj, part) => obj && obj[part],
          item
        );
        const column = columns.find((col) => col.field === field);
        const processedValue =
          column && column.render ? column.render(fieldValue) : fieldValue;
        return String(processedValue)
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
    });
  }, [data, searchTerm, selectedFilter, searchFields, columns, filterField]);

  const totalPages = Math.ceil(filteredData.length / currentRecordCount);
  const startIndex = (currentPage - 1) * currentRecordCount;
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + currentRecordCount
  );

  const { exportToCSV, exportToPDF, exportToPrint } = useExport({
    data: filteredData,
    columns: exportableColumns || columns,
    filename: title,
  });

  return (
    <Card className="w-full mt-5">
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex justify-between">
          {title}
          {additionalElement}
        </CardTitle>
        <div className="flex flex-col md:flex-row items-center gap-4 mt-4">
          {searchFields.length > 0 && (
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                value={searchTerm}
                onChange={(e) =>
                  updateParams({ search: e.target.value, page: 1 })
                }
              />
            </div>
          )}
          {filterField && (
            <div className="relative">
              <Select
                value={selectedFilter}
                onValueChange={(value) =>
                  updateParams({ filter: value, page: 1 })
                }
              >
                <SelectTrigger className="h-full min-w-24">
                  <SelectValue placeholder="Select Filter" />
                </SelectTrigger>
                <SelectContent className="w-full">
                  {[
                    "all",
                    ...new Set(data.map((item) => item[filterField])),
                  ].map((option) => (
                    <SelectItem key={option} value={option}>
                      {option === "all" ? "All" : option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          {isExportable && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="icon" variant="outline">
                  <Menu />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-full h-full">
                <DropdownMenuItem onClick={exportToCSV}>CSV</DropdownMenuItem>
                <DropdownMenuItem onClick={exportToPDF}>PDF</DropdownMenuItem>
                <DropdownMenuItem onClick={exportToPrint}>
                  Print
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </CardHeader>

      <CardContent>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="flex flex-1 w-full overflow-x-auto">
            <table className="flex-1 border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  {columns.map((column, index) => (
                    <th
                      key={index}
                      className="px-4 py-3 text-left text-sm font-semibold text-gray-600"
                    >
                      {column.header}
                    </th>
                  ))}
                  {rowActions && (
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                      Actions
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginatedData.length > 0 ? (
                  paginatedData.map((item, rowIndex) => (
                    <tr key={rowIndex} className="hover:bg-gray-50">
                      {columns.map((column, colIndex) => {
                        const value = column.field.includes(".")
                          ? column.field
                              .split(".")
                              .reduce((obj, part) => obj && obj[part], item)
                          : item[column.field];
                        return (
                          <td
                            key={colIndex}
                            className="px-4 py-3 text-gray-600"
                          >
                            {column.render ? column.render(value, item) : value}
                          </td>
                        );
                      })}
                      {rowActions && (
                        <td className="px-4 py-3 text-gray-600">
                          {rowActions(item)}
                        </td>
                      )}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={columns.length + (rowActions ? 1 : 0)}
                      className="text-center py-4"
                    >
                      No data found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        <div className="flex items-center justify-between mt-6 max-md:flex-col w-full">
          <div>
            <p className="text-sm text-gray-600">
              Showing {startIndex + 1} to{" "}
              {Math.min(startIndex + currentRecordCount, filteredData.length)}{" "}
              of {filteredData.length} entries
            </p>
            <Select
              value={String(currentRecordCount)}
              onValueChange={(value) => updateParams({ limit: value, page: 1 })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Record Count" />
              </SelectTrigger>
              <SelectContent>
                {ALLOWED_RECORD_COUNTS.map((count) => (
                  <SelectItem key={count} value={String(count)}>
                    {count}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => updateParams({ page: currentPage - 1 })}
              disabled={currentPage === 1}
              className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={() => updateParams({ page: 1 })}
              className={`w-8 h-8 rounded-lg ${
                currentPage === 1
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-gray-100"
              }`}
            >
              1
            </button>

            {currentPage > 3 && <span className="px-2">...</span>}

            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(
                (page) =>
                  page !== 1 &&
                  page !== totalPages &&
                  page >= currentPage - 1 &&
                  page <= currentPage + 1
              )
              .map((page) => (
                <button
                  key={page}
                  onClick={() => updateParams({ page })}
                  className={`w-8 h-8 rounded-lg ${
                    currentPage === page
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {page}
                </button>
              ))}

            {currentPage < totalPages - 2 && <span className="px-2">...</span>}

            {totalPages > 1 && (
              <button
                onClick={() => updateParams({ page: totalPages })}
                className={`w-8 h-8 rounded-lg ${
                  currentPage === totalPages
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-gray-100"
                }`}
              >
                {totalPages}
              </button>
            )}

            <button
              onClick={() => updateParams({ page: currentPage + 1 })}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
