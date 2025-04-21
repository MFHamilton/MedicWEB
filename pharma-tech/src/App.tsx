import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import DocsPage from "@/pages/docs";
import PricingPage from "@/pages/pricing";
import BlogPage from "@/pages/blog";
import AboutPage from "@/pages/about";
import LoginPage from "@/pages/login";
import Proveedores from "@/pages/proveedores";
import Inspecciones from './pages/inspecciones';
import EnsayoClinico from "@/pages/ensayoclinico"; 


import Meds from "./pages/meds";


function App() {
  return (
    <Routes>
      <Route element={<LoginPage />} path="/login" />
      <Route element={<IndexPage />} path="/" />
      <Route element={<Meds />} path="/meds" />
      <Route element={<DocsPage />} path="/docs" />
      <Route element={<PricingPage />} path="/pricing" />
      <Route element={<BlogPage />} path="/blog" />
      <Route element={<AboutPage />} path="/about" />
      <Route element={<AboutPage />} path="/about" />
      <Route element={<EnsayoClinico />} path="/ensayoclinico" />
      <Route element={<LoginPage />} path="/login" />
      <Route element={<Proveedores />} path="/proveedores" />

      <Route path="/inspecciones" element={<Inspecciones />} />
    </Routes>
  );
}

export default App;
