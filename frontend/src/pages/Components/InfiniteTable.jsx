import React from "react";
import { usePaginatedFetch } from "@/hooks/common/usePaginatedFetch";
import { apiRoutes } from "@/utils/api.constants";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const MyDataTable = ({ data }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Users</CardTitle>
      </CardHeader>
      <CardContent>
        {data.map((user) => (
          <div className="p-2" key={user.id}>
            {user.name}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

const InfiniteTable = () => {
  const {
    flatData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = usePaginatedFetch(
    (pageParam) => apiRoutes.USERS.GET_MOCK(10, pageParam, ""),
    apiRoutes.USERS.GET_MOCK
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <MyDataTable data={flatData} />
      <Button
        onClick={() => fetchNextPage()}
        disabled={isFetchingNextPage || !hasNextPage}
      >
        Load More
      </Button>
    </div>
  );
};

export default InfiniteTable;
