// src/layouts/DefaultLayout.jsx
import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/Logo.png";
import MedicationIcon from "../assets/icon-meds.png";
import LocalPharmacyIcon from "../assets/icon-proveedores.png";
import ScienceIcon from "../assets/icon-ensayo-clinic.png";
import AssignmentIcon from "../assets/icon-inspecciones.png";
import MonitorHeartIcon from "../assets/icon-monitoreo.png";

export default function DefaultLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-[220px] bg-[#f8f8f8] text-gray-800 p-5 shadow-md">
        {/* Logo */}
        <div className="mb-10 flex justify-center">
          <Link to="/homepage">
          <img src={logo} alt="PharmaTech" className="w-36"/>
          </Link>
        </div>

        {/* Menú */}
        <nav className="space-y-4">
          <SidebarItem icon={MedicationIcon} text="Medicamentos" to="/meds" />
          <SidebarItem icon={LocalPharmacyIcon} text="Proveedores" to="/proveedores" />
          <SidebarItem icon={ScienceIcon} text="Ensayo Clínico" to="/ensayoclinico" />
          <SidebarItem icon={AssignmentIcon} text="Inspecciones y Auditorías" to="/inspecciones" />
          <SidebarItem icon={MonitorHeartIcon} text="Monitoreo" to="/monitoreo" />
        </nav>
      </aside>

      {/* Contenido principal */}
      <main className="flex-1 p-6 bg-[#f0f4f8] overflow-auto">
        {children}
      </main>
    </div>
  );
}

function SidebarItem({ icon, text, to = "#" }) {
  return (
    <Link
      to={to}
      className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-gray-200 transition-colors"
    >
      <img src={icon} alt={text} className="w-5 h-5" />
      <span className="text-sm font-medium">{text}</span>
    </Link>
  );
}
