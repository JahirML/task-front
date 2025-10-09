import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "@/layouts/AppLayout";
import Dashboard from "@/pages/Dashboard";
import CreateProjetPage from "./pages/projects/CreateProjetPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import EditProject from "./pages/projects/EditProject";

const queryClient = new QueryClient();
function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index path="/" element={<Dashboard />} />
            <Route path="/projects/create" element={<CreateProjetPage />} />
            <Route path="/projects/:projectId/edit" element={<EditProject />} />
          </Route>
        </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
