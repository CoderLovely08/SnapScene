import LoadingSpinner from "@/components/custom/utils/LoadingSpiner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFetch } from "@/hooks/common/useFetch";
import { apiRoutes, QUERY_KEYS } from "@/utils/api.constants";
import React from "react";

const UsersDropdown = ({ setSelectedUser }) => {
  const { responseData: users, responseIsLoading } = useFetch(
    apiRoutes.USERS.GET_ALL,
    QUERY_KEYS.USERS.GET_ALL
  );
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Select User</CardTitle>
        <CardDescription>Choose a user to assign permissions</CardDescription>
      </CardHeader>
      <CardContent>
        {responseIsLoading ? (
          <LoadingSpinner />
        ) : (
          <Select onValueChange={setSelectedUser}>
            <SelectTrigger>
              <SelectValue placeholder="Select a user" />
            </SelectTrigger>
            <SelectContent>
              {users?.map((user) => (
                <SelectItem key={user.id} value={user.id}>
                  {user.fullName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </CardContent>
    </Card>
  );
};

export default UsersDropdown;
