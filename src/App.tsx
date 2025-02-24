import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navbar from "./components/Navbar";
import Search from "./components/Search";
import ErrorBoundary from "./components/Errors/ErrorBoundary";
import SearchError from "./components/Errors/SearchError";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Navbar />
      <ErrorBoundary fallback={<SearchError />}>
        <Search />
      </ErrorBoundary>
    </QueryClientProvider>
  );
}

export default App;
