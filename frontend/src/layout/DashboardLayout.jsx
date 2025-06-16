import { AppSidebar } from "@/components/app-sidebar";
import Container from "@/components/custom/utils/Container";
import ErrorFallback from "@/components/custom/utils/ErrorFallback";

import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { selectUser } from "@/store/slices/auth.slice";
import { ErrorBoundary } from "react-error-boundary";
import { useSelector } from "react-redux";

import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  const user = useSelector(selectUser);
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
          </div>
          <div className="flex items-center gap-2">
            <>{JSON.stringify(user, null, 2)}</>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
            <Container>
              <ErrorBoundary fallback={<ErrorFallback />}>
                <Outlet />
              </ErrorBoundary>
            </Container>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
