import { Route, Routes } from "react-router-dom";
import IndexPage from "@/pages/index";
import DocsPage from "@/pages/docs";
import PricingPage from "@/pages/pricing";
import BlogPage from "@/pages/Updates";
import DashboardPage from "@/pages/dashboard";
import FilesPage from "@/pages/files";
import DevicesPage from "@/pages/devices";
import SettingsPage from "@/pages/settings";
import FileSharingPage from "./pages/file-sharing";

function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<DocsPage />} path="/docs" />
      <Route element={<PricingPage />} path="/pricing" />
      <Route element={<BlogPage />} path="/updates" />
      <Route element={<DashboardPage />} path="/dashboard" />
      <Route element={<FilesPage />} path="/files" />
      <Route element={<DevicesPage />} path="/devices" />
      <Route element={<SettingsPage />} path="/settings" />
      <Route element={<FileSharingPage />} path="/file-sharing" />
    </Routes>
  );
}

export default App;