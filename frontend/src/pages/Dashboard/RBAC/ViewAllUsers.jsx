import { GenericTable } from "@/components/custom/utils/GenericTable";
import { Button } from "@/components/ui/button";
import { useFetch } from "@/hooks/common/useFetch";
import { selectUser } from "@/store/slices/auth.slice";
import { apiRoutes } from "@/utils/api.constants";
import { hasPermission } from "@/utils/app.utils";
import { PERMISSIONS } from "@/utils/value.constants";
import { Key, Pencil, PlusCircle, Trash } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";
import AssignPermissions from "./components/AssignPermissionsDialog";

const RowActions = ({ row }) => {
  const user = useSelector(selectUser);
  return (
    <div className="flex gap-2">
      {hasPermission(user, PERMISSIONS.USER_UPDATE) && (
        <Button variant="outline">
          <Pencil />
        </Button>
      )}
      <AssignPermissions userId={row.id} permissions={row.permissions}>
        <Button variant="outline">
          <Key />
        </Button>
      </AssignPermissions>
      {hasPermission(user, PERMISSIONS.USER_DELETE) && (
        <Button variant="outline">
          <Trash />
        </Button>
      )}
    </div>
  );
};

const ViewAllUsers = () => {
  const user = useSelector(selectUser);
  const { responseData: users, responseIsLoading } = useFetch(
    apiRoutes.USERS.GET_ALL
  );

  const tableConfig = {
    title: "Users",
    columns: [
      {
        field: "id",
        header: "ID",
      },
      {
        field: "fullName",
        header: "Name",
      },
      {
        field: "email",
        header: "Email",
      },
      {
        field: "userType",
        header: "User Type",
        render: (val, row) => {
          return <span className="capitalize">{row?.userType?.name}</span>;
        },
      },
      {
        field: "createdAt",
        header: "Created At",
        render: (val) => {
          return <span>{val ? new Date(val).toLocaleString() : "-"}</span>;
        },
      },
    ],
    data: users || [],
    isLoading: responseIsLoading,
    searchFields: ["fullName", "email"],
    additionalElement: hasPermission(user, PERMISSIONS.USER_CREATE) && (
      <Button>
        <PlusCircle />
        Add User
      </Button>
    ),
    rowActions: (row) => <RowActions row={row} />,
  };

  return <GenericTable {...tableConfig} />;
};

export default ViewAllUsers;
