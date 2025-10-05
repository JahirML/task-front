import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "@/layouts/AppLayout";
import Dashboard from "@/pages/Dashboard";
import CreateProjetPage from "./pages/projects/CreateProjetPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index path="/" element={<Dashboard />} />
          <Route path="/projects/create" element={<CreateProjetPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
