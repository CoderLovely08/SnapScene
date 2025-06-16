import EmptyState from "@/components/custom/utils/EmptyState";
import LoadingSpinner from "@/components/custom/utils/LoadingSpiner";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useFetch } from "@/hooks/common/useFetch";
import { apiRoutes, QUERY_KEYS } from "@/utils/api.constants";
import { Search } from "lucide-react";
import React, { useState } from "react";

const ViewAllPermissions = ({ togglePermission, selectedPermissions }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const { responseData: permissions, responseIsLoading } = useFetch(
    apiRoutes.CORE.PERMISSIONS.GET_ALL,
    QUERY_KEYS.CORE.PERMISSIONS.GET_ALL
  );

  const filteredPermissions = permissions?.filter((permission) =>
    permission.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Permissions</CardTitle>
        <CardDescription>
          Select permissions to assign to the user
        </CardDescription>
        <div className="relative mt-2">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search permissions..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </CardHeader>
      <CardContent>
        {responseIsLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filteredPermissions?.map((permission) => (
              <Card key={permission.id} className="overflow-hidden">
                <div className="flex items-center p-4">
                  <Checkbox
                    id={`permission-${permission.id}`}
                    checked={selectedPermissions.includes(permission.id)}
                    onCheckedChange={() => togglePermission(permission.id)}
                  />
                  <div className="ml-3 flex-col flex">
                    <label
                      htmlFor={`permission-${permission.id}`}
                      className="font-medium cursor-pointer"
                    >
                      {permission.name}
                    </label>
                    <Badge variant="outline" className="mt-1">
                      {permission.slug}
                    </Badge>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
        {filteredPermissions?.length === 0 && (
          <EmptyState
            message="No permissions match your search"
            Icon={Search}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default ViewAllPermissions;
