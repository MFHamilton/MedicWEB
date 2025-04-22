import { Route, Routes, Navigate } from "react-router-dom";

import IndexPage from "@/pages/index";
import DocsPage from "@/pages/docs";
import PricingPage from "@/pages/pricing";
import BlogPage from "@/pages/blog";
import AboutPage from "@/pages/about";
import LoginPage from "@/pages/login";
import Proveedores from "@/pages/proveedores";
import Inspecciones from './pages/inspecciones';
import EnsayoClinico from './pages/ensayoclinico';
import ProtectedRoute from "@/protectedroute";

import Meds from "./pages/meds";


export default function App() {
  return (
    <Routes>
      {/* pública */}
      <Route path="/login" element={<LoginPage />} />

      {/* protegidas */}
      <Route element={<ProtectedRoute />}>
        <Route path="/"              element={<IndexPage />} />
        <Route path="/meds"          element={<Meds />} />
        <Route path="/docs"          element={<DocsPage />} />
        <Route path="/pricing"       element={<PricingPage />} />
        <Route path="/blog"          element={<BlogPage />} />
        <Route path="/about"         element={<AboutPage />} />
        <Route path="/ensayoclinico" element={<EnsayoClinico />} />
        <Route path="/proveedores"   element={<Proveedores />} />
        <Route path="/inspecciones"  element={<Inspecciones />} />
      </Route>

      {/* fallback */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}
