import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import store from "./store/store";
import { ErrorBoundary } from "react-error-boundary";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 60,
      retry: false,
    },
  },
});

createRoot(document.getElementById("root")).render(
  <ErrorBoundary fallback={<div>Something went wrong</div>}>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <App />
        <ToastContainer
          autoClose={3000}
          position="bottom-right"
          hideProgressBar={true}
          newestOnTop={true}
          limit={3}
        />
      </QueryClientProvider>
    </Provider>
  </ErrorBoundary>
);
