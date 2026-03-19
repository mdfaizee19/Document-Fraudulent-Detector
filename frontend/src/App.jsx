import { BrowserRouter, Routes, Route } from "react-router-dom";

import HeroPage from "./pages/HeroPage";
import AuthPage from "./pages/AuthPage";
import AuthCallback from "./pages/AuthCallback";
import SelectRolePage from "./pages/SelectRolePage";

import ExporterDashboard from "./pages/exporter/ExporterDashboard";
import DashboardRouter from "./pages/DashboardRouter";
import UploadPage from "./components/UploadPage";
import StructuredResult from "./pages/StructuredResult";

import QAEntryPage from "./qa/QAEntryPage";
import QADashboard from "./qa/QADashboard";
import QAReview from "./qa/QAReview";

import VerifyVC from "./pages/VerifyVC";
import ExporterProfile from "./pages/exporter/ExporterProfile";

import ProtectedRoute from "./auth/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<HeroPage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/select-role" element={<SelectRolePage />} />

        {/* VERIFICATION */}
        <Route path="/verify" element={<VerifyVC />} />
        <Route path="/exporter" element={<ExporterDashboard />} />
        <Route path="/exporter/:id" element={<ExporterProfile />} />

        {/* EXPORTER */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardRouter />
            </ProtectedRoute>
          }
        />
        <Route
          path="/upload"
          element={
            <ProtectedRoute role="exporter">
              <UploadPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/structured"
          element={
            <ProtectedRoute role="exporter">
              <StructuredResult />
            </ProtectedRoute>
          }
        />

        {/* QA */}
        <Route path="/qa-entry" element={<QAEntryPage />} />
        <Route
          path="/qa"
          element={
            <ProtectedRoute role="qa">
              <QADashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/qa/review/:id"
          element={
            <ProtectedRoute role="qa">
              <QAReview />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
