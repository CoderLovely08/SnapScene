"use client";
import React, { useState, useMemo } from "react";
import { Search, ChevronLeft, ChevronRight, Filter, Menu } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import LoadingSpinner from "./LoadingSpiner";
import { useExport } from "@/hooks/core/useExport";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

/**
 * GenericTable Component
 *
 * A reusable table component that supports searching, filtering, and pagination.
 *
 * @param {string} title - The title of the table.
 * @param {Array<Object>} data - The array of objects representing the table data.
 * @param {Array<Object>} columns - The array of column definitions for the table.
 *   Each column object should have the following structure:
 *   - {string} field: The key in the data objects to display in this column.
 *   - {string} header: The display name of the column header.
 * @param {Array<string>} searchFields - The fields within the data objects to use for searching.
 * @param {string} filterField - The field within the data objects to use for filtering.
 * @param {number} itemsPerPage - The number of items to display per page.
 *
 * @example
 * // Usage example:
 * <GenericTable
 *   title="Users"
 *   data={users}
 *   columns={[
 *     { field: "name", header: "Name" },
 *     { field: "email", header: "Email" },
 *     { field: "role", header: "Role" }
 *   ]}
 *   searchFields={["name", "email"]}
 *   filterField="role"
 *   itemsPerPage={10}
 *   actionButtons={[<Button key={1} label="Edit" />, <Button key={2} label="Delete" />]}
 *   isActionButtons={true}
 * />
 *
 * @example
 * // Example data format:
 * const exampleData = {
 *   columns: [
 *     { field: "name", header: "Name" },
 *     { field: "designation", header: "Designation" }
 *   ],
 *   data: [
 *     { name: "Alice", designation: "Developer" },
 *     { name: "Bob", designation: "Manager" }
 *   ],
 *   searchFields: ["name", "designation"],
 *   filterField: "designation"
 * };
 */
export const GenericTable = ({
  title = "Data Table",
  data = [],
  columns = [],
  searchFields = [], // Array of field keys to search within
  filterField = null, // Field key to use for filtering
  rowActions = null,
  additionalElement = null,
  exportableColumns = null,
  isExportable = false,
  isLoading = false,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [currentRecordCount, setCurrentRecordCount] = useState(10);

  const ALLOWED_RECORD_COUNTS = [10, 20, 50, 100];

  const handleRecordCountChange = (value) => {
    setCurrentRecordCount(Number(value));
  };

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      // Apply the filter if it's selected
      if (selectedFilter !== "all" && filterField) {
        if (item[filterField] !== selectedFilter) {
          return false;
        }
      }

      // Apply the search logic
      return searchFields.some((field) => {
        // Safely access nested fields
        const fieldParts = field.split(".");
        const fieldValue = fieldParts.reduce(
          (obj, part) => obj && obj[part],
          item
        );

        // Find the corresponding column for the field
        const column = columns.find((col) => col.field === field);

        // Use the column's render function if available, otherwise use raw value
        const processedValue =
          column && column.render ? column.render(fieldValue) : fieldValue;

        // Compare the processed value with the search term
        return String(processedValue)
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
    });
  }, [data, searchTerm, selectedFilter, searchFields, columns, filterField]);

  // Calculate pagination
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
        {/* Search and Filter Controls */}
        <div className="flex flex-col md:flex-row items-center gap-4 mt-4">
          {searchFields.length > 0 && (
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          )}

          {filterField && (
            <div className="relative">
              <Select
                className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary appearance-none bg-white outline-none"
                value={selectedFilter}
                onValueChange={(value) => setSelectedFilter(value)}
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
                <DropdownMenuItem value="csv" onClick={exportToCSV}>
                  CSV
                </DropdownMenuItem>
                <DropdownMenuItem value="pdf" onClick={exportToPDF}>
                  PDF
                </DropdownMenuItem>
                <DropdownMenuItem value="print" onClick={exportToPrint}>
                  Print
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </CardHeader>

      <CardContent>
        {/* Table */}
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="flex flex-1  w-full overflow-x-auto">
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
                        if (column.field.includes(".")) {
                          const fieldParts = column.field.split(".");
                          const value = fieldParts.reduce(
                            (obj, part) => obj && obj[part],
                            item
                          );

                          return (
                            <td
                              key={colIndex}
                              className="px-4 py-3 text-gray-600"
                            >
                              {column.render
                                ? column.render(value, item)
                                : value}
                            </td>
                          );
                        } else {
                          return (
                            <td
                              key={colIndex}
                              className="px-4 py-3 text-gray-600"
                            >
                              {column.render
                                ? column.render(item[column.field], item)
                                : item[column.field]}
                            </td>
                          );
                        }
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

        {/* Pagination Controls */}
        <div className="flex items-center justify-between mt-6 max-md:flex-col w-full">
          <div>
            <p className="text-sm text-gray-600">
              Showing {startIndex + 1} to{" "}
              {Math.min(startIndex + currentRecordCount, filteredData.length)}{" "}
              of {filteredData.length} entries
            </p>
            <Select
              defaultValue={String(currentRecordCount)}
              onValueChange={handleRecordCountChange} // Pass the value directly
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
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* First page */}
            <button
              onClick={() => setCurrentPage(1)}
              className={`w-8 h-8 rounded-lg ${
                currentPage === 1
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-gray-100"
              }`}
            >
              1
            </button>

            {/* Show dots if there are many pages before current page */}
            {currentPage > 3 && <span className="px-2">...</span>}

            {/* Pages around current page */}
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
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 rounded-lg ${
                    currentPage === page
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {page}
                </button>
              ))}

            {/* Show dots if there are many pages after current page */}
            {currentPage < totalPages - 2 && <span className="px-2">...</span>}

            {/* Last page */}
            {totalPages > 1 && (
              <button
                onClick={() => setCurrentPage(totalPages)}
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
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
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
