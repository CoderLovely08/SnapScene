import { GenericTable } from "@/components/custom/utils/GenericTable";
import { Button } from "@/components/ui/button";
import React from "react";
import AddDialog from "./AddDialog";
import { Badge } from "@/components/ui/badge";

const dummyTableData = {
  columns: [
    {
      field: "image",
      header: "Image",
      render: (val) => <img src={val} className="w-10 h-10" />,
    },
    { field: "name", header: "Name" },
    {
      field: "designation",
      header: "Designation",
      render: (val) => <Badge>{val}</Badge>,
    },
  ],
  data: Array.from({ length: 30 }, (_, i) => ({
    image: `https://placehold.co/40x40?text=${i + 1}`,
    name: `User ${i + 1}`,
    designation: `Designation ${i + 1}`,
  })),
  searchFields: ["name", "designation"],
  filterField: "designation",
  rowActions: (row) => <Button>View {row.name}</Button>,
  isExportable: true,
  additionalElement: (
    <AddDialog
      title="Add User"
      description="Add a new user to the table"
      actionTrigger={<Button>Add User</Button>}
    />
  ),
};

const GenericTableComp = () => {
  return <GenericTable {...dummyTableData} />;
};

export default GenericTableComp;
