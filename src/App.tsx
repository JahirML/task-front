import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "@/layouts/AppLayout";
import Dashboard from "@/pages/Dashboard";
import CreateProjetPage from "./pages/projects/CreateProjetPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import EditProject from "./pages/projects/EditProject";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ProjectDetails from "./pages/projects/ProjectDetails";
import AuthLayout from "./layouts/AuthLayout";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ConfirmAccount from "./pages/auth/ConfirmAccount";
import RequestNewCode from "./pages/auth/RequestNewCode";
import ForgotPassword from "./pages/auth/ForgotPassword";
import NewPassword from "./pages/auth/NewPassword";

const queryClient = new QueryClient();
function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index path="/" element={<Dashboard />} />
            <Route path="/projects/create" element={<CreateProjetPage />} />
            <Route path="/projects/:projectId" element={<ProjectDetails />} />
            <Route path="/projects/:projectId/edit" element={<EditProject />} />
          </Route>
          <Route element={<AuthLayout />}>
            <Route path="/auth/login" element={<LoginPage />} />
            <Route path="/auth/register" element={<RegisterPage />} />
            <Route path="/auth/confirm" element={<ConfirmAccount />} />
            <Route path="/auth/request-code" element={<RequestNewCode />} />
            <Route path="/auth/forgot-password" element={<ForgotPassword />} />
            <Route path="/auth/new-password" element={<NewPassword />} />
          </Route>
        </Routes>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
